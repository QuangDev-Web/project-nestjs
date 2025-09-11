import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    create(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput)
    }

    @Query(() => [User],{name: 'users'})
    findAll() {
        return this.userService.findAll()
    }

    @Query(() => User,{name: 'user'})
    findOne(@Args('id',{type: () => Int}) id: number) {
        return this.userService.findOne(id)
    }
    
    @Mutation(() => User)
    update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput)
    }

    @Mutation(() => User)
    remove(@Args('id', {type: () => Int}) id: number) {
        return this.userService.delete(id)
    }
}