import { readFileSync } from 'fs';
import yargs, { requiresArg } from 'yargs';
import { startSession } from './ssh';

function main() {
  const args = yargs
    .option('port', {
      alias: 'p',
      type: 'number',
      description: 'port to connect on',
    })
    .option('o', {
      type: 'string',
      description: 'set ssh option',
    })
    .option('l', {
      description: 'login name',
      type: 'string',
    })
    .option('i', {
      type: 'string',
      description: 'identity file'
    })
    .command('* <host> [command]', 'connect to destination host', (yargs) =>
      yargs
        .positional('host', {
          type: 'string',
          description: 'destination host',
        })
        .positional('command', {
          type:'string',
        })
    )
    .help()
    .alias('h', 'help')
    .argv;

  console.log(args);

  startSession({
    host: args.host,
    port: args.port,
    username: args.l,
    privateKey: args.i ? readFileSync(args.i) : undefined,
  });
}

main();