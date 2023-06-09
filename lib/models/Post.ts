// title, content, slug, tags, thumbnail, meta, author, date

import { Schema, model, models, ObjectId, Model } from 'mongoose';

export interface PostModelSchema {
  title: string;
  slug: string;
  meta: string;
  content: string;
  tags: string[];
  thumbnail: { url: string; public_id: string };
  createdAt: Date;
  author: ObjectId;
}
/** 2023/06/08 - mongoose schema - by leekoby */
const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

/** 2023/06/08 - schema model- by leekoby */
const Post = models?.Post || model('Post', PostSchema);
export default Post as Model<PostModelSchema>;
