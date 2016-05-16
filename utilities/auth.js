import usersModel from '../models/users_model';

export const userAuth = (req, res, next) => {
    let user;

    if (req.session.user) {
        if (!req.session.user.length) user = req.session.user;
        else user = req.session.user[0];
    }

    if (!req.session.user || (user.status !== 'User' && user.status !== 'Admin')) return res.sendStatus(401);

    usersModel.find({ username: user.username }, (err, userFound) => {
        if (err || userFound.length === 0) return res.sendStatus(401);

        return next();
    });
};

export const adminAuth = (req, res, next) => {
    let user;

    if (req.session.user) {
        if (!req.session.user.length) user = req.session.user;
        else user = req.session.user[0];
    }

    if (!req.session.user || user.status !== 'admin') return res.sendStatus(401);

    usersModel.find({ username: user.username }, (err, userFound) => {
        if (err || userFound.length === 0) return res.sendStatus(401);

        return next();
    });
};
