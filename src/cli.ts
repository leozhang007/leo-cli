import cac from 'cac'
import init, { list } from '.'
import { name, version } from '../package.json'

const cli = cac(name)

cli
  .command('<template> [project]', 'Create new project from a template')
  .option('-o, --offline', 'Try to use an offline template')
  .example(name => ` $ ${name} <template> [project] # with an official template`)
  .example(name => ` $ ${name} <owner>/<repo> [project] # with a github repo`)
  .action(init)

cli
  .command('list [owner]', 'Show all available templates')
  .alias('ls')
  .option('-c, --cache', 'Show all cached templates')
  .option('-j, --json', 'Output with json format')
  .option('-s, --short', 'Output with short format')
  .action(list)

cli.on('command:*', () => {
  console.error('Invalid command: %s', cli.args.join(' '))
  process.exit(1)
})

cli.help().version(version).parse()
