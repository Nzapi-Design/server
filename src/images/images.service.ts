import { Injectable } from '@nestjs/common';
import { Image, ImageType } from '@prisma/client';
import { DesignsService } from 'src/designs/designs.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
    constructor(
        private prisma: PrismaService,
        private designService: DesignsService,
    ) {}

    async addImages(designId: string, urls: string[], type: ImageType): Promise<Image[]> {
        // Check if the design exists
        const design = await this.designService.getDesignById(designId);
        if (!design) {
            throw new Error('Design not found');
        }

        const imageDataArray = urls.map(url => ({
            designId,
            url,
            type,
            userId: design.userId,
        }));

         await this.prisma.image.createMany({
            data: imageDataArray,
        });

        const createdImages = await this.prisma.image.findMany({
            where: {
                designId,
                url: { in: urls },
            },
        });

        return createdImages;
    }

    async getImagesByDesignId(designId: string): Promise<Image[]> {
        return this.prisma.image.findMany({
            where: {
                designId,
            },
        });
    }
}
