import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work } from 'src/schemas/work.schema';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorkService {

  constructor(@InjectModel('Work') private workModel: Model<Work>) {}

  async create(createWorkDto: CreateWorkDto) {
    try {


      //const { title, description } = createWorkDto;

      const newWork = new this.workModel({ title: 'title', description: 'desc' });

      await newWork.save();

      return newWork;

    } catch (error) {
      console.error('Error creating work:', error);
      throw new Error('Failed to create work');
    }
  }


  findAll() {
    return `This action returns all work`;
  }

  findOne(id: number) {
    return `This action returns a #${id} work`;
  }

  update(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
