// cd src/scripts
// node generateImgsURLs.ts
import fs from 'fs/promises';
const crewFiles = await fs.readdir('../../public/img/crews');
const crewsPath = crewFiles.map((file) => `/img/crews/${file}`);
const racerFiles = await fs.readdir('../../public/img/racers');
const racersPaths = racerFiles.map((file) => `/img/racers/${file}`);
const elementsPaths = JSON.stringify(crewsPath.concat(racersPaths), null, 6);
const fileContent = `import { useEffect } from 'react';

export function PreloadImgs() {
  // LOGIC
  useEffect(() => {
    const urls = ${elementsPaths};

    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // TEMPLATE
  return <></>;
}`;

fs.writeFile('../components/PreloadImgs.tsx', fileContent);
