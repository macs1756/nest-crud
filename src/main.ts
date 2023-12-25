import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => {
    console.log('Server is working');
  });
}

async function connectToBase() {
  try {
    const databaseUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.jidxccl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(databaseUri);
    bootstrap();
  } catch (error) {
    console.log(error);
  }
}

connectToBase();
