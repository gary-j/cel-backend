const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    story: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: String,
    thumbs: { type: Schema.Types.ObjectId, ref: 'ThumbComment' },
    commentId: {
      // type: ObjectId(this._id).valueOf(),
      type: String,
    },
    parentsComments: [String],
    isReported: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

commentSchema.post('save', function () {
  this.setCommentIdAndLastParentComment();
});

// les autres parentComment IDs sont spread(...) via le controller au Create
commentSchema.methods.setCommentIdAndLastParentComment = function () {
  let id = this._id.toString();
  this.commentId = id;
  this.parentsComments.push(id);
};

const Comment = model('Comment', commentSchema, 'comment');

module.exports = Comment;
