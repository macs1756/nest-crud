import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkModule } from './work/work.module';
import { WorkSchema } from 'src/schemas/work.schema';
import { AdministratorsSchema } from 'src/schemas/user.schema'
import { AdministratorsModule } from './administrators/administrators.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://macs1756:test12345@cluster1.jidxccl.mongodb.net/blog?retryWrites=true&w=majority'), 
    WorkModule,
    AdministratorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
