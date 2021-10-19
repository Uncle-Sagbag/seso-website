const Image = require("@11ty/eleventy-img");
const glob = require("glob-promise");

const THUMB = 250;
const FULL = 1920;

(async () => {

	let options = {
		widths: [THUMB,FULL],
		formats: ['jpg'],
		filenameFormat:function(id, src, width, format, options) {
			let origFilename = src.split('/').pop();
			//strip off the file type, this could probably be one line of fancier JS
			let parts = origFilename.split('.');
			parts.pop();
			origFilename = parts.join('.');

			if(width === THUMB) return `thumb-${origFilename}.${format}`;
			else return `${origFilename}.${format}`;
		},
		outputDir:'./assets/img/media'
	};

	let files = await glob('./assets/img/raw_media/*.{jpg,jpeg,png,gif}');
	for(const f of files) {
		console.log(`processing ${f}`);
		await Image(f, options);
	};

})();
