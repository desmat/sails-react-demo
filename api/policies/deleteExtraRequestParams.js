//ignore jquery extra params
module.exports = function(req, res, next) {
  //console.log('Applying deleteExtraRequestParams policy');

  if(req.query._) delete req.query._;

  next();
};