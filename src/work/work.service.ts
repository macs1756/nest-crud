import { Injectable } from '@nestjs/common';
import { Work } from 'src/schemas/work.schema';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorkService {

  async create(createWorkDto: CreateWorkDto) {
    try {
      const { title, description } = createWorkDto;

      const newWork = new Work({ title: 'title', description: 'desc' });

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
