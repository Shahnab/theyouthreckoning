import fs from 'fs';
import https from 'https';

https.get('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/world_population.csv', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
    if (data.length > 1000) {
      console.log(data.substring(0, 500));
      process.exit(0);
    }
  });
});
