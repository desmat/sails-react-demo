//ignore jquery extra params
module.exports = function(req, res, next) {
    //console.log('running deleteExtraRequestParams criteria');

    if(req.query._) delete req.query._;

    next();
};