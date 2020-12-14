import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import { config, strings, file, http } from '../common'
import { Context } from './types'

/**
 * Get template url.
 * @param input template name or uri
 * @todo # or @
 * @example
 * 1. short name, e.g. 'nm'
 * 2. full name, e.g. 'zce/nm'
 * 3. with branch, e.g. 'zce/nm#next'
 * 4. full url, e.g. 'https://github.com/zce/nm/archive/master.zip'
 */
export const getTemplateUrl = async (input: string): Promise<string> => {
  if (/^https?:/.test(input)) return input

  input = input.includes('/') ? input : `zce-templates/${input}`
  input = input.includes('#') ? input : `${input}#master`
  const [owner, name, branch] = input.split(/\/|#/)

  return strings.render(config.registry, { owner, name, branch })
}

/**
 * Resolve template from remote or local.
 */
export default async (ctx: Context): Promise<void> => {
  // local template path
  if (/^[./]|^[a-zA-Z]:/.test(ctx.template)) {
    ctx.src = path.resolve(ctx.template)
    return
  }

  // fetch remote template
  ctx.url = await getTemplateUrl(ctx.template)

  // url hash
  const hash = strings.md5(ctx.url)

  // template cache path
  ctx.src = path.join(config.paths.cache, hash)

  const exists = await file.isDirectory(ctx.src)

  if (ctx.offline) {
    // offline mode
    if (exists) {
      // found cached template
      console.log(`Use cached template @ \`${chalk.yellow(file.tildify(ctx.src))}\`.`)
      return
    }

    console.log(`Template cache \`${chalk.yellow(file.tildify(ctx.src))}\` not found.`)
  }

  // clear cache
  exists && await file.remove(ctx.src)

  const spinner = ora('Downloading template...').start()

  try {
    // download template zip
    const temp = await http.download(ctx.url)
    // extract template
    await file.extract(temp, ctx.src, 1)
    // clean up
    await file.remove(temp)
    spinner.succeed('Download template complete.')
  } catch (e) {
    spinner.fail('Download failed.')
    throw new Error(`Failed to fetch template \`${ctx.template}\`: ${e.message as string}.`)
  }
}
