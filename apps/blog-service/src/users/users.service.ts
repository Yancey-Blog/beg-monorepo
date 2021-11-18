import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Request } from 'express'
import { ForbiddenError } from 'apollo-server-express'
import { User } from './interfaces/user.interface'
import { UpdateUserInput } from './dtos/update-user.input'
import { RegisterInput } from '../auth/dtos/register.input'
import { decodeJWT } from '../shared/utils'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    this.userModel = userModel
  }

  public async getUserCount(): Promise<number> {
    return this.userModel.estimatedDocumentCount()
  }

  public async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  public async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email })
  }

  public async findOneByUserName(username: string): Promise<User> {
    return this.userModel.findOne({ username })
  }

  public async create(input: RegisterInput): Promise<User> {
    return this.userModel.create(input)
  }

  public async updateUser(input: UpdateUserInput): Promise<User> {
    const { id, ...rest } = input
    return this.userModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async updateUserName(username: string, req: Request): Promise<User> {
    const { sub: id } = decodeJWT(req.headers.authorization)
    const user = await this.findOneByUserName(username)

    if (!user) {
      return this.userModel.findByIdAndUpdate(id, { username }, { new: true })
    }

    throw new ForbiddenError(`The username「${username}」 has been used.`)
  }

  public async updateEmail(email: string, req: Request): Promise<User> {
    const { sub: id } = decodeJWT(req.headers.authorization)
    const user = await this.findOneByEmail(email)

    if (!user) {
      return this.userModel.findByIdAndUpdate(id, { email }, { new: true })
    }
    throw new ForbiddenError(`The email「${email}」 has been used.`)
  }

  public async deleteOneById(req: Request): Promise<User> {
    const { sub: id } = decodeJWT(req.headers.authorization)
    return this.userModel.findByIdAndDelete(id)
  }
}
