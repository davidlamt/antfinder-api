import usersModel from '../models/users_model';

export const userAuth = (req, res, next) => {
    if (!req.session.user || (req.session.user[0].status !== 'user' && req.session.user[0].status !== 'admin')) return res.sendStatus(401);

    usersModel.find({ username: req.session.user[0].username }, (err, user) => {
        if (err || user.length === 0) return res.sendStatus(401);

        return next();
    });
};

export const adminAuth = (req, res, next) => {
    if (!req.session.user || req.session.user[0].status !== 'admin') return res.sendStatus(401);

    usersModel.find({ username: req.session.user[0].username }, (err, user) => {
        if (err || user.length === 0) return res.sendStatus(401);

        return next();
    });
};
