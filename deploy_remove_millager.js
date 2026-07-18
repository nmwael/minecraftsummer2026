const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
  console.log('Connected!');
  conn.sftp((err, sftp) => {
    if (err) { console.error('SFTP Error:', err); conn.end(); process.exit(1); }

    const path = 'mods/millager-neoforge-26.1.2-0.5.1.1.jar';
    console.log('Removing Millager jar...');
    sftp.unlink(path, err => {
      if (err) {
        if (err.code === 2) {
          console.log('File already gone (not found).');
        } else {
          console.error('Delete failed:', err.message);
          conn.end();
          process.exit(1);
          return;
        }
      } else {
        console.log('Millager jar removed.');
      }
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
