import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MedecinResolver {
    @Query(() => String)
      hello() {
        return 'Hello World';
      }
}
