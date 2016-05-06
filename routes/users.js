var express = require('express');
var router = express.Router();

import encryptUtils from '../utilities/encrypt';
import userUtils from '../utilities/users_service.js';

import { userAuth, adminAuth } from '../utilities/auth';

router.post('/', (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;

    encryptUtils.encryptPassword(password).then((hashedPassword) => {
        const newUser = { first_name, last_name, email, username, password: hashedPassword };

        userUtils.createUser(newUser).then((createdUser) => {
            req.session.user = createdUser;

            res.json(createdUser);
        }, () => res.sendStatus(400));
    }, () => res.sendStatus(500));
});

router.get('/', adminAuth, (req, res) => {
    userUtils.getUsers().then((users) => {
        res.json(users);
    }, () => res.sendStatus(404));
});

router.get('/:id', adminAuth, (req, res) => {
    const userID = req.params.id;

    userUtils.getUser(userID).then((user) => {
        res.json(user);
    }, () => res.sendStatus(404));
});

router.put('/', userAuth, (req, res) => {
    const { oldPassword, password } = req.body;

    encryptUtils.comparePassword(oldPassword, req.session.user[0].password).then(() => {
        encryptUtils.encryptPassword(password).then((hashedPassword) => {
            const newUserInfo = { password: hashedPassword };

            userUtils.updateUser(req.session.user[0]._id, newUserInfo).then((updatedUser) => {
                req.session.user.password = hashedPassword;

                res.json(updatedUser);
            }, () => res.sendStatus(404));
        }, () => res.sendStatus(500));
    }, () => res.sendStatus(401));
});

router.put('/:id', adminAuth, (req, res) => {
    const userID = req.params.id;
    const { first_name, last_name, email, username, password } = req.body;

    encryptUtils.encryptPassword(password).then((hashedPassword) => {
        const newUserInfo = { first_name, last_name, email, username, password: hashedPassword };

        userUtils.updateUser(userID, newUserInfo).then((updatedUser) => {
            const { _id, created_at, status } = req.session.user;

            req.session.user = newUserInfo;
            req.session.user._id = _id;
            req.session.user.created_at = created_at;
            req.session.user.status = status;

            res.json(updatedUser);
        }, () => res.sendStatus(404));
    }, () => res.sendStatus(500));
});

router.delete('/', userAuth, (req, res) => {
    userUtils.deleteUser(req.session.user._id).then(deletedUser => {
        req.session.destroy();
        res.json(deletedUser);
    }, () => res.sendStatus(404));
});

router.delete('/:id', adminAuth, (req, res) => {
    const userID = req.params.id;

    userUtils.deleteUser(userID).then((deletedUser) => {
        req.session.destroy();
        res.json(deletedUser);
    }, () => res.sendStatus(404));
});

module.exports = router;
