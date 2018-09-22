import { Post, Controller, Body } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import Axios from 'axios';
const urlDB = 'http://localhost:5000';

@Controller()
export class AppController {

  @Post()
  root(@Body() user) {
    Axios.post(urlDB + '/db/user/save', {
      id: 1,
      name: 'Zimbrao',
    }).then( result => {
      if (result.status === 201) {
          console.log('Sucess');
      } else {
        console.log('OPS!!! :(');
      }
    });
  }
}
