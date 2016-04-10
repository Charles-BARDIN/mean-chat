var BBCodeParser = require('bbcode-parser');
var dfTags = BBCodeParser.defaultTags()
var bbTags = {
    b: dfTags.b,
    i: dfTags.i,
    u: dfTags.u,
    url: dfTags.url,
    code: dfTags.code
};
module.exports = new BBCodeParser(bbTags);