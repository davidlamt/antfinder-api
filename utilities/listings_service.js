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

listingUtils.getListing = listingID => {
    return new Promise((resolve, reject) => {
        listingsModel.findById(listingID, (err, listing) => {
            if (err || !listing || listing.length === 0) reject(err);
            resolve(listing);
        });
    });
};

export default listingUtils;
