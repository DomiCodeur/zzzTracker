const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}'
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Fichier d'environnement généré correctement à ${targetPath}`);
  }
});
