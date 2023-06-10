// title, content, slug, tags, thumbnail, meta, author, date

import { Schema, model, models, ObjectId, Model } from 'mongoose';

export interface UserModelSchema {
  name: string;
  email: string;
  role: 'user' | 'admin';
  provider: 'github'; //|'google'| 'credential';
  avatar?: string;
}
/** 2023/06/10 - mongoose UserModelSchema - by leekoby */
const UserSchema = new Schema<UserModelSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    provider: {
      type: String,
      enum: ['github'], // 추후 추가할 수 있게 enum으로 생성
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/** 2023/06/10 - UserModelSchema- by leekoby */
const User = models?.User || model('User', UserSchema);
export default User as Model<UserModelSchema>;
