import * as files from './files'
import * as folders from './folders'
import * as logger from './logger'

export type Workers = typeof workers

export const workers = {
  files,
  folders,
  logger,
}
