import BBCodeParser from 'bbcode-parser';

const dfTags = BBCodeParser.defaultTags()
const bbTags = {
    b: dfTags.b,
    i: dfTags.i,
    u: dfTags.u,
    url: dfTags.url,
    code: dfTags.code
};

const parser = new BBCodeParser(bbTags);

export default () => {
  return input => {
    return parser.parseString(input);
  }
}