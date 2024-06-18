import { cwd } from 'process'
import { workers } from '../index'
import { File } from './File'
import { isString } from 'lodash'

export function create(
  rawPaths: string[] | string,
  content: { [x: number | string]: any } | string,
) {
  const path = workers.folders.getPath(rawPaths)

  if (workers.files.exists(path)) {
    workers.logger.exit.error(
      'File already exists!',
      `files.create ${workers.figures.pointer} ${cwd()}`,
      ` create.path ${workers.figures.pointer} ${path}`,
    )
  }

  const file = File.create({
    path,
    rawContent: isString(content) ? content : JSON.stringify(content, null, 2),
  })

  workers.logger.info(` Creating file ${workers.figures.pointer} ${path}`)
  file.save()

  return file
}
