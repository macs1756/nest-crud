import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })
export class Work extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

}

export const WorkSchema = SchemaFactory.createForClass(Work);
