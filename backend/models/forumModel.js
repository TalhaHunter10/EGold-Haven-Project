const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumPostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userstatus: { type: String, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: 'ForumReply' }]
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

// ForumReply Schema
const forumReplySchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userstatus: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'ForumPost', required: true }
});

const ForumReply = mongoose.model('ForumReply', forumReplySchema);

module.exports = { ForumPost, ForumReply };