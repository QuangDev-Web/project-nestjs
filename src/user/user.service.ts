import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRespository: Repository<User>
    ) {}

    create(createUserInput:CreateUserInput) : Promise<User> {
        const newUser = this.userRespository.create(createUserInput)
        return this.userRespository.save(newUser)
    }

    findAll() : Promise<User[]> {
        return this.userRespository.find()
    }

    async findOne(id: number) : Promise<User> {
        const findedUser = await this.userRespository.findOneBy({id})
        if(findedUser) {
            return findedUser
        } else {
            throw new Error(`Not Found User with ${id}`)
        }
        
    }

    async update(updateUserInput:UpdateUserInput) : Promise<User> {
        const findedUser = await this.userRespository.findOneBy({id : updateUserInput.id})
        if(!findedUser) {
            throw new Error(`Not Found User with ${updateUserInput.id}`)
        }
        Object.assign(findedUser,updateUserInput)
        return this.userRespository.save(findedUser)
    }

    async delete(id: number): Promise<String> {
        const findedUser = await this.userRespository.findOneBy({id})
        if(!findedUser) {
            throw new Error(`Not Found User with ${id}`)
        }
        await this.userRespository.delete(id)
        return `Delete user success`
    }
}