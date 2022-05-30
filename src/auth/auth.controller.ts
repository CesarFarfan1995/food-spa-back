import { Controller, Request, UseGuards, Post, Body} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  usersService: any;
  constructor(private readonly authSvc: AuthService) {}

  
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authSvc.registerUser(user);
    
  }


  @Post('login')
  login(@Request() req, @Body() userData:any){
    return  this.authSvc.loginUser(userData)
    
  }


}
