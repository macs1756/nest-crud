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


      const { title, description } = createWorkDto;

      const newWork = new this.workModel({ title, description });

      await newWork.save();

      return newWork;

    } catch (error) {
      console.error('Error creating work:', error);
      throw new Error('Failed to create work');
    }
  }


  async findAll() {
    try {
      
      const works = await this.workModel.find().sort('-createdAt')

      if(works){
        return works;
      }else{
        console.log('Works not found');
        throw new Error('Works not found');
      }

    } catch (error) {
      console.log(error);
      throw new Error('Failed to get works');
    }
  }


  async findOne(id: string) {
    try {
      
      const oneWork = await this.workModel.findById(id).exec();

      if(oneWork){
        return oneWork;
      }else{
        throw new Error('Failed to get one work');
      }

    } catch (error) {
      console.log(error); 
      throw new Error('Failed to get one work');
    }
  }

  async update(id: string, updateWorkDto: UpdateWorkDto) {

    const { title, description } = updateWorkDto;

    const updatedWork = await this.workModel.findByIdAndUpdate(id, { title, description }, {
      new: true, 
    }).exec();

    if (!updatedWork) {
      throw new Error('Failed to update work');
    }

    return updatedWork;
  }

  async remove(id: string) {
    try {
      
      await this.workModel.findByIdAndDelete(id);
      return { message: 'Post deleted successfully' };

    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete work');
    }
  }
}
