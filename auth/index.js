const Supplier = require("../models/supplier.model");

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const secret = process.env.JWT_SECRET

const decodeToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        res.locals.user = jwt.verify(token, secret)
        next()
    } catch (err) {
        next()
    }
}


const userAuth = (
    {
        permission = "",
        isDeliveryMan = false,
        isAdmin = false,
        hasOrderAccess = false,
        isEmployee = false,
        isUser = false,
        isSupplier = false,
        isAuth = false,
        isAdminEmployee = false,
    }
) => async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        let decode = jwt.verify(token, secret);
        // @ts-ignore
        let user = await User.findById(decode._id, "role permission first_name last_name email phone");
        res.locals.user = user;
        const userRoles = ['admin', 'supplier', 'employee', "user", "delivery"]
        const staff = ['admin', 'employee', 'supplier', 'delivery']
        const orderAccess = ['admin', 'employee', 'delivery']
        const adminEmployee = ['admin', 'employee']
        if (isAdmin && user.role === "admin") {
            return next()
        } else if (isUser && user.role === "user") {
            return next()
            // @ts-ignore
        } else if (isAdminEmployee && adminEmployee.includes(user.role)) {
            return next()
            // @ts-ignore
        } else if (isDeliveryMan && user.role === "delivery") {
            return next()
            // @ts-ignore
        } else if (isSupplier && user.role === "supplier") {
            return next()
            // @ts-ignore
        } else if (userRoles.includes(user.role) && isAuth) {
            return next()
            // @ts-ignore
        } else if (staff.includes(user.role) && isEmployee) {
            return next()
        } else if (orderAccess.includes(user.role) && hasOrderAccess) {
            return next()
        } else if (havePermission(permission, user.permission)) {
            return next()
        }
        return res.status(401).send({
            error: true,
            msg: "Unauthorized access",
        });
    } catch (err) {
        return res.status(401).send({
            error: true,
            msg: "Unauthorized access",
        });
    }
};

const havePermission = (permission, roles) => {
    for (let role of roles || []) {
        if (role.permissions.includes(permission)) {
            return true
        }
    }
    return false
}


const isSupplier = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        let user = jwt.verify(token, secret)
        // @ts-ignore
        if (user?.role === 'supplier') {
            // @ts-ignore
            let supplier = await Supplier.findOne({supplier: user._id})
            res.locals.user = user
            res.locals.user.supplier = supplier
            return next()
        }
        return res.status(401).send({
            error: true,
            msg: 'Unauthorized action'
        })
    } catch (err) {
        return res.status(401).send({
            error: true,
            msg: 'Unauthorized action'
        })
    }
}

const isAdmin = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        let user = jwt.verify(token, secret)
        // @ts-ignore
        if (user?.role === 'admin') {
            res.locals.user = user
            return next()
        }
        return res.status(401).send({
            error: true,
            msg: 'Unauthorized action'
        })
    } catch (err) {
        return res.status(401).send({
            error: true,
            msg: 'Unauthorized action'
        })
    }
}

module.exports = {
    decodeToken,
    userAuth,
    isAdmin,
    isSupplier,
    havePermission
}