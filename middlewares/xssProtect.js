import htmlUtil from '../utils/html.js';

const xssProtect = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = htmlUtil.sanitize(req.body[key]);
    }
  }

  for (const key in req.query) {
    if (typeof req.query[key] === 'string') {
      req.query[key] = htmlUtil.sanitize(req.query[key]);
    }
  }

  for (const key in req.headers) {
    if (typeof req.headers[key] === 'string') {
      req.headers[key] = htmlUtil.sanitize(req.headers[key]);
    }
  }

  for (const key in req.params) {
    if (typeof req.params[key] === 'string') {
      req.params[key] = htmlUtil.sanitize(req.params[key]);
    }
  }

  next();
};

export default xssProtect;
