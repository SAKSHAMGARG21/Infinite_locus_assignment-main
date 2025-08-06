import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    try {
        const token = req.header('x-auth-token') || req.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        // console.log(token);
        // console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
