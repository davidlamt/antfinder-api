import usersModel from '../models/users_model';

const usersUtils = {};

usersUtils.createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        usersModel.create(newUser, (err, createdUser) => {
            if (err || createdUser.length === 0) reject();
            resolve(createdUser);
        });
    });
};

usersUtils.getUsers = () => {
    return new Promise((resolve, reject) => {
        usersModel.find({}, (err, users) => {
            if (err || users.length === 0) reject();
            resolve(users);
        });
    });
};

usersUtils.getUser = (userID) => {
    return new Promise((resolve, reject) => {
        usersModel.findById(userID, (err, user) => {
            if (err || user.length === 0) reject();
            resolve(user);
        });
    });
};

usersUtils.updateUser = (userID, updatedUserInfo) => {
    usersModel.findByIdAndUpdate(userId, updatedUserInfo, (err, updatedUser) => {
        return new Promise((resolve, reject) => {
            if (err || updatedUser.length === 0) reject();
            resolve(updatedUser);
        });
    });
};

usersUtils.deleteUser = (userID) => {
    usersModel.findByIdAndRemove(userID, (err, deletedUser) => {
        return new Promise((resolve, reject) => {
            if (err || deletedUser.length === 0) reject();
            resolve(deletedUser);
        });
    });
};

export default usersUtils;
