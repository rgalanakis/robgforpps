/**
 * @module
 * Resize images from temp/blog-images into static/content/blog.
 */

const sharp = require("sharp");
const glob = require("glob");
const path = require("path");

const inputFolder = `${process.env.PWD}/assets/images/full`;
const outputFolder = `${process.env.PWD}/assets/images`;

const main = async () => {
  const paths = glob.globSync(`${inputFolder}/**/*`, {nodir: true})
  const promises = [];
  paths.forEach((p) => {
    const basename = p.slice(inputFolder.length);
    const [extless] = basename.split(".");
    const width = 1280*2;
    const thumbWidth = 450*2;
    // let height = 1024;
    // let thumbHeight = thumbWidth;
    const newBasename = `${extless}.jpg`;
    const headerOutput = path.join(outputFolder, 'o', newBasename);
    const thumbnailOutput = path.join(outputFolder, "t", newBasename);
    promises.push(
      sharp(p)
        .resize({
          width,
          // height,
          fit: sharp.fit.cover,
          position: sharp.strategy.attention,
        })
        .jpeg({ quality: 80 })
        .toFile(headerOutput)
    );
    promises.push(
      sharp(p)
        .resize({
          width: thumbWidth,
          // height: thumbHeight,
          fit: sharp.fit.cover,
          position: sharp.strategy.attention,
        })
        .jpeg({ quality: 75 })
        .toFile(thumbnailOutput)
    );
  });
  await Promise.all(promises);
};
main();
