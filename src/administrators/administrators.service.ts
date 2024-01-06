import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrators } from 'src/schemas/user.schema';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdministratorsService {

  constructor(@InjectModel('Administrators') private administatorsModel: Model<Administrators>) { }


  async create(createAdministratorDto: CreateAdministratorDto) {

    const { password, username } = createAdministratorDto

    const isUsed = await this.administatorsModel.findOne({ username: username })
    

    if (!isUsed) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newAdministrator = new this.administatorsModel({ password: hashPassword, username });
      await newAdministrator.save();
      return newAdministrator
    } else {
      return "Username is already in use"
    }

  }

  findAll() {
    return `This action returns all administrators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
