import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
private userRepository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    const { username, email} = createUserDto

    const queryBuilder = await this.userRepository.
      createQueryBuilder('user').
      where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });
    
    const user = queryBuilder.getOne()
     if (user) {
      const errors = {username: 'Username and email must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);

    }
    
    let newUser = new User()
    newUser.email = email
    newUser.username = username

    const savedUser =  await this.userRepository.save(newUser)
  }
}
