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

export default listingUtils;
