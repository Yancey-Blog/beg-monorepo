import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Motto } from './interfaces/motto.interface'
import { CreateMottoInput } from './dtos/create-motto.input'
import { UpdateMottoInput } from './dtos/update-motto.input'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly mottoModel: Model<Motto>,
  ) {
    this.mottoModel = mottoModel
  }

  public async findAll() {
    return this.mottoModel.find().sort({ weight: -1 })
  }

  public async findOneById(id: string) {
    return this.mottoModel.findById(id)
  }

  public async create(input: CreateMottoInput) {
    const all = await this.findAll()
    const weight = all[0] ? all[0].weight : 0
    return this.mottoModel.create({ ...input, weight: weight + 1 })
  }

  public async update(input: UpdateMottoInput) {
    const { id, content } = input

    return this.mottoModel.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true },
    )
  }

  public async exchangePosition(input: ExchangePositionInput) {
    const { id, exchangedId, weight, exchangedWeight } = input

    const exchanged = await this.mottoModel.findByIdAndUpdate(
      exchangedId,
      {
        weight,
      },
      { new: true },
    )

    const curr = await this.mottoModel.findByIdAndUpdate(
      id,
      {
        weight: exchangedWeight,
      },
      { new: true },
    )

    return [exchanged, curr]
  }

  public async deleteOneById(id: string) {
    return this.mottoModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]) {
    const res = await this.mottoModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }
}
