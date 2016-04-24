var middleware = function (req, res, next) {
  res.locals.props.blog = {
    cover: '/static_assets/cover.jpg',
    name: 'Bunkuro Zingdema',
    tagline: 'Hello'
  };
  res.locals.props.user = {alias: 'lihengl', id: 0};
  next();
};


module.exports = middleware;
