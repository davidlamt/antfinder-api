import bcrypt from 'bcryptjs';

const encryptUtils = {};

encryptUtils.encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) reject();

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject();
                resolve(hash);
            });
        });
    });
};

encryptUtils.comparePassword = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, res) => {
            if (err || !res) reject();
            resolve();
        });
    });
};

export default encryptUtils;
