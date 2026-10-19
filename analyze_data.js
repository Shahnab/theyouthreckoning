import Papa from 'papaparse';
import fs from 'fs';
import https from 'https';

https.get('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/world_population.csv', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const parsed = Papa.parse(data, { header: true, dynamicTyping: true, skipEmptyLines: true });
    const pops = parsed.data.map(d => d.pop).filter(p => p != null);
    pops.sort((a, b) => a - b);
    console.log('Total points:', pops.length);
    console.log('Min:', pops[0]);
    console.log('Max:', pops[pops.length - 1]);
    console.log('Median:', pops[Math.floor(pops.length / 2)]);
    console.log('90th percentile:', pops[Math.floor(pops.length * 0.9)]);
    console.log('99th percentile:', pops[Math.floor(pops.length * 0.99)]);
  });
});
