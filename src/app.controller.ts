import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { Response } from 'express';
import * as qs from "query-string"
import { KoaContextWithOIDC } from 'oidc-provider';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('first')
  getLoginPage(ctx: KoaContextWithOIDC): object{
    // const {
    //   oidc: {provider}
    // } = ctx;

    console.log(ctx);
    return{
      message: 'hi'
    }
  }  

  @Get('/callback')
  async getCallback(@Query('code') code: string, @Res() res: Response) {
    console.log("first",code);
    const result = await axios.post(
      'http://localhost:3000/oidc/token',
      qs.stringify({
        client_id: 'app',
        grant_type: 'authorization_code',
        redirect_uris: 'http://localhost:3000/callback',
        code,
        code_verifier: 'WzE2NywxMDgsMTEyLDU1LDIxOSwxNjksODAsMTQxLDQsNCwyNTMsOCwxNDksNDYsNjAsMTI4XQ'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic YXBwOmFfc2VjcmV0'
        },
      },
    );
    console.log("Code",code);
    console.log("THis is result data",result.data);
    res.redirect('/');
  }
}
