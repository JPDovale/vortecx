
import { Either } from '@shared/core/errors'

interface Request { }

type Response = Either<null,null> & {}

@Injectable()
export class ChangePasswordUserService {
  constructor() {}

  
  
  async execute ({ }: Request): Promise<Response> {}
}


