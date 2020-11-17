import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import GenerateRefreshTokenService from '@modules/users/services/GenerateRefreshTokenService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ cpf, password });

    return response.json({ user: classToClass(user), token });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { grant_type, refresh_token } = request.body;

    const generateRefreshToken = container.resolve(GenerateRefreshTokenService);
    const { user, token } = await generateRefreshToken.execute({
      grant_type,
      refresh_token,
    });

    return response.json({ user: classToClass(user), token });
  }
}
