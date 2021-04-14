import { createUnionType } from '@nestjs/graphql';
import { ErrorResult } from '../../common/errors/error-result.error';
import { User } from '../user/user.entity';

export const UserLoginResponse = createUnionType({
  name: 'UserLoginResponse',
  types: () => [User, ErrorResult],
});
