module.exports = function (req, res, next) {
  const defaultPage = 1;
  const defaultLimit = 25;
  const maximumLimit = 100;

  let page = parseInt(req.query.page ?? defaultPage, 10);
  let limit = parseInt(req.query.limit ?? defaultLimit, 10);

  page = !Number.isNaN(page) && page > 0 ? page : defaultPage;
  limit =
    !Number.isNaN(limit) && limit > 0 && limit <= maximumLimit
      ? limit
      : defaultLimit;

  res.locals.offset = (page - 1) * limit;
  res.locals.limit = limit;

  next();
};
