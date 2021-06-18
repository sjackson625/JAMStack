module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static/css": "css" });
  eleventyConfig.addPassthroughCopy({ "static/img": "img" });
  eleventyConfig.addPassthroughCopy({ "static/js": "js" });
};
