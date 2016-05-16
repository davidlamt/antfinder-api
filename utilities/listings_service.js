import listingsModel from '../models/listings_model';

const listingUtils = {};

listingUtils.createListing = newListing => {
    return new Promise((resolve, reject) => {
        listingsModel.create(newListing, (err, createListing) => {
            if (err || !createListing || createListing.length === 0) reject(err);
            resolve(createListing);
        });
    });
};

listingUtils.getListings = () => {
    return new Promise((resolve, reject) => {
        listingsModel.find({}, (err, listings) => {
            if (err || !listings || listings.length === 0) reject(err);
            resolve(listings);
        });
    });
};

export default listingUtils;
