'use strict';
// APIs like: src(), dest(), series(), or parallel()
const { series, parallel, src, dest } = require('gulp');
const fs = require('fs');

//-- PRIVATE TASKS --
function clean(cb) {
    cb();    
}

//-- PUBLIC TASKS -- 
function build(cb) {
    return src('./src/**/*.*').pipe(dest('./dist')) ;
}

exports.build = build;
exports.default = series(clean, build);
