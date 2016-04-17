import usersModel from '../models/users_model';

export const userAuth = (req, res, next) => {
    if (!req.session || (req.session.status !== 'user' && req.session.status !== 'admin')) return res.sendStatus(401);

    usersModel.find({ username: req.session.username }, (err, user) => {
        if (err || user.length === 0) return res.sendStatus(401);

        return next();
    });
};

export const adminAuth = (req, res, next) => {
    if (!req.session || req.session.status !== 'admin') return res.sendStatus(401);

    usersModel.find({ username: req.session.username }, (err, user) => {
        if (err || user.length === 0) return res.sendStatus(401);

        return next();
    });
};
