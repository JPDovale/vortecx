
import { z } from 'zod'


export type ChangePasswordUserBody = z.infer<typeof changepasswordUserBodySchema> & {}


export class ChangePasswordUserGateway {
  constructor() {}

  
}


