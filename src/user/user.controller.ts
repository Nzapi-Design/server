import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async createUser(@Body() data: UserData): Promise<User | null>{
        const user = await this.userService.findOrCreateUser(data)
        return user
    }

    @Get('findUserByEmail')
    async getUser(@Query('email') email: string){
        const user = await this.userService.getUserByEmail(email)
        return user
    }

    @Get()
    async getAllUser(): Promise<User[]>{
        return this.userService.getUsers()
    }
}
