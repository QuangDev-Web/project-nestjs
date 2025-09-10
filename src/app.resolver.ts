import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Message {
  @Field()
  text: string;
}

@Resolver(() => Message)
export class AppResolver {
  @Query(() => Message)
  hello(): Message {
    return { text: 'Hello GraphQL with NestJS!' };
  }
}