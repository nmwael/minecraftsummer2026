const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();

conn.on('ready', () => {
  console.log('Connected!');
  conn.sftp((err, sftp) => {
    if (err) { console.error('SFTP Error:', err); conn.end(); process.exit(1); }

    const scriptSrc = '/workspaces/minecraftsummer2026/packwiz/kubejs/server_scripts/croptopia_cfb_compat.js';
    console.log('Uploading fixed script (v1.5.3)...');
    sftp.fastPut(scriptSrc, 'kubejs/server_scripts/croptopia_cfb_compat.js', {}, err => {
      if (err) { console.error('Upload failed:', err.message); } else { console.log('Script updated! Restart the server via Pterodactyl panel.'); }
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
