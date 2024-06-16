import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { Design } from '@prisma/client';
import { ImagesService } from 'src/images/images.service';

@Controller('api/designs')
export class DesignsController {
    constructor(
        private readonly designService: DesignsService,
        private readonly imagesService: ImagesService,
    ){}

    @Post()
    async createDesign(@Body() data: DesignData): Promise<Design | null>{
        const {frontDesigns, backDesigns, leftDesigns, rightDesigns } = data;

        const design = await this.designService.createDesign(data)

        if (frontDesigns && frontDesigns.length > 0) {
            await this.imagesService.addImages(design.id, frontDesigns, "FRONT");
        }
        if (backDesigns && backDesigns.length > 0) {
            await this.imagesService.addImages(design.id, backDesigns, "BACK");
        }
        if (leftDesigns && leftDesigns.length > 0) {
            await this.imagesService.addImages(design.id, leftDesigns, "LEFT");
        }
        if (rightDesigns && rightDesigns.length > 0) {
            await this.imagesService.addImages(design.id, rightDesigns, "RIGHT");
        }
        
        return design
    }

    @Get("designId")
    async getDesign(@Query('id') id: string): Promise<Design>{
        const design = await this.designService.getDesignById(id)
        return design
    }

    @Get()
    async getAllDesign(): Promise<Design[]>{
        return this.designService.getDesigns()
    }
}
