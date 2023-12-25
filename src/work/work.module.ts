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



// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { CatsController } from './cats.controller';
// import { CatsService } from './cats.service';
// import { Cat, CatSchema } from './schemas/cat.schema';

// @Module({
//   imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
//   controllers: [CatsController],
//   providers: [CatsService],
// })
// export class CatsModule {}
