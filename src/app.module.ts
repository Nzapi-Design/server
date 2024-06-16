import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DesignsModule } from './designs/designs.module';

@Module({
  imports: [UserModule, PrismaModule, DesignsModule],
})
export class AppModule {}
