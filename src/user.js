const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('virtualPostCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove( {_id: { $in: this.blogPosts }} ).then(() => next()); //$in is part of mongo
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
