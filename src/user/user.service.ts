import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOrCreateUser(data: UserData): Promise<User> {
        let user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userAddress: data.userAddress,
                    username: data.username,
                    isAdmin: false
                },
            });
        }
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null>{
        const user = await this.prisma.user.findUnique({where: {email: email}})
        return user
    }

    async getUsers(): Promise<User[]>{
        const users = await this.prisma.user.findMany()
        return users
    }  
}
