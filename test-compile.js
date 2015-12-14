console.log("loading libs...");

var args = require("minimist")(
    process.argv.slice(2),
    {
        default : {
            transforms: null
        }
    }
);

// console.log(args);
// return;

var browserify = require("browserify");
var babelify = require("babelify");
// var stringify = require("stringify");
var fs = require("fs");
var uglify = require("uglify-js");
var sass = require("node-sass");

var footer = "\nconsole.log('Build Time: ', '" + (new Date()).toString() + "');";

var babelTransform = [
    [
        babelify,
        {
            loose: 'all',
            stage: 0,
            optional: 'runtime',
            blacklist: "flow",
            compact: false,
            ignore: /(lib|node_modules|external)\/.*/
        }
    ]
];
if (args.transforms !== null) {
    babelTransform = babelTransform.concat(require(args.transforms));
}

var settings = {
    entries: ["./" + args.source + ".js"],
    debug: true,
    paths: ['.'],
    transform: babelTransform,
    extensions: [".js"]
};

switch (args.type) {
    case 'js': {
        var compiler = browserify(settings);
        if (args.hasOwnProperty('exclude') === true) {
            if (typeof args.exclude === 'string') {
                compiler.exclude(args.exclude);
            } else {
                args.exclude.forEach(function (exclusion) {
                    compiler.exclude(exclusion);
                });
            }
        }
        console.log("compilng code...");
        compiler.bundle(function (err, buffer) {
            if (err !== null) {
                return;
            }

            if (args.minify === true) {
                console.log("minifying code...");
                var code = buffer.toString();
                var minified = uglify.minify(code, {fromString: true});

                buffer = minified.code;
            }

            console.log("saving compiled code...");
            // buffer.write(footer);
            var outputFile = args.dest + ".js";
            fs.writeFile(
                outputFile,
                buffer,
                {encoding: 'utf8'},
                function () {
                    if (args.buildTime === true) {
                        fs.appendFile(outputFile, footer, {encoding: 'utf8'});
                    }
                    console.log("Done")
                }
            );
        }).on(
            'error',
            function (error) {
                console.log(error.toString());
            }
        );
        break;
    }
    case 'css': {
        console.log("compiling css...");
        sass.render(
            {
                file: "sass/material.scss"
            },
            function (err, result) {
                console.log("saving css...");
                fs.writeFile(
                    "sass/material.css",
                    result.css,
                    {encoding: 'utf8'},
                    function () {
                        console.log("Done");
                    }
                );
            }
        );
        break;
    }
}