import { Body, Controller,Get,Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('/all')
    async getAllUsers(){
        return this.userService.allUsers();
    }

    @Post('/signup')
    async register(
        @Body() userData: {birthdate: Date, gender: string, username: string, email: string, password: string}
    ){
        return this.userService.createUser(userData);
    }

    @Get('/login')
    async login(@Res() res: Response){
        res.redirect("http://localhost:3000/oidc/auth?client_id=app&response_type=code&response_mode=query&redirect_uris=http://localhost:3001/callback&code_challenge=nqWxOqTBUa9iu9G5pL6LWChLS5TYEcyhwWbbQlj79ZU&code_challenge_method=S256&scope=openid")
    }
}
