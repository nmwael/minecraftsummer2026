const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
  console.log('Connected!');
  conn.sftp((err, sftp) => {
    if (err) { console.error('SFTP Error:', err); conn.end(); process.exit(1); }

    const src = '/workspaces/minecraftsummer2026/packwiz/kubejs/server_scripts/croptopia_cfb_compat.js';
    console.log('Uploading fixed script (tags + maple:salt)...');
    sftp.fastPut(src, 'kubejs/server_scripts/croptopia_cfb_compat.js', {}, err => {
      if (err) { console.error('Upload failed:', err.message); }
      else { console.log('Script updated! Restart server via Pterodactyl panel.'); }
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
