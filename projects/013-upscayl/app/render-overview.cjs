// Export the authored vector diagram. SHARP_MODULE may point to an existing host installation.
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const assets = path.resolve(__dirname, '../assets');
sharp(path.join(assets, 'capability-overview.svg')).png().toFile(path.join(assets, 'capability-overview.png')).then(info => console.log(JSON.stringify(info)));
