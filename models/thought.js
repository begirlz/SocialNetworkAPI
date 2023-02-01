const { Schema, model } = require("mongoose");
const moment = require('moment');

// Reaction field's subdocument schema in the Thought model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },  
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },  
    username: {
      type: String,
      required: true,
    },  
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Required",
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// get a total number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});


const Thought = model("Thought", thoughtSchema);

module.exports = Thought;