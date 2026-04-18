
function fixTitles(req, res, next) {
    req.body.titles = [].concat(req.body.titles);
    next();
}

export default fixTitles;