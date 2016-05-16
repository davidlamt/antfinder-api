import mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, enum: ['New', 'Used'], required: true },
    price: { type: Number, required: true },
    contact: { type: String, required: true },
    views: { type: Number, default: 0, required: true },
    listing_type: { type: String, enum: ['Book', 'Phone', 'Car', 'Misc'], required: true },
    creator: { type: String, required: true },
    created_at: {type: Number, default: Date.now, required: true }
});

export default mongoose.model('Listing', listingSchema);
