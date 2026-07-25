const { Client } = require('ssh2');
const https = require('https');
const fs = require('fs');
const path = require('path');

const config = {
  host: '192.168.1.45',
  port: 2022,
  username: 'nmwael.af6c99c1',
  password: 'cola4ola!',
  readyTimeout: 10000,
};

const mods = [
  { filename: 'animalgarden-alligatorgar-1.0.0-neoforge-26.1.1.8.jar', url: 'https://cdn.modrinth.com/data/bV68OKwf/versions/7MHgkB0P/animalgarden-alligatorgar-1.0.0-neoforge-26.1.1.8.jar' },
  { filename: 'animalgarden-bongo-1.0.1-neoforge-26.1.2.76.jar', url: 'https://cdn.modrinth.com/data/jLcflzN8/versions/OyhKF7jJ/animalgarden-bongo-1.0.1-neoforge-26.1.2.76.jar' },
  { filename: 'animalgarden-bullshark-1.1.1-neoforge-26.1.1.10.jar', url: 'https://cdn.modrinth.com/data/d83mmflQ/versions/v0PyD81d/animalgarden-bullshark-1.1.1-neoforge-26.1.1.10.jar' },
  { filename: 'animalgarden-commonraven-1.0.1-neoforge-26.1.2.10.jar', url: 'https://cdn.modrinth.com/data/EzyL5Shd/versions/pOBwdxfc/animalgarden-commonraven-1.0.1-neoforge-26.1.2.10.jar' },
  { filename: 'animalgarden-crocodile-1.1.0-neoforge-26.1.2.7.jar', url: 'https://cdn.modrinth.com/data/Gg7RMAJ0/versions/3ltEjqQT/animalgarden-crocodile-1.1.0-neoforge-26.1.2.7.jar' },
  { filename: 'animalgarden-culpeofox-1.0.0-neoforge-26.2.0.12.jar', url: 'https://cdn.modrinth.com/data/VtctvI8d/versions/bNRDMUZ1/animalgarden-culpeofox-1.0.0-neoforge-26.2.0.12.jar' },
  { filename: 'animalgarden_fennecfox-1.0.2-neoforge-26.1.2.7.jar', url: 'https://cdn.modrinth.com/data/BRO0Qo3Y/versions/K4tYNWch/animalgarden_fennecfox-1.0.2-neoforge-26.1.2.7.jar' },
  { filename: 'animalgarden-harpseal-1.0.1-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/NvaiT3Fr/versions/6PaYumu9/animalgarden-harpseal-1.0.1-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-hippopotamus-1.0.2-neoforge-26.1.1.10.jar', url: 'https://cdn.modrinth.com/data/PbzaJXgX/versions/R0rMCpaI/animalgarden-hippopotamus-1.0.2-neoforge-26.1.1.10.jar' },
  { filename: 'animalgarden-lion-1.0.3-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/dA4X7lKe/versions/4lSRj2MX/animalgarden-lion-1.0.3-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-manatee-1.0.2-neoforge-26.1.2.2.jar', url: 'https://cdn.modrinth.com/data/XzTcXQrj/versions/O1Aiuajx/animalgarden-manatee-1.0.2-neoforge-26.1.2.2.jar' },
  { filename: 'animalgarden-meerkat-1.0.6-neoforge-26.1.2.4.jar', url: 'https://cdn.modrinth.com/data/zOJ4MhgQ/versions/U4RWhO0C/animalgarden-meerkat-1.0.6-neoforge-26.1.2.4.jar' },
  { filename: 'animalgarden-mouse-1.0.6-neoforge-26.1.2.4.jar', url: 'https://cdn.modrinth.com/data/Mm8Kzdc6/versions/GipYxlPN/animalgarden-mouse-1.0.6-neoforge-26.1.2.4.jar' },
  { filename: 'animalgarden-narwhal-1.0.1-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/L6u2gHW6/versions/bIvSxMky/animalgarden-narwhal-1.0.1-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-owl-1.2.8-neoforge-26.1.2.4.jar', url: 'https://cdn.modrinth.com/data/gMz0rZEq/versions/KVP4PkDH/animalgarden-owl-1.2.8-neoforge-26.1.2.4.jar' },
  { filename: 'animalgarden_porcupine-1.0.5-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/m0TRBPCH/versions/QCQ5YTWa/animalgarden_porcupine-1.0.5-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-prairiedog-1.0.3-neoforge-26.1.2.2.jar', url: 'https://cdn.modrinth.com/data/vdm5Eivp/versions/6wkLWLmR/animalgarden-prairiedog-1.0.3-neoforge-26.1.2.2.jar' },
  { filename: 'animalgarden-redpanda-1.1.3-neoforge-26.1.2.4.jar', url: 'https://cdn.modrinth.com/data/7mT3pD13/versions/A6FuAyQq/animalgarden-redpanda-1.1.3-neoforge-26.1.2.4.jar' },
  { filename: 'animalgarden-redriverhog-1.0.0-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/LnGMw7NO/versions/Uzlruzz4/animalgarden-redriverhog-1.0.0-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-seaotter-1.1.1-neoforge-26.1.2.3.jar', url: 'https://cdn.modrinth.com/data/PFr3jBbA/versions/LAXXhLTc/animalgarden-seaotter-1.1.1-neoforge-26.1.2.3.jar' },
  { filename: 'animalgarden-snowleopard-1.0.1-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/dC08F5P8/versions/LqgV8Wt3/animalgarden-snowleopard-1.0.1-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden_spottedhyena-1.1.1-neoforge-26.1.2.7.jar', url: 'https://cdn.modrinth.com/data/xFPZRPlU/versions/xp5vqjeD/animalgarden_spottedhyena-1.1.1-neoforge-26.1.2.7.jar' },
  { filename: 'animalgarden-springhare-1.0.1-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/EF3qDSk4/versions/aDP5MqgP/animalgarden-springhare-1.0.1-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-sugarglider-1.0.1-neoforge-26.1.2.7.jar', url: 'https://cdn.modrinth.com/data/WktWffF9/versions/qKG3CMLB/animalgarden-sugarglider-1.0.1-neoforge-26.1.2.7.jar' },
  { filename: 'animalgarden-vicuna-1.0.1-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/WpQiC9rN/versions/xKTKnolI/animalgarden-vicuna-1.0.1-neoforge-26.1.1.1.jar' },
  { filename: 'animalgarden-westerngorilla-1.0.1-neoforge-26.1.2.7.jar', url: 'https://cdn.modrinth.com/data/OezYkPKQ/versions/ugGLjX1p/animalgarden-westerngorilla-1.0.1-neoforge-26.1.2.7.jar' },
  { filename: 'animalgarden-whiterhinoceros-1.0.1-neoforge-26.1.1.8.jar', url: 'https://cdn.modrinth.com/data/LTMmsfd4/versions/vObiE5QM/animalgarden-whiterhinoceros-1.0.1-neoforge-26.1.1.8.jar' },
  { filename: 'animalgarden-yellowmongoose-1.0.0-neoforge-26.2.0.7.jar', url: 'https://cdn.modrinth.com/data/iIoMOJHK/versions/70lRwffN/animalgarden-yellowmongoose-1.0.0-neoforge-26.2.0.7.jar' },
  { filename: 'aquariuslibs-1.2.0-neoforge-26.1.1.1.jar', url: 'https://cdn.modrinth.com/data/KkHnyaL6/versions/zTNzYMsS/aquariuslibs-1.2.0-neoforge-26.1.1.1.jar' },
];

const tmpDir = '/tmp/mod-downloads';
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlinkSync(dest); reject(err); });
    }).on('error', (err) => { file.close(); fs.unlinkSync(dest); reject(err); });
  });
}

async function main() {
  console.log(`Downloading ${mods.length} mod JARs...`);
  for (const mod of mods) {
    const dest = path.join(tmpDir, mod.filename);
    if (fs.existsSync(dest)) {
      console.log(`  ${mod.filename} already cached`);
      continue;
    }
    try {
      await downloadFile(mod.url, dest);
      console.log(`  Downloaded ${mod.filename}`);
    } catch (e) {
      console.error(`  FAILED ${mod.filename}: ${e.message}`);
    }
  }

  console.log('\nConnecting to server...');
  const conn = new Client();
  conn.on('ready', () => {
    console.log('Connected!');
    conn.sftp((err, sftp) => {
      if (err) { console.error('SFTP Error:', err); conn.end(); process.exit(1); }

      let done = 0;
      let failed = 0;
      const total = mods.length;
      const onFinish = () => {
        done++;
        if (done >= total) {
          console.log(failed > 0 ? `\n${failed}/${total} uploads failed.` : `\nAll ${total} mods uploaded successfully! Restart the server via Pterodactyl panel.`);
          conn.end();
        }
      };

      mods.forEach(mod => {
        const localPath = path.join(tmpDir, mod.filename);
        if (!fs.existsSync(localPath)) {
          console.log(`Skipping ${mod.filename} (not downloaded)`);
          failed++;
          onFinish();
          return;
        }
        console.log(`Uploading ${mod.filename}...`);
        sftp.fastPut(localPath, `mods/${mod.filename}`, {}, err => {
          if (err) { console.error(`${mod.filename} upload failed:`, err.message); failed++; } else { console.log(`${mod.filename} uploaded`); }
          onFinish();
        });
      });
    });
  });

  conn.on('error', (err) => {
    console.error('Connection Error:', err.message);
    process.exit(1);
  });

  conn.connect(config);
}

main();
