import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    listings: [String],
    status: { type: String, enum: ['User'], default: 'user', required: true },
    created_at: { type: Number, default: Date.now, required: true }
});

export default mongoose.model('User', userSchema);
