const embedYouTube = require("eleventy-plugin-youtube-embed");
const purgeCSSPlugin = require("eleventy-plugin-purgecss");
const glob = require("glob-promise");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./assets/");
    eleventyConfig.addWatchTarget("./assets/");

    eleventyConfig.addPlugin(embedYouTube);
    eleventyConfig.addPlugin(purgeCSSPlugin, {
        // Optional: Specify the location of your PurgeCSS config
        config: "./purgecss.config.js",

        // Optional: Set quiet: true to suppress terminal output
        quiet: false
      });

    eleventyConfig.addCollection("media", async collectionApi => {

		let files = await glob('./assets/img/media/*.{jpg,jpeg,png,gif}');
		//Now filter to non thumb-
		let images = files.filter(f => {
			return f.indexOf('./assets/img/media/thumb-') !== 0;
		});

		let collection = images.map(i => {
			return {
				path: i,
				thumbpath: i.replace('/assets/img/media/', '/assets/img/media/thumb-')
			}
		});

		return collection;

	});

    let markdownIt = require("markdown-it");
    let markdownItEmoji = require("markdown-it-emoji");
    let options = {
        html: true
    };
    let markdownLib = markdownIt(options).use(markdownItEmoji);
    
    eleventyConfig.setLibrary("md", markdownLib);


    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
};