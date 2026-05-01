const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesDir = path.join(__dirname, 'modern-site', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  { url: 'https://static.wixstatic.com/media/718274_779df60e04b04ca385b6b271728be38f~mv2.jpg', name: 'rececao.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_2898eb7c913b4f959d55b5d81bf2b9c0~mv2.jpg', name: 'medicina_preventiva.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_d8f2ab9760a04bf2b25cd928a5ba26ff~mv2.jpg', name: 'analises.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_b49ca37e493f444986155a73cffe3bd8~mv2.jpg', name: 'cirurgia.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_7dc24e564769443c8a06a6be80517c2e~mv2.jpg', name: 'internamento.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_d86186a873234c12967b464dd0a70bc4~mv2.jpg', name: 'ecografia.jpg' },
  // Team
  { url: 'https://static.wixstatic.com/media/718274_3379e629d6784794a5eb428463270559~mv2.jpg', name: 'raquel.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_3ac816dd3f6c4135a23805262408c7ce~mv2.jpg', name: 'marco.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_7fc7464374c644c29af32063cf456647~mv2.jpg', name: 'carla.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_9730fea4c34341728541360720a067c2~mv2.jpg', name: 'claudia.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_2dd425de21a5410ca43f9ba020bd2f5e~mv2.jpg', name: 'rita.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_1e2fe79646b24d62b37315de1a55d2d0~mv2.jpg', name: 'joao.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_478f4573722e4d8d815013d2ad6cb8ce~mv2.jpg', name: 'catarina.jpg' },
  { url: 'https://static.wixstatic.com/media/718274_24ceb00cee82467f85d648079a6d072d~mv2.jpg', name: 'ana.jpg' }
];

const download = (url, dest) => {
  const file = fs.createWriteStream(dest);
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Referer': 'https://www.gatoescondido.net/'
    }
  };
  https.get(url, options, response => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)}`);
      });
    } else {
      file.close();
      fs.unlink(dest, () => {});
      console.error(`Failed to download ${path.basename(dest)}: Status ${response.statusCode}`);
    }
  }).on('error', err => {
    file.close();
    fs.unlink(dest, () => {});
    console.error(`Error downloading ${path.basename(dest)}: ${err.message}`);
  });
};

images.forEach(img => {
  download(img.url, path.join(imagesDir, img.name));
});
