import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUserType {
  id: string;
  email: string;
}
export const AuthenticatedUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? user[data] : user;
  },
);
