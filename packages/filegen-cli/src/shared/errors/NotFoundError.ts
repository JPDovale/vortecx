import { ApplicationError } from "../core/errors/ApplicationError";

export class NotFoundError extends ApplicationError {
  constructor(notFoundMessage: string) {
    super(`${notFoundMessage} not found`)
  }
}
