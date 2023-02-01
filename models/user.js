const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // matching validation using RegEx
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thoughts'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

// create a virtual property `friendCount` that gets total count of friends
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;;
  })

// initialize User model
const User = model('user', userSchema);

//export model
module.exports = User;
