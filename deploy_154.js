const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
  console.log('Connected!');
  conn.sftp((err, sftp) => {
    if (err) { console.error('SFTP Error:', err); conn.end(); process.exit(1); }

    const src = '/workspaces/minecraftsummer2026/packwiz/config/infernalmobs.json';
    console.log('Uploading infernalmobs config (half spawn rate)...');
    sftp.fastPut(src, 'config/infernalmobs.json', {}, err => {
      if (err) { console.error('Upload failed:', err.message); }
      else { console.log('Config uploaded! Restart server via Pterodactyl panel.'); }
      conn.end();
    });
  });
});

conn.on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

conn.connect({
  host: '192.168.1.45',
  port: 2022,
  username: 'nmwael.af6c99c1',
  password: 'cola4ola!',
  readyTimeout: 10000,
});
