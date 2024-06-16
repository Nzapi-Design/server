import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { Design, Image } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DesignsService {
    constructor(
        private userService: UsersService,
        private prisma: PrismaService
    ){}

    async createDesign (data: DesignData): Promise<Design> {
        const user = await this.userService.findOrCreateUser(data)

        const design = await this.prisma.design.create({
            data: {
                title: data.title,
                category: data.category,
                description: data.description,
                amount: data.amount,
                userId: user.id
            }
        })

        return design
    }

    async getDesignById(id: string): Promise<(Design & { image: Image[] })>{
        const designs = await this.prisma.design.findFirst({
            where: {
                id
            },
            include: {
                image: true,
            }
        })
        return designs
    }  

    async getDesigns(): Promise<(Design & { image: Image[] })[]> {
        const designs = await this.prisma.design.findMany({
            include: {
                image: true,
            },
        });

        return designs;
    }
}
