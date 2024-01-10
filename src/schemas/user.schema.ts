import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })
export class Administrators extends Document {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

}

export const AdministratorsSchema = SchemaFactory.createForClass(Administrators);
