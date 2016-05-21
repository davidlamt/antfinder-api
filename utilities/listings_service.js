import listingsModel from '../models/listings_model';

const listingUtils = {};

listingUtils.createListing = newListing => {
    return new Promise((resolve, reject) => {
        listingsModel.create(newListing, (err, createdListing) => {
            if (err || !createdListing || createdListing.length === 0) reject(err);
            resolve(createdListing);
        });
    });
};

listingUtils.getListings = () => {
    return new Promise((resolve, reject) => {
        listingsModel.find({}).sort({ 'created_at': -1 }).exec((err, listings) => {
            if (err || !listings || listings.length === 0) reject(err);
            resolve(listings);
        });
    });
};

listingUtils.getListingsForCurrentUser = (userID) => {
    return new Promise((resolve, reject) => {
        listingsModel.find({ creator: userID }).sort({ 'created_at': -1 }).exec((err, listings) => {
            if (err || !listings || listings.length === 0) reject(err);
            resolve(listings);
        });
    });
};

listingUtils.getListing = listingID => {
    return new Promise((resolve, reject) => {
        listingsModel.findById(listingID, (err, listing) => {
            if (err || !listing || listing.length === 0) reject(err);
            resolve(listing);
        });
    });
};

listingUtils.getListingAndUpdateViewCount = listingID => {
    return new Promise((resolve, reject) => {
        listingsModel.findByIdAndUpdate(listingID, { $inc: { 'views': 1 } }, (err, updatedListing) => {
            if (err || !updatedListing || updatedListing.length === 0) reject(err);
            resolve(updatedListing);
        });
    });
};

listingUtils.deleteListing = (userID, listingID) => {
    return new Promise((resolve, reject) => {
        listingsModel.findOneAndRemove({ creator: userID, _id: listingID }, (err, deletedListing) => {
            if (err || !deletedListing || deletedListing.length === 0) reject(err);
            resolve(deletedListing);
        });
    });
};

export default listingUtils;
