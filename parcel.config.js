const Bundler = require("parcel-bundler");
const Path = require("path");

const entryFiles = Path.join(__dirname, "./src/index.html");

const IS_PROD = process.argv[2] === "PROD";

const options = {
  outDir: "./dist",
  outFile: "index.html",
  watch: !IS_PROD,
  cache: true,
  minify: IS_PROD,
  hmr: true,
  sourceMaps: true
};

(async function() {
  const bundler = new Bundler(entryFiles, options);

  if (IS_PROD) await bundler.bundle();
  else await bundler.serve(1234, false, "0.0.0.0");
})();
