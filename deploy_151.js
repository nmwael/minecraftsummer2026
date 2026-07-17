const { Client } = require('ssh2');
const fs = require('fs');

const config = {
  host: '192.168.1.45',
  port: 2022,
  username: 'nmwael.af6c99c1',
  password: 'cola4ola!',
  readyTimeout: 10000,
};

const conn = new Client();

conn.on('ready', () => {
  console.log('Connected!');
  conn.sftp((err, sftp) => {
    if (err) { console.error('SFTP Error:', err); conn.end(); process.exit(1); }

    const kubeJar = '/tmp/kubejs-neoforge-26.1.2-8.0.3.jar';
    const rhinoJar = '/tmp/rhino-2101.2.7-build.85.jar';
    const scriptSrc = '/workspaces/minecraftsummer2026/packwiz/kubejs/server_scripts/croptopia_cfb_compat.js';

    let done = 0;
    let failed = 0;
    const onFinish = () => { done++; if (done >= 3) { console.log(failed > 0 ? '\nSome uploads failed.' : '\nAll uploads successful! Restart the server via Pterodactyl panel.'); conn.end(); } };

    console.log('Uploading kubejs jar...');
    sftp.fastPut(kubeJar, 'mods/kubejs-neoforge-26.1.2-8.0.3.jar', {}, err => {
      if (err) { console.error('kubejs upload failed:', err.message); failed++; } else { console.log('kubejs.jar uploaded'); } onFinish();
    });

    console.log('Uploading rhino jar...');
    sftp.fastPut(rhinoJar, 'mods/rhino-2101.2.7-build.85.jar', {}, err => {
      if (err) { console.error('rhino upload failed:', err.message); failed++; } else { console.log('rhino.jar uploaded'); } onFinish();
    });

    console.log('Creating kubejs directory...');
    sftp.mkdir('kubejs/server_scripts', { recursive: true }, err => {
      if (err) { console.error('mkdir failed:', err.message); failed++; onFinish(); return; }
      console.log('Uploading script...');
      sftp.fastPut(scriptSrc, 'kubejs/server_scripts/croptopia_cfb_compat.js', {}, err => {
        if (err) { console.error('script upload failed:', err.message); failed++; } else { console.log('script uploaded'); } onFinish();
      });
    });
  });
});

conn.on('error', (err) => {
  console.error('Connection Error:', err.message);
  process.exit(1);
});

conn.connect(config);
