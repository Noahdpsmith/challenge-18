const { Schema, model, Types } = require('mongoose');
// const { stringify } = require('querystring');
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280

        },
        username: {
            type: String,
            required: true

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue)

        },

    },
    {
        toJSON: {
            getters:true,
        }
    }
);
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minLenght: 0
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => dateFormat(createdAtValue),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;