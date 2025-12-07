import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field((() => [String]))
    roles: string[];
}