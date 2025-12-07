import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  AuthenticatedUser,
  AuthGuard,
  Public,
  Resource,
  RoleGuard,
  Roles,
} from 'nest-keycloak-connect';
import { Get, UseGuards } from '@nestjs/common';
import { Medecin } from 'src/medecin/medecin.entity';
import { Receptionniste } from 'src/receptionniste/receptionniste.entity';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Resource('user')
  @Query(() => UserDto)
  getCurrentUser(@AuthenticatedUser() user: any): UserDto {
    return {
      id: user.sub,
      username: user.preferred_username,
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
    };
  }

  @Query(() => User)
  @Resource('user')
  @Roles({ roles: ['realm:admin', 'realm:medecin', 'realm:receptionniste'] })
  getProfile(@AuthenticatedUser() kcUser: any) {
    const keycloakId = kcUser.sub;
    return this.userService.getProfile(keycloakId);
  }

  @Mutation(() => User)
  @Resource('user')
  @Roles({ roles: ['realm:admin', 'realm:medecin', 'realm:receptionniste'] })
  async editProfile(
    @AuthenticatedUser() kcUser: any,
    @Args('updateData') updateData: UpdateUserDto,
  ) {
    return this.userService.updateProfile(kcUser.sub, updateData);
  }
}
