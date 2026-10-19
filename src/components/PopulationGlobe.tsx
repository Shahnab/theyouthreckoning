import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { 
  PROTEST_DATA, 
  ProtestRecord, 
  findProtestRecord 
} from '../data/protestData';
import GlassDossier from './GlassDossier';

// True line segment intersection (checks BOTH ua and ub in [0, 1])
function lineIntersectSegment(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  p4: [number, number]
): [number, number] | null {
  const x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];
  const x3 = p3[0], y3 = p3[1], x4 = p4[0], y4 = p4[1];

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (Math.abs(denom) < 1e-10) return null;

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  // Crucial: Must be within bounds of BOTH line segments
  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return [x1 + ua * (x2 - x1), y1 + ua * (y2 - y1)];
  }
  return null;
}

// Point in polygon test (Jordan curve ray-casting)
function pointInPoly(pt: [number, number], ring: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    const intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
      (pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Clip diagonal hash lines strictly to the polygon boundary of the country
function clipHatchToRing(ring: number[][], spacingDeg: number): [number, number][][] {
  let minX = 180, maxX = -180, minY = 90, maxY = -90;
  ring.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });

  const segments: [number, number][][] = [];
  const startOffset = minY - maxX;
  const endOffset = maxY - minX;

  for (let offset = startOffset; offset <= endOffset; offset += spacingDeg) {
    const p1: [number, number] = [minX - 2, minX - 2 + offset];
    const p2: [number, number] = [maxX + 2, maxX + 2 + offset];

    const pts: [number, number][] = [];
    for (let i = 0; i < ring.length; i++) {
      const nextIdx = (i + 1) % ring.length;
      const ipt = lineIntersectSegment(
        p1, 
        p2, 
        ring[i] as [number, number], 
        ring[nextIdx] as [number, number]
      );
      if (ipt) pts.push(ipt);
    }

    pts.sort((a, b) => a[0] - b[0]);

    // Deduplicate intersection points
    const unique: [number, number][] = [];
    for (let i = 0; i < pts.length; i++) {
      if (!unique.length || Math.hypot(pts[i][0] - unique[unique.length - 1][0], pts[i][1] - unique[unique.length - 1][1]) > 1e-4) {
        unique.push(pts[i]);
      }
    }

    // Pair intersection points and verify midpoint is strictly inside the country polygon
    for (let i = 0; i < unique.length - 1; i += 2) {
      const segStart = unique[i];
      const segEnd = unique[i + 1];
      const mid: [number, number] = [(segStart[0] + segEnd[0]) / 2, (segStart[1] + segEnd[1]) / 2];
      if (pointInPoly(mid, ring)) {
        // In GeoJSON: [lng, lat]. In react-globe: [lat, lng]
        segments.push([[segStart[1], segStart[0]], [segEnd[1], segEnd[0]]]);
      }
    }
  }

  return segments;
}

// Generate strictly boundary-clipped diagonal hash lines for all protest countries
function generateBoundaryClippedHatch(features: any[], protestList: ProtestRecord[]) {
  const paths: { country: string; coords: [number, number][] }[] = [];

  protestList.forEach((record) => {
    const feat = features.find((f: any) => {
      const p = f.properties;
      if (!p) return false;
      const admin = p.ADMIN || p.admin || '';
      const name = p.NAME || p.name || '';
      const nameLong = p.NAME_LONG || '';
      return (
        admin === record.geojsonName ||
        name === record.geojsonName ||
        nameLong === record.geojsonName ||
        record.altGeojsonNames?.some((alt) => admin === alt || name === alt || nameLong === alt)
      );
    });

    if (!feat || !feat.geometry) return;

    let rings: number[][][] = [];
    if (feat.geometry.type === 'Polygon') {
      if (feat.geometry.coordinates[0]) rings.push(feat.geometry.coordinates[0]);
    } else if (feat.geometry.type === 'MultiPolygon') {
      // Sort rings by point count to ensure main territories are covered
      rings = feat.geometry.coordinates
        .map((p: any) => p[0])
        .filter(Boolean)
        .sort((a: any, b: any) => b.length - a.length);
    }

    rings.forEach((ring) => {
      let minX = 180, maxX = -180, minY = 90, maxY = -90;
      ring.forEach(([x, y]) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      });

      const span = Math.max(maxX - minX, maxY - minY);
      if (span < 0.8) return; // skip speck islands that cause sub-pixel edge flickering

      // Architectural spacing: clean, bold diagonal lines that never collapse into moiré or edge flicker
      const spacing = Math.max(1.0, Math.min(2.0, span / 14));
      const segs = clipHatchToRing(ring, spacing);

      segs.forEach((coords) => {
        paths.push({
          country: record.country,
          coords: coords as [number, number][],
        });
      });
    });
  });

  return paths;
}

export default function PopulationGlobe() {
  const globeRef = useRef<any>();
  const [countriesGeo, setCountriesGeo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Selection state: defaults to NO country selected
  const [selectedCountry, setSelectedCountry] = useState<ProtestRecord | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<ProtestRecord | null>(null);
  const [dossierOpen, setDossierOpen] = useState(false);

  // Fetch GeoJSON countries and enrich with Maldives
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const features = data?.features || [];

        // Synthesize Maldives polygon
        const hasMaldives = features.some((f: any) => 
          f.properties?.NAME === 'Maldives' || f.properties?.ADMIN === 'Maldives'
        );

        if (!hasMaldives) {
          features.push({
            type: 'Feature',
            properties: {
              ADMIN: 'Maldives',
              NAME: 'Maldives',
              NAME_LONG: 'Republic of Maldives',
              ISO_A3: 'MDV',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [72.7, 2.8],
                  [73.8, 2.8],
                  [73.8, 4.8],
                  [72.7, 4.8],
                  [72.7, 2.8],
                ],
              ],
            },
          });
        }

        setCountriesGeo(features);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load GeoJSON:', err);
        setLoading(false);
      });
  }, []);

  // Compute strictly boundary-clipped vector hash lines
  const hatchLines = useMemo(() => {
    if (!countriesGeo.length) return [];
    return generateBoundaryClippedHatch(countriesGeo, PROTEST_DATA);
  }, [countriesGeo]);

  // Controls & Lighting setup
  useEffect(() => {
    if (globeRef.current && !loading) {
      const controls = globeRef.current.controls?.();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.enableDamping = true;
      }
      globeRef.current.pointOfView?.({ altitude: 2.1 });

      const scene = globeRef.current.scene?.();
      if (scene) {
        const existingLights = scene.children.filter((c: any) => c.name === 'studioLight' || c.name === 'singleLight');
        existingLights.forEach((l: any) => scene.remove(l));

        const existingOccluders = scene.children.filter((c: any) => c.name === 'globeOccluder');
        existingOccluders.forEach((o: any) => {
          scene.remove(o);
          if (o.geometry) o.geometry.dispose();
          if (o.material) o.material.dispose();
        });

        // Matte greyish metallic globe surface (radius 99.85)
        // High roughness (0.88) eliminates harsh reflection spots/glare in the UI,
        // while the subtle slate-grey tone cleanly differentiates the globe from the pure black background.
        const globeSurface = new THREE.Mesh(
          new THREE.SphereGeometry(99.85, 128, 128),
          new THREE.MeshStandardMaterial({
            color: 0x242832,       // Subtle greyish metallic / dark steel tone
            roughness: 0.88,       // Matte satin finish - smoothly diffuses light, eliminating glare and harsh reflection spots
            metalness: 0.22,       // Gentle metallic presence without mirror reflections
            depthWrite: true,
            depthTest: true,
          })
        );
        globeSurface.name = 'globeOccluder';
        globeSurface.renderOrder = 0;
        scene.add(globeSurface);

        // Exactly 1 light: a single soft directional light providing gentle, uniform illumination across the curvature
        const singleLight = new THREE.DirectionalLight(0xffffff, 1.1);
        singleLight.position.set(-20, 80, 40);
        singleLight.name = 'singleLight';

        if (typeof (globeRef.current as any).lights === 'function') {
          (globeRef.current as any).lights([singleLight]);
        } else {
          scene.add(singleLight);
        }
      }
    }
  }, [loading]);

  // Select country & fly camera
  const handleSelectCountry = useCallback((record: ProtestRecord) => {
    setSelectedCountry(record);
    setDossierOpen(true);

    if (globeRef.current) {
      const controls = globeRef.current.controls?.();
      if (controls) {
        controls.autoRotate = false;
      }
      globeRef.current.pointOfView(
        { lat: record.lat, lng: record.lng, altitude: 1.75 },
        1200
      );
    }
  }, []);

  // Close dossier and reset selection back to default state
  const handleCloseDossier = useCallback(() => {
    setSelectedCountry(null);
    setDossierOpen(false);

    if (globeRef.current) {
      const controls = globeRef.current.controls?.();
      if (controls) {
        controls.autoRotate = true;
      }
      globeRef.current.pointOfView?.({ altitude: 2.1 }, 1000);
    }
  }, []);

  // Open dossier (if none selected, pick the first chronological nation)
  const handleOpenDossier = useCallback(() => {
    const target = selectedCountry || PROTEST_DATA[0];
    handleSelectCountry(target);
  }, [selectedCountry, handleSelectCountry]);

  // Ascending chronological timeline navigation
  const currentIndex = useMemo(() => {
    if (!selectedCountry) return 0;
    const idx = PROTEST_DATA.findIndex((c) => c.country === selectedCountry.country);
    return idx >= 0 ? idx : 0;
  }, [selectedCountry]);

  const handleNextCountry = useCallback(() => {
    const nextIdx = (currentIndex + 1) % PROTEST_DATA.length;
    handleSelectCountry(PROTEST_DATA[nextIdx]);
  }, [currentIndex, handleSelectCountry]);

  const handlePrevCountry = useCallback(() => {
    const prevIdx = (currentIndex - 1 + PROTEST_DATA.length) % PROTEST_DATA.length;
    handleSelectCountry(PROTEST_DATA[prevIdx]);
  }, [currentIndex, handleSelectCountry]);

  return (
    <div 
      className="w-full h-screen flex items-center justify-center overflow-hidden relative font-sans select-none bg-black"
      style={{ background: '#000000' }}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#000000]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="text-orange-400 text-xs font-mono tracking-[0.2em] uppercase">
              INITIALIZING GLOBE...
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* Top Left: Creative Title & Big Italicized Country Spotlight */}
          <div className="absolute top-7 left-7 z-20 pointer-events-none flex flex-col gap-2 max-w-lg">
            <div className="flex flex-col gap-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-semibold tracking-[-0.03em] text-white">
                  The Youth Reckoning
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-orange-500 tracking-wide">
                GenZ Uprisings and Resistance movements
              </p>
            </div>

            {/* Creative Big Italicized Country Name Display (active nation only) */}
            {selectedCountry ? (
              <div 
                key={selectedCountry.country} 
                className="pt-2 flex flex-col gap-0.5 animate-in fade-in slide-in-from-left-3 duration-300"
              >
                <span className="text-[9px] font-mono tracking-[0.26em] text-orange-400 uppercase font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Active Nation Focus
                </span>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display italic font-light tracking-tight text-white filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                  {selectedCountry.country}
                </div>
                <div className="text-xs font-mono text-gray-400 tracking-wider">
                  {selectedCountry.timeline} · <span className="text-orange-400">{selectedCountry.movement}</span>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 animate-pulse" />
                <span>Click any highlighted nation to open dossier</span>
              </div>
            )}
          </div>

          {/* Top Right: Explore / Re-open Dossier button if closed */}
          {!dossierOpen && (
            <div className="absolute top-7 right-7 z-20">
              <button
                onClick={handleOpenDossier}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider transition-colors hover:border-orange-500/40 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>Explore Timeline ({PROTEST_DATA.length} Nations)</span>
              </button>
            </div>
          )}

          {/* Bottom Left: Minimalist Legend */}
          <div className="absolute bottom-7 left-7 z-20 pointer-events-none">
            <div className="p-3.5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md flex flex-col gap-1.5 max-w-xs">
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-orange-500" />
                  <span className="text-orange-400 font-medium">Protest Nations (Orange Hash)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-white/70" />
                  <span className="text-white font-medium">World Borders</span>
                </span>
              </div>
              <p className="text-[9px] text-gray-400 font-mono">
                Click any highlighted country to inspect dossier
              </p>
            </div>
          </div>

          {/* Bottom Right: Clean Footer */}
          <div className="absolute bottom-7 right-7 z-20 pointer-events-none">
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
              Visualization by <span className="text-orange-500 font-semibold">Shahnab</span>
            </span>
          </div>

          {/* Constant-Height Transparent Glass Dossier Card */}
          {dossierOpen && selectedCountry && (
            <GlassDossier
              country={selectedCountry}
              onClose={handleCloseDossier}
              onPrev={handlePrevCountry}
              onNext={handleNextCountry}
              currentIndex={currentIndex}
              totalCount={PROTEST_DATA.length}
            />
          )}
        </>
      )}

      {/* 3D FULL TRANSPARENT GLOBE (Clean vector cartography, no 3D label clutter) */}
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={false}
        showAtmosphere={false}
        showGraticules={true}

        // 1. Country Boundaries (Whiter tone for World, Bright Orange for Protest Nations)
        polygonsData={countriesGeo}
        polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={(d: any) => {
          const protest = findProtestRecord(d?.properties);
          if (!protest) {
            // Crisp, visible white tone for all world country boundaries
            return 'rgba(255, 255, 255, 0.48)';
          }

          const isSelected = selectedCountry?.country === protest.country;
          const isHovered = hoveredCountry?.country === protest.country;

          // Prominently highlighted boundary for protest nations
          return isSelected || isHovered ? '#ffffff' : 'rgba(249, 115, 22, 1.0)';
        }}
        polygonAltitude={() => 0.001}
        onPolygonClick={(feature: any) => {
          const protest = findProtestRecord(feature?.properties);
          if (protest) {
            handleSelectCountry(protest);
          }
        }}
        onPolygonHover={(feature: any) => {
          const protest = findProtestRecord(feature?.properties);
          setHoveredCountry(protest || null);
        }}
        polygonLabel={(d: any) => {
          const protest = findProtestRecord(d?.properties);
          if (!protest) return '';

          return `
            <div style="background: rgba(9, 11, 16, 0.88); padding: 8px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.18); font-family: sans-serif; backdrop-filter: blur(16px); box-shadow: 0 10px 25px rgba(0,0,0,0.8); max-width: 220px;">
              <div style="color: #ffffff; font-size: 13px; font-weight: 600; margin-bottom: 2px;">${protest.country}</div>
              <div style="color: #f97316; font-size: 10px; font-weight: 500; margin-bottom: 3px;">${protest.movement}</div>
              <div style="color: #888; font-size: 9px; font-family: monospace;">
                Click to inspect dossier
              </div>
            </div>
          `;
        }}

        // 2. Discrete Vector Hash Lines strictly clipped within Country Boundaries (Dense & Crisp)
        pathsData={hatchLines}
        pathPoints="coords"
        pathPointLat={(p: any) => p[0]}
        pathPointLng={(p: any) => p[1]}
        pathColor={(d: any) => {
          if (selectedCountry && d.country === selectedCountry.country) {
            return '#ffffff';
          }
          if (hoveredCountry && d.country === hoveredCountry.country) {
            return '#ffffff';
          }
          return 'rgba(249, 115, 22, 0.95)';
        }}
        pathStroke={1.1}
        pathAltitude={0.002}
      />
    </div>
  );
}

