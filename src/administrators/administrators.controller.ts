import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { loginAdministratorDto } from './dto/login-administrator.dto'

@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Post('/register')
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorsService.create(createAdministratorDto);
  }

  
  @Post('/login')
  login(@Body() loginAdministratorDto: loginAdministratorDto) {
    return this.administratorsService.login(loginAdministratorDto);
  }

  @Get('/get-me')
  getMe(@Request() request) {
    return this.administratorsService.getMe(request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorsService.remove(+id);
  }
}
