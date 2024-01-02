import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministratorsSchema } from 'src/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Administrators', schema: AdministratorsSchema }])],
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
})
export class AdministratorsModule {}
