import { Model, model, models, ObjectId, Schema } from 'mongoose';

export interface IComment {
  _id: ObjectId;
  belongsTo: ObjectId; //댓글이 속한 게시글의 아이디
  owner: ObjectId; //댓글 작성자
  content: string;
  likes: ObjectId[]; // 좋아요 누른 사람들
  replies: ObjectId[]; //대댓글;
  repliedTo: ObjectId; //어떤 댓글의 대댓글인지
  chiefComment: boolean; //  메인 댓글
  createdAt: string; //생성 날짜
}

/** 2023/06/11 - mongoose Comment Model Schema - by leekoby */
const CommentSchema = new Schema<IComment>(
  {
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    repliedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    chiefComment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
/** 2023/06/11 - Comment  Schema Model- by leekoby */
const Comment = models?.Comment || model('Comment', CommentSchema);

export default Comment as Model<IComment>;
