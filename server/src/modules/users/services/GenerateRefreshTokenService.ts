import { sign, verify } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface IRequest {
  grant_type: string;
  refresh_token: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class GenerateRefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    refresh_token,
    grant_type,
  }: IRequest): Promise<IResponse> {
    if (grant_type === 'refresh_token') {
      const decoded = verify(refresh_token, authConfig.jwt.secret);
      console.log(refresh_token, verify(refresh_token, authConfig.jwt.secret));
      const { sub } = decoded as ITokenPayload;

      const user = await this.usersRepository.findById(sub);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const newToken = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      return { user, token: newToken };
    }

    throw new AppError('GRANT_TYPE IS MISSING', 400);
  }
}
