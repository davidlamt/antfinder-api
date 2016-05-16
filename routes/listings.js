var express = require('express');
var router = express.Router();

import listingUtils from '../utilities/listings_service';
import userUtils from '../utilities/users_service';

import { userAuth, adminAuth } from '../utilities/auth';

router.post('/', userAuth, (req, res) => {
    const { title, description, condition, price, contact, listing_type, creator } = req.body;
    const newListing = { title, description, condition, price, contact, listing_type };
    let user = req.session.user;

    if (req.session.user.length === 1) user = req.session.user[0];

    newListing.creator = user._id;

    listingUtils.createListing(newListing).then(createdListing => {
        userUtils.addListingToUser(user._id, createdListing._id).then(updatedUser => {
            res.json(createdListing);
        }, err => res.send(404));
    }, err => res.send(500));
});

router.get('/', userAuth, (req, res) => {
    listingUtils.getListings().then(listings => {
        res.json(listings);
    }, err => res.sendStatus(404));
});

router.get('/current_user', userAuth, (req, res) => {
    const user = req.session.user[0];

    listingUtils.getListingsForCurrentUser(user._id).then(listings => {
        res.json(listings);
    }, err => res.sendStatus(404));
});

router.get('/:id', userAuth, (req, res) => {
    const listingID = req.params.id;

    listingUtils.getListingAndUpdateViewCount(listingID).then(listing => {
        res.json(listing)
    }, () => res.sendStatus(404));
});

module.exports = router;
