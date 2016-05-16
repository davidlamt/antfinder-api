import mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, enum: ['new', 'used'], required: true },
    price: { type: Number, required: true },
    contact: { type: String, required: true },
    listing_type: { type: String, enum: ['book', 'car', 'misc'], required: true },
    creator: { type: String, required: true },
    created_at: {type: Number, default: Date.now, required: true }
});

export default mongoose.model('Listing', listingSchema);
