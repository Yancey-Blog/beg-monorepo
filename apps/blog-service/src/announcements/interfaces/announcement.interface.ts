import { Document } from 'mongoose'

export interface Announcement extends Document {
  readonly _id: string
  readonly content: string
  readonly weight: number
  readonly createdAt: Date
  readonly updatedAt: Date
}
