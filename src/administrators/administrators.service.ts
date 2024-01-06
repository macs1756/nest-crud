import { Injectable,  Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrators } from 'src/schemas/user.schema';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { loginAdministratorDto } from './dto/login-administrator.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AdministratorsService {

  constructor(@InjectModel('Administrators') private administatorsModel: Model<Administrators>) { }

  readonly jwtSicret = process.env.JWT_SECRET_KEY

  async create(createAdministratorDto: CreateAdministratorDto) {

    const { password, username } = createAdministratorDto
    const isUsed = await this.administatorsModel.findOne({ username: username })

    if (!isUsed) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newAdministrator = new this.administatorsModel({ password: hashPassword, username });
      await newAdministrator.save();
      const jwtToken = jwt.sign({ id: newAdministrator._id}, this.jwtSicret);
      return {jwt:jwtToken, administrator:newAdministrator}
    } else {
      return "Username is already in use"
    }
  }


  async login(loginAdministratorDto: loginAdministratorDto) {

    const { password, username } = loginAdministratorDto

    const administrator = await this.administatorsModel.findOne({username})

    if(administrator){

      const isValidPassword = await bcrypt.compare(password, administrator.password);

      if(isValidPassword){

        const jwtToken = jwt.sign({ id: administrator._id}, this.jwtSicret);

        return {jwt: jwtToken, administrator}

      }else{
        return 'Password is wrong';
      }

    }else{
      return 'User not found';
    }
    
  }


  getMe(request) {

    const authorizationHeader = request.headers.authorization;

    return authorizationHeader;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
