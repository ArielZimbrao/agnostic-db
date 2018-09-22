import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity';

@Controller('db/user')
export class UserController {
    constructor(private readonly userServide: UserService) {}

    @Post('save')
    async saveUser(@Body() user: User) {
        this.userServide.saveUser(user);
    }
}