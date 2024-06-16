import { Module } from '@nestjs/common';
import { DesignsController } from './designs.controller';
import { DesignsService } from './designs.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [DesignsController],
  providers: [DesignsService, ImagesService],
  imports: [PrismaModule, UserModule],
})
export class DesignsModule {}
