import usersModel from '../models/users_model';

const usersUtils = {};

usersUtils.createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        usersModel.create(newUser, (err, createdUser) => {
            if (err || !createdUser || createdUser.length === 0) reject();
            resolve(createdUser);
        });
    });
};

usersUtils.getUsers = () => {
    return new Promise((resolve, reject) => {
        usersModel.find({}, (err, users) => {
            if (err || !users || users.length === 0) reject();
            resolve(users);
        });
    });
};

usersUtils.getUser = (userID) => {
    return new Promise((resolve, reject) => {
        usersModel.findById(userID, (err, user) => {
            if (err || !user || user.length === 0) reject();
            resolve(user);
        });
    });
};

usersUtils.getUserByUsername = username => {
    return new Promise((resolve, reject) => {
        usersModel.find({ username }, (err, user) => {
            if (err || !user || user.length === 0) reject();
            resolve(user);
        });
    });
};

usersUtils.updateUser = (userID, updatedUserInfo) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndUpdate(userID, updatedUserInfo, (err, updatedUser) => {

            if (err || !updatedUser || updatedUser.length === 0) reject();
            resolve(updatedUser);
        });
    });
};

usersUtils.deleteUser = (userID) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndRemove(userID, (err, deletedUser) => {
            if (err || !deletedUser || deletedUser.length === 0) reject();
            resolve(deletedUser);
        });
    });
};

export default usersUtils;
