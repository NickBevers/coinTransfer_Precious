// const {src, dest} = require("gulp");
const sass = require("gulp-sass");
const {watch, src, dest} = require("gulp");
const cache = require('gulp-cached');
const purgecss = require('gulp-purgecss');
const changed = require('gulp-changed');

// function go(done){
//     console.log("Here we go!");
//     done();
// }

function test(done){
    console.log("we're done");
    done();
}

function sass2css(done){
    return src("./sass/**/*.scss").pipe(sass().on("error", sass.logError)).pipe(dest("./public/stylesheets"));
    done();
}

function cached(done){
    return src("./public/javascripts/*.js")
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter())
    done()
}

function purge(done){
    return src('./public/stylesheets/*.css')
    .pipe(purgecss({content: ['./public/*.html']}))
    .pipe(dest('./public/cleaned_css'))
    done()
}

function checkChangedFiles(done){
    return src("./public/javascripts/*.js")
    .pipe(changed("./public/javascripts"))
    .pipe(dest("./public/javascripts"))
    done()
}

exports.default = function(done){
    watch("./sass/**/*.scss", sass2css);
    watch("./public/javascripts/*.js", cached);
    watch("./public/javascripts/*.js", checkChangedFiles);
    done();
}

exports.test = test;
exports.sass2css = sass2css;
exports.cached = cached;
exports.purge = purge;
exports.checkChangedFiles = checkChangedFiles;
