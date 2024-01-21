
import { ChangePasswordUserBody, changepasswordUserBodyValidationPipe } from '../gateways/ChangePasswordUser.gateway'
import { ChangePasswordUserService } from '../services/ChangePasswordUser.service'
import { Body, Controller, Post, HttpCode } from '@nestjs/common'



@Controller()
export class ChangePasswordUserController {
  constructor() {}

  
  @Post();@HttpCode();
  handle (@Body() body: ChangePasswordUserBody)  {}
}


