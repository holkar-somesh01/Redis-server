const rateLimit = require('express-rate-limit')

exports.Limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})