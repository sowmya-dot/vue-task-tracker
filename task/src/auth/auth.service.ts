import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Assuming user service handles MongoDB interactions
import { User } from '../user/user.schema'; // User schema for MongoDB
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({ username, password: hashedPassword });
    return { token: this.jwtService.sign({ userId: user._id }) };
  }

  async login(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { token: this.jwtService.sign({ userId: user._id }) };
  }
}