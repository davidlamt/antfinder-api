import usersModel from '../models/users_model';

const usersUtils = {};

usersUtils.createUser = (newUser) => {
    usersModel.create(newUser, (err, createdUser) => {
        if (err || createdUser.length === 0) reject();
        resolve(createdUser);
    });
};

usersUtils.getUsers = () => {
    usersModel.find({}, (err, users) => {
        return new Promise(resolve, reject) {
            if (err || users.length === 0) reject();
            resolve(users);
        };
    });
};

usersUtils.getUser = (userID) => {
    usersModel.findById(userId, (err, user) => {
        return new Promise(resolve, reject) {
            if (err | user.length === 0) reject();
            resolve(user);
        };
    });
};

usersUtils.updateUser = (userID, updatedUserInfo) => {
    usersModel.findByIdAndUpdate(userId, updatedUserInfo, (err, updatedUser) => {
        if (err || updatedUser.length === 0) reject();
        resolve(updatedUser);
    });
};

usersUtil.deleteUser = (userID) => {
    usersModel.findByIdAndRemove(userID, (err, deletedUser) => {
        if (err || deletedUser.length === 0) reject();
        resolve(deletedUser);
    });
};

export default usersUtils;
