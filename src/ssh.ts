import { Client, ConnectConfig } from 'ssh2';
import Debug from 'debug';

const debug = Debug('ssh');

export function startSession(config: ConnectConfig) {
  const client = new Client();
  client.on('ready', () => {
    debug('ready');

    client.shell((err, stream) => {
      if (err) throw err;
      stream.on('close', () => {
        debug('close');
        client.end();
      })
      .on('data', (data: string) => {
        console.log(data);
      });
    });
  })
  .connect(config);
}