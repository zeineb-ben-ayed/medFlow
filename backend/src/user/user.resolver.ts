import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  AuthGuard,
  Public,
  Resource,
  RoleGuard,
  Roles,
} from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';
import { Medecin } from 'src/medecin/medecin.entity';
import { Receptionniste } from 'src/receptionniste/receptionniste.entity';

@Resolver(() => User)
@Resource('user')
@UseGuards(AuthGuard, RoleGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @Roles({ roles: ['realm:admin'] })
  async getAllStaff(): Promise<User[]> {
    return this.userService.findAllMedecinsAndReceptionnistes();
  }

  resolveType(user: User) {
    if (user.role === 'medecin') {
      return Medecin;
    }
    if (user.role === 'receptionniste') {
      return Receptionniste;
    }
    return null;
  }

  @Mutation(() => Boolean)
  @Roles({ roles: ['realm:admin'] })
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.userService.deleteUserById(id);
    return true;
  }
}
