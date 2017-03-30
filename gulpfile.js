var gulp = require('gulp');
var fileinclude  = require('gulp-file-include'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    cpe = require('child_process').exec,
    sass = require('gulp-sass'),
    base64 = require('gulp-base64'),
    connect = require('gulp-connect'),
    gulpSequence = require('gulp-sequence'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    ftp = require('gulp-ftp');

var PORT = 8090,
    buildPath='dist',
    staticPath='../..',
    cssPath='__CSS__',
    jsPath='__JS__',
    imgPath='__PUBLIC__';

//清除目录
gulp.task('clean', function() {
    return gulp.src(['dist'], {
        read: false
    }).pipe(clean({
        force: true
    }))
});
//html 模板化
gulp.task('fileinclude', function() {
    return gulp.src('src/views/**/*.{shtml,html}')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file',
          context: {
                dist : '/dist',
                bodyClass : "",  //body的类名
                cssFile: [], //css文件加载
                static: staticPath, //静态资源目录
                showLoading : true //是否显示加载动画
            }
        }))
    .pipe(gulp.dest('dist/views'));
});
//js 压缩
gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    return gulp.src(['src/js/**/*.js', '!src/js/**/{lib}.js'])
        .pipe(uglify())
        .pipe(gulp.dest(buildPath+'/js'));
});
//图片压缩
gulp.task('imagemin', function () {
    return gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(buildPath+'/img'));
});
//编译sass
gulp.task('sass', function() {
    return gulp.src(['src/sass/**/*.{sass,css}','!src/sass/lib'])
        .pipe(sass().on('error', sass.logError))
        /*.pipe(base64({//低于10K的图片使用base64
            extensions: ['png'],
            maxImageSize: 10 * 1024
        }))*/
        .pipe(gulp.dest(buildPath+'/sass'));
});
//上传代码
gulp.task('upload',function(){
    return gulp.src('./dist/**/*')
        .pipe(ftp({
            host: 'qxu1606550169.my3w.com',
            user: 'qxu1606550169',
            pass: '1103839827',
            remotePath:'/htdocs/xmz_renber/'
        }))
        .pipe(gutil.noop());
})


gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port : PORT
    });
    cpe("start http://localhost:8090/dist/views/")
});

gulp.task('watch', function() {
    gulpSequence(
        'clean',
        'fileinclude',
        'jsmin',
        'imagemin',
        'sass',
        'webserver', function() {
            gulp.watch('src/**/*.{sass,css}',['sass'])
            gulp.watch('src/**/*.js',['jsmin'])
            gulp.watch('src/**/*.{jpg,png,gif}',['imagemin'])
            gulp.watch('src/**/*.{shtml,html}',['fileinclude'])
        })
  
})
gulp.task('build', function() {
    gulpSequence(
        'clean',
        'fileinclude',
        'jsmin',
        'imagemin',
        'sass',
        function() {
            console.log('build success')
        })
});

gulp.task('release', function() {
    gulpSequence(
        'clean',
        'fileinclude',
        'jsmin',
        'imagemin',
        'sass',
        'upload',
        function() {
        console.log('release success')
})
});

gulp.task('default', ['watch']);
