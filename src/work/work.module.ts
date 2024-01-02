import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSchema } from 'src/schemas/work.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Work', schema: WorkSchema }])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}

