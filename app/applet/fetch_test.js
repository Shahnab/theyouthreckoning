import https from 'https';
import Papa from 'papaparse';

https.get('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/world_population.csv', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
    if (data.length > 1000) {
      const parsed = Papa.parse(data, { header: true, preview: 5 });
      console.log(parsed.data);
      process.exit(0);
    }
  });
});
