import { Injectable,  Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrators } from 'src/schemas/user.schema';
import { DloginAdministratorDto, DcreateAdministratorDto, DchangePasswordAdministratorDto } from './dto/main.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AdministratorsService {

  constructor(@InjectModel('Administrators') private administatorsModel: Model<Administrators>) { }

  readonly jwtSicret = process.env.JWT_SECRET_KEY

  async create(createAdministratorDto: DcreateAdministratorDto) {

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


  async login(loginAdministratorDto: DloginAdministratorDto) {

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


  async getMe(headers) {

    const authorizationHeader = headers.authorization;
    const clearAuthorizationHeader = authorizationHeader.replace('Bearer ', '')

    const verifyJWT:any = jwt.verify(clearAuthorizationHeader, this.jwtSicret);


    if(verifyJWT){
      const administator = await this.administatorsModel.findById(verifyJWT?.id)
      return administator
    }else{
      return 'Token is invalid'
    }
  }


  async changePassword(changePasswordAdministratorDto: DchangePasswordAdministratorDto) {

    const { confirmNewPasword, newPassword, password, username } = changePasswordAdministratorDto


    if(newPassword === confirmNewPasword){

      const administarator = await this.administatorsModel.findOne({username})

      if(administarator){

        const isValidPassword  = await bcrypt.compare(password, administarator.password)

        if(isValidPassword){

          const id = administarator._id

          const newUser = this.administatorsModel.findByIdAndUpdate(id, {
            password: newPassword
          })

          const jwtToken = jwt.sign({ id: newUser._id}, this.jwtSicret);

          return { jwt:jwtToken, newUser }

        }else{ return 'Password is invalid' }

        
      }else{ return 'Administrator not found' }

    }else{
      return "New passwords don't match"
    }


  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
