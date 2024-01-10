import { Controller, Get, Post, Body, Headers, Param, Delete } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { DchangePasswordAdministratorDto, DloginAdministratorDto, DcreateAdministratorDto } from './dto/main.dto'

@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Post('/register')
  create(@Body() createAdministratorDto: DcreateAdministratorDto) {
    return this.administratorsService.create(createAdministratorDto);
  }

  
  @Post('/login')
  login(@Body() loginAdministratorDto: DloginAdministratorDto) {
    return this.administratorsService.login(loginAdministratorDto);
  }


  @Post('/change-password')
  changePassword(@Body() changePasswordAdministratorDto: DchangePasswordAdministratorDto) {
    return this.administratorsService.changePassword(changePasswordAdministratorDto);
  }

  
  @Get('/get-me')
  getMe(@Headers() headers) {
    return this.administratorsService.getMe(headers);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorsService.remove(+id);
  }
}
