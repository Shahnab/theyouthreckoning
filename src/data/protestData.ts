export interface ProtestRecord {
  timeline: string;
  country: string;
  geojsonName: string; // Name in ne_110m_admin_0_countries.geojson
  altGeojsonNames?: string[];
  movement: string;
  classification: string;
  triggersAndDemands: string;
  statusOutcome: string;
  statusCategory: string;
  lat: number;
  lng: number;
  flag: string;
}

export interface StatusMeta {
  color: string;
  description: string;
  badgeBg: string;
}

export const STATUS_COLORS: Record<string, StatusMeta> = {
  "Ongoing": {
    color: "#EF4444", // Vivid Crimson Red
    description: "Active protests and ongoing mobilizations",
    badgeBg: "rgba(239, 68, 68, 0.15)",
  },
  "Recurring / ongoing": {
    color: "#F97316", // Flame Orange
    description: "Repeated waves of demonstrations with persistent demands",
    badgeBg: "rgba(249, 115, 22, 0.15)",
  },
  "Recent / developing": {
    color: "#06B6D4", // Electric Cyan
    description: "Recently initiated or developing youth actions",
    badgeBg: "rgba(6, 182, 212, 0.15)",
  },
  "Political transition": {
    color: "#EAB308", // Golden Yellow
    description: "Direct resignation or leadership departure achieved",
    badgeBg: "rgba(234, 179, 8, 0.15)",
  },
  "Political transition; grievances ongoing": {
    color: "#F59E0B", // Warm Amber
    description: "Removal of executive, with structural grievances continuing",
    badgeBg: "rgba(245, 158, 11, 0.15)",
  },
  "Political transition; transition unresolved": {
    color: "#D97706", // Bronze Ochre
    description: "President departed, governance framework unresolved",
    badgeBg: "rgba(217, 119, 6, 0.15)",
  },
  "Concluded — Political transition": {
    color: "#10B981", // Emerald Green
    description: "National uprising culminated in executive resignation",
    badgeBg: "rgba(16, 185, 129, 0.15)",
  },
  "Concluded — Government resigned": {
    color: "#34D399", // Mint Green
    description: "Prime Minister and government stepped down",
    badgeBg: "rgba(52, 211, 153, 0.15)",
  },
  "Concluded — Event-based protests": {
    color: "#14B8A6", // Teal
    description: "Targeted walkouts or event-specific mobilizations concluded",
    badgeBg: "rgba(20, 184, 166, 0.15)",
  },
  "Subdued": {
    color: "#6366F1", // Indigo
    description: "Clashes or partial concessions; protests cooled or called off",
    badgeBg: "rgba(99, 102, 241, 0.15)",
  },
  "Subdued — Key demand unmet": {
    color: "#8B5CF6", // Violet
    description: "Controversial law enacted; protests subsided without repeal",
    badgeBg: "rgba(139, 92, 246, 0.15)",
  },
  "Subdued — Demands unresolved": {
    color: "#A855F7", // Purple
    description: "Repression and promised spending; core demands contested",
    badgeBg: "rgba(168, 85, 247, 0.15)",
  },
  "Repressed": {
    color: "#F43F5E", // Hot Rose
    description: "Heavy security crackdown following electoral grievances",
    badgeBg: "rgba(244, 63, 94, 0.15)",
  },
  "Decentralized / recurring": {
    color: "#3B82F6", // Electric Blue
    description: "Distributed student walkouts across multiple campuses",
    badgeBg: "rgba(59, 130, 246, 0.15)",
  },
  "Issue-specific / no unified movement": {
    color: "#C084FC", // Lavender
    description: "Campus-focused student activism on targeted institutional issues",
    badgeBg: "rgba(192, 132, 252, 0.15)",
  },
  "Issue-specific / episodic": {
    color: "#38BDF8", // Sky Blue
    description: "Periodic student marches against tuition and austerity",
    badgeBg: "rgba(56, 189, 248, 0.15)",
  },
};

export const PROTEST_DATA: ProtestRecord[] = [
  {
    timeline: "Mar–Jul 2022",
    country: "Sri Lanka",
    geojsonName: "Sri Lanka",
    movement: "Aragalaya (historical precursor)",
    classification: "Broad-based uprising; not exclusively Gen Z",
    triggersAndDemands: "Economic collapse; food and fuel shortages; inflation; corruption; demand for President Gotabaya Rajapaksa’s resignation.",
    statusOutcome: "Gotabaya Rajapaksa resigned in July 2022. A broad-based uprising, not an exclusively Gen Z movement.",
    statusCategory: "Concluded — Political transition",
    lat: 7.8731,
    lng: 80.7718,
    flag: "🇱🇰",
  },
  {
    timeline: "18 Jun–Jul 2024",
    country: "Kenya",
    geojsonName: "Kenya",
    movement: "#RejectFinanceBill2024",
    classification: "Gen Z-led; broader public participation",
    triggersAndDemands: "Proposed tax increases; cost of living; public debt; political corruption; accountability. Youth networks used digital platforms to coordinate demonstrations.",
    statusOutcome: "President William Ruto withdrew the Finance Bill. Protests and demands for accountability returned in June 2025; concerns over police violence persisted.",
    statusCategory: "Recurring / ongoing",
    lat: -0.0236,
    lng: 37.9062,
    flag: "🇰🇪",
  },
  {
    timeline: "1 Jul–Aug 2024",
    country: "Bangladesh",
    geojsonName: "Bangladesh",
    movement: "July Uprising / Student–People’s Uprising",
    classification: "Student-led; expanded into a broad national uprising",
    triggersAndDemands: "Reinstatement of civil-service job quotas; perceived discrimination; unemployment; political repression; accountability.",
    statusOutcome: "Sheikh Hasina resigned and fled the country in August 2024. Longer-term reform demands remained contested.",
    statusCategory: "Concluded — Political transition",
    lat: 23.6850,
    lng: 90.3563,
    flag: "🇧🇩",
  },
  {
    timeline: "Nov 2024–present",
    country: "Serbia",
    geojsonName: "Republic of Serbia",
    altGeojsonNames: ["Serbia"],
    movement: "Student-led anti-corruption movement",
    classification: "Student-led; broad public participation",
    triggersAndDemands: "Novi Sad railway-station canopy collapse, which killed 16 people; demands for accountability, transparency and institutional reform.",
    statusOutcome: "Sustained mass protests and a political challenge ahead of the early parliamentary election scheduled for 25 October 2026.",
    statusCategory: "Ongoing",
    lat: 44.0165,
    lng: 21.0059,
    flag: "🇷🇸",
  },
  {
    timeline: "Feb 2025 onward",
    country: "Greece",
    geojsonName: "Greece",
    movement: "Tempi train-disaster demonstrations",
    classification: "Broad-based; significant student participation",
    triggersAndDemands: "Justice over the 2023 train collision that killed 57 people; accountability for officials; improvements to rail safety.",
    statusOutcome: "Repeated mass demonstrations; demands for accountability continued. Not exclusively Gen Z.",
    statusCategory: "Recurring / ongoing",
    lat: 39.0742,
    lng: 21.8243,
    flag: "🇬🇷",
  },
  {
    timeline: "Mar 2025 onward",
    country: "Türkiye (Turkey)",
    geojsonName: "Turkey",
    altGeojsonNames: ["Turkiye", "Türkiye"],
    movement: "Student protests after detention of Ekrem İmamoğlu",
    classification: "Student-led; wider opposition participation",
    triggersAndDemands: "Opposition to detention of Istanbul mayor Ekrem İmamoğlu and revocation of his university diploma; democratic rights and academic freedom.",
    statusOutcome: "Arrests and police action were documented; student protests remained active in European Students’ Union monitoring in March–May 2026.",
    statusCategory: "Ongoing",
    lat: 38.9637,
    lng: 35.2433,
    flag: "🇹🇷",
  },
  {
    timeline: "25 Aug–Sep 2025",
    country: "Indonesia",
    geojsonName: "Indonesia",
    movement: "August protests / student-led anti-government demonstrations",
    classification: "Student-led and youth-involved; broader participation",
    triggersAndDemands: "Opposition to lawmakers’ housing allowances; economic inequality; inadequate education funding; police violence; death of motorcycle-taxi driver Affan Kurniawan intensified anger.",
    statusOutcome: "Protests spread across provinces with deadly clashes. Political parties agreed to reduce lawmakers’ benefits; protests in Jakarta were called off in early September amid security concerns.",
    statusCategory: "Subdued",
    lat: -0.7893,
    lng: 113.9213,
    flag: "🇮🇩",
  },
  {
    timeline: "8 Sep 2025 onward",
    country: "Nepal",
    geojsonName: "Nepal",
    movement: "Gen Z uprising",
    classification: "Explicitly Gen Z-led",
    triggersAndDemands: "Social-media ban; corruption; nepotism; political privilege; unemployment; restrictions on free expression.",
    statusOutcome: "Prime Minister K. P. Sharma Oli resigned after deadly protests. An election followed in March 2026; broader reform demands require separate assessment.",
    statusCategory: "Political transition",
    lat: 28.3949,
    lng: 84.1240,
    flag: "🇳🇵",
  },
  {
    timeline: "20 Sep–Nov 2025",
    country: "Maldives",
    geojsonName: "Maldives",
    movement: "Anti-government and media-freedom protests",
    classification: "Broad opposition/civil-society movement; youth participation not established as exclusive",
    triggersAndDemands: "Opposition to a media regulation law; concerns about press freedom, corruption and democratic backsliding.",
    statusOutcome: "The controversial law was enacted in September 2025 despite opposition. Protests subsequently subsided; the central demand for repeal was not achieved.",
    statusCategory: "Subdued — Key demand unmet",
    lat: 3.2028,
    lng: 73.2207,
    flag: "🇲🇻",
  },
  {
    timeline: "20 Sep 2025 onward",
    country: "Peru",
    geojsonName: "Peru",
    movement: "Generation Z protests",
    classification: "Gen Z-branded; broad participation",
    triggersAndDemands: "Pension reform; crime and extortion; corruption scandals; opposition to President Dina Boluarte.",
    statusOutcome: "Congress removed Boluarte on 10 October 2025 amid wider political unrest. Security and accountability demands remained.",
    statusCategory: "Political transition; grievances ongoing",
    lat: -9.1900,
    lng: -75.0152,
    flag: "🇵🇪",
  },
  {
    timeline: "21 Sep 2025 onward",
    country: "Philippines",
    geojsonName: "Philippines",
    movement: "Anti-corruption movement over flood-control projects",
    classification: "Youth- and student-involved; broad public participation",
    triggersAndDemands: "Alleged corruption in public infrastructure projects; suspicious flood-control spending; calls for transparency.",
    statusOutcome: "Anti-corruption mobilization expanded beyond student groups. Investigations and accountability demands continued; a decisive resolution was not established in the reviewed sources.",
    statusCategory: "Ongoing",
    lat: 12.8797,
    lng: 121.7740,
    flag: "🇵🇭",
  },
  {
    timeline: "25 Sep 2025 onward",
    country: "Madagascar",
    geojsonName: "Madagascar",
    movement: "Gen Z Mada",
    classification: "Explicitly Gen Z-led",
    triggersAndDemands: "Water and electricity shortages; poverty; public-service failures; corruption; political accountability.",
    statusOutcome: "President Andry Rajoelina fled the country in October 2025 amid the uprising and military defections. Subsequent transition raised questions about democratic civilian governance.",
    statusCategory: "Political transition; transition unresolved",
    lat: -18.7669,
    lng: 46.8691,
    flag: "🇲🇬",
  },
  {
    timeline: "27–30 Sep 2025",
    country: "Morocco",
    geojsonName: "Morocco",
    movement: "Gen Z 212",
    classification: "Explicitly Gen Z-branded",
    triggersAndDemands: "Poor healthcare and education; youth unemployment; inadequate public services; perceived misplaced government spending.",
    statusOutcome: "Arrests and repression occurred, while the government promised more investment in health and education. The extent to which commitments satisfy demands remains contested.",
    statusCategory: "Subdued — Demands unresolved",
    lat: 31.7917,
    lng: -7.0926,
    flag: "🇲🇦",
  },
  {
    timeline: "29 Oct 2025 onward",
    country: "Tanzania",
    geojsonName: "United Republic of Tanzania",
    altGeojsonNames: ["Tanzania"],
    movement: "Youth-led post-election demonstrations",
    classification: "Broader electoral uprising with substantial youth participation",
    triggersAndDemands: "Alleged electoral irregularities; restricted political competition; accountability; opposition to the political establishment.",
    statusOutcome: "Demonstrations were met with a major crackdown. Allegations concerning the election and demands for accountability remained politically sensitive.",
    statusCategory: "Repressed",
    lat: -6.3690,
    lng: 34.8888,
    flag: "🇹🇿",
  },
  {
    timeline: "15 Nov 2025 onward",
    country: "Mexico",
    geojsonName: "Mexico",
    movement: "Generation Z Mexico",
    classification: "Gen Z-branded; wider participation and contested representation",
    triggersAndDemands: "Cartel violence; insecurity; corruption; public anger after the assassination of Uruapan mayor Carlos Manzo on 1 November 2025.",
    statusOutcome: "Demonstrations occurred in multiple cities, with clashes and arrests. The government questioned the movement’s political independence; no equivalent national leadership change was established.",
    statusCategory: "Subdued",
    lat: 23.6345,
    lng: -102.5528,
    flag: "🇲🇽",
  },
  {
    timeline: "Late Nov–11 Dec 2025",
    country: "Bulgaria",
    geojsonName: "Bulgaria",
    movement: "Anti-budget and anti-corruption protests",
    classification: "Broad-based; youth participation",
    triggersAndDemands: "Opposition to proposed tax and social-security increases in the 2026 budget; broader anger over corruption and political instability.",
    statusOutcome: "Prime Minister Rosen Zhelyazkov resigned on 11 December 2025 after sustained demonstrations. Not exclusively student-led.",
    statusCategory: "Concluded — Government resigned",
    lat: 42.7339,
    lng: 25.4858,
    flag: "🇧🇬",
  },
  {
    timeline: "Feb–Mar 2026",
    country: "United States (America)",
    geojsonName: "United States of America",
    altGeojsonNames: ["United States", "USA"],
    movement: "Student-led anti-ICE and pro-migrant walkouts",
    classification: "Student-led; decentralized issue-specific activism",
    triggersAndDemands: "Opposition to federal immigration enforcement and treatment of migrants; concerns about government policy. High-school students organized walkouts and rallies.",
    statusOutcome: "Decentralized activism continued. Reporting cited an increase in student-led rallies even as wider pro-migrant demonstrations declined in February 2026; not one national Gen Z uprising.",
    statusCategory: "Decentralized / recurring",
    lat: 37.0902,
    lng: -95.7129,
    flag: "🇺🇸",
  },
  {
    timeline: "Mar–May 2026",
    country: "England",
    geojsonName: "United Kingdom",
    altGeojsonNames: ["England", "Great Britain"],
    movement: "University and student demonstrations",
    classification: "Student activism; not a verified unified Gen Z uprising",
    triggersAndDemands: "Student rights; university governance; education funding; international solidarity; wider social and political issues.",
    statusOutcome: "European Students’ Union monitoring recorded UK student actions but did not isolate England in its published country totals. A nationwide England-specific Gen Z uprising was not established.",
    statusCategory: "Issue-specific / no unified movement",
    lat: 52.3555,
    lng: -1.1743,
    flag: "🇬🇧",
  },
  {
    timeline: "May–Oct 2026",
    country: "Albania",
    geojsonName: "Albania",
    movement: "Student-involved anti-government protests / Flamingo movement",
    classification: "Student-involved; broader opposition participation",
    triggersAndDemands: "Corruption allegations; unemployment; inadequate education; living costs; opposition to a controversial coastal development project.",
    statusOutcome: "Student demonstrations escalated into clashes in Tirana, with protesters demanding Prime Minister Edi Rama’s resignation. Rama rejected calls to resign.",
    statusCategory: "Ongoing",
    lat: 41.1533,
    lng: 20.1683,
    flag: "🇦🇱",
  },
  {
    timeline: "28 May–Aug 2026",
    country: "New Zealand",
    geojsonName: "New Zealand",
    movement: "Student protests against education austerity",
    classification: "Student-led; issue-specific",
    triggersAndDemands: "Tuition costs; changes to Fees Free; higher-education funding; student allowances; student-union concerns.",
    statusOutcome: "Repeated student marches and strikes were documented at the University of Otago, including a rally of about 500 students on 29 July. No unified nationwide Gen Z uprising was established.",
    statusCategory: "Issue-specific / episodic",
    lat: -40.9006,
    lng: 174.8860,
    flag: "🇳🇿",
  },
  {
    timeline: "13-Aug-26",
    country: "Australia",
    geojsonName: "Australia",
    movement: "National student walkouts against One Nation",
    classification: "Student-organized; political issue-specific protest",
    triggersAndDemands: "High-school students protested against One Nation and its leader Pauline Hanson, with rallies in Sydney, Melbourne, Brisbane and other locations.",
    statusOutcome: "Student-organized political demonstrations with hundreds participating in major cities; not a national anti-government uprising.",
    statusCategory: "Concluded — Event-based protests",
    lat: -25.2744,
    lng: 133.7751,
    flag: "🇦🇺",
  },
  {
    timeline: "18 Sep–Oct 2026",
    country: "France",
    geojsonName: "France",
    movement: "High-school student protests and broader social unrest",
    classification: "Student-led and broader social protest",
    triggersAndDemands: "Underfunded schools; teacher shortages; school conditions; university admissions; rising living costs; wider economic grievances.",
    statusOutcome: "Mass demonstrations and serious clashes were reported in October, with arrests and scrutiny of police conduct. Reporting also described promised additional teachers and reversal of planned university fee increases; wider grievances remained contested.",
    statusCategory: "Ongoing",
    lat: 46.2276,
    lng: 2.2137,
    flag: "🇫🇷",
  },
  {
    timeline: "Late Sep–Oct 2026",
    country: "Spain",
    geojsonName: "Spain",
    movement: "Youth-involved housing and cost-of-living protests",
    classification: "Broad-based social movement with youth participation",
    triggersAndDemands: "Rising rents; evictions; lack of affordable housing; demands for rent controls and eviction protections.",
    statusOutcome: "Demonstrations and housing activism continued; not an exclusively student-led or Gen Z uprising.",
    statusCategory: "Ongoing",
    lat: 40.4637,
    lng: -3.7492,
    flag: "🇪🇸",
  },
  {
    timeline: "1-Oct-26",
    country: "Chile",
    geojsonName: "Chile",
    movement: "Student march to defend public education",
    classification: "Student-led; issue-specific",
    triggersAndDemands: "Education-budget cuts; reduced public investment; pressure on employment and social services.",
    statusOutcome: "Students and education supporters demonstrated before debate on the 2027 budget. The dispute over education funding remained unresolved at the time of reporting.",
    statusCategory: "Recent / developing",
    lat: -35.6751,
    lng: -71.5430,
    flag: "🇨🇱",
  },
  {
    timeline: "1-Oct-26",
    country: "Ireland",
    geojsonName: "Ireland",
    movement: "Higher-education student march",
    classification: "Student-led; issue-specific",
    triggersAndDemands: "Student fees; high accommodation costs; cost-of-living pressures; insufficient student housing.",
    statusOutcome: "More than 1,500 students marched in Dublin according to RTÉ. Organizers called for education funding and affordable accommodation.",
    statusCategory: "Recent / developing",
    lat: 53.1424,
    lng: -7.6921,
    flag: "🇮🇪",
  },
  {
    timeline: "Early–Oct 2026",
    country: "India",
    geojsonName: "India",
    movement: "Cockroach Janta Party and youth-led protests",
    classification: "Youth-led; political and student participation",
    triggersAndDemands: "Exam-paper leaks; unemployment; education grievances; allegations of electoral irregularities; demands for the Election Commission chief’s resignation.",
    statusOutcome: "Protests intensified in October, with arrests and judicial custody for movement leaders reported on 19 October. The Election Commission disputed allegations surrounding voter-roll removals.",
    statusCategory: "Ongoing",
    lat: 20.5937,
    lng: 78.9629,
    flag: "🇮🇳",
  },
  {
    timeline: "16–17 Oct 2026",
    country: "Italy",
    geojsonName: "Italy",
    movement: "Student activism amid wider European unrest",
    classification: "Student activism intersecting with broader demonstrations",
    triggersAndDemands: "Education and public-service concerns; economic insecurity; government policy; broader political grievances and living costs.",
    statusOutcome: "Demonstrations and clashes were reported in October. Student actions should be distinguished from other groups; no national Gen Z-led political transition was established.",
    statusCategory: "Recent / developing",
    lat: 41.8719,
    lng: 12.5674,
    flag: "🇮🇹",
  },
  {
    timeline: "17-Oct-26",
    country: "Belgium",
    geojsonName: "Belgium",
    movement: "Student and youth demonstrations amid European unrest",
    classification: "Student/youth-involved; developing movement",
    triggersAndDemands: "Education funding; tuition and higher-education reforms; wider grievances about living costs and public services.",
    statusOutcome: "Protests and clashes were reported in Brussels and Liège amid wider European unrest. Specific education-policy outcomes remained uncertain.",
    statusCategory: "Recent / developing",
    lat: 50.5039,
    lng: 4.4699,
    flag: "🇧🇪",
  },
];

// Helper to find matching protest record by GeoJSON feature properties
export function findProtestRecord(featureProperties: any): ProtestRecord | undefined {
  if (!featureProperties) return undefined;
  const admin = featureProperties.ADMIN || featureProperties.admin || "";
  const name = featureProperties.NAME || featureProperties.name || "";
  const nameLong = featureProperties.NAME_LONG || "";

  return PROTEST_DATA.find((item) => {
    if (admin === item.geojsonName || name === item.geojsonName || nameLong === item.geojsonName) {
      return true;
    }
    if (item.altGeojsonNames?.some((alt) => admin === alt || name === alt || nameLong === alt)) {
      return true;
    }
    return false;
  });
}

export function getStatusMeta(category: string): StatusMeta {
  return STATUS_COLORS[category] || {
    color: "#94A3B8",
    description: "Status details",
    badgeBg: "rgba(148, 163, 184, 0.15)",
  };
}
