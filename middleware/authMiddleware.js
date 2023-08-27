const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const isLoginPage = req.url in { "/teacher": true, "/": true, "/teacher/create": true };

  if (!req.teacherId && !isLoginPage) {
    return res.status(401).render('error-unauthorized');
  }

  next();
};

module.exports = authMiddleware;
