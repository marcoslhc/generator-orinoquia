'use strict';
var mountFolder = function(connect,dir){
    return connect.static(require('path').resolve(dir));
}
var middleware = function(connect){
    var retVal = [];
    for(i=1;i<arguments.lenght;i++){
        retVal.push(mountFolder(connect,arguments[i]));
    }
    return retVal;
}
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var yoConfig = {
        basePath : '<%= config.basePath %>',
        scripts: '<%= config.basePath %><%= config.scripts %>',
        less: '<%= config.basePath %><%= config.lessFiles %>',
        css:'<%= config.basePath %><%= config.cssFiles %>',
        images:'<%= config.basePath %><%= config.images %>',
        bowerComponents:'<%= config.basePath %><%= config.bowerComponents %>',
        tmp:'.tmp',
        dist:'dist',
        build:'build'
    }
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        yeoman:yoConfig,
        watch:{
            less:{
                files:['<%%= yeoman.less %>/**/*.less'],
                tasks:['less']
            },
            livereload:true
        },
        connect:{
            options:{
                port:9000,
                hostname:'localhost',
                base:'<%%= yeoman.basePath %>'
            },
            server:{
              
            },
            test:{
                options:{
                    middleware: function (connect) {middleware(connect,'<%%= yeoman.tmp %>','test')}
                }
            },
            dist:{
                options:{
                    middleware: function (connect) {middleware:middleware(connect,'<%%= yeoman.dist %>')}
                }
            },
        },
        open:{
            server:{
                path:'http://<%%=connect.options.hostname%>:<%%= connect.options.port %>'
            }
        },
        clean:{
            dist:{
                files:[{
                    dot:true,
                    src:[
                    '<%%= yeoman.tmp %>',
                    '<%%= yeoman.dist %>/*',
                    '<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server:'<%%= yeoman.tmp %>'
        },
        jshint:{
            options:{
                jshintrc:'.jshintrc'
            },
            all:[
            'Gruntfile.js',
            '<%%= yeoman.script %>/**/*.js'
            ]
        },
        less:{
            dev:{
                files:[{
                    expand:true,
                    cwd:'./',
                    src:['<%%= yeoman.less %>/**/*.less'],
                    dest:'<%%= yeoman.css %>/',
                    ext:'.css'
                }]
            },
            dist:{
                options:{
                    compress:true
                },
                files:[{
                    expand:true,
                    cwd:'./',
                    src:['<%%= yeoman.less %>/**/*.less'],
                    dest:'<%%= yeoman.dist %>/<%= config.cssFiles %>/',
                    ext:'.css'
                }]
            }
        },
        recess:{
          dev:{
            files:[{
                expand:true,
                cwd:'./',
                src:['<%%= yeoman.less %>/**/*.less'],
                dest:'<%%= yeoman.css %>/<%= config.cssFiles %>/',
                ext:'.css'
            }],
            options:{
              compile:true
            }
          },
          dist:{
            files:[{
                expand:true,
                cwd:'./',
                src:['<%%= yeoman.less %>/**/*.less'],
                dest:'<%%= yeoman.dist %>/<%= config.cssFiles %>/',
                ext:'.css'
            }],
            options:{
              compile:true
            }
          }
        },
        useminPrepare: {
            html: '<%%= yeoman.basePath %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
          html: ['<%%= yeoman.dist %>/{,*/}*.html'],
          css: ['<%%= yeoman.dist %>/<%= config.cssFiles %>/{,*/}*.css'],
          options: {
            dirs: ['<%%= yeoman.dist %>']
          }
        },
        imagemin: {
          dist: {
            files: [{
              expand: true,
              cwd: '<%%= yeoman.images %>',
              src: '{,*/}*.{png,jpg,jpeg}',
              dest: '<%%= yeoman.dist %>/<%= config.images %>'
            }]
          }
        },
        svgmin: {
          dist: {
            files: [{
              expand: true,
              cwd: '<%%= yeoman.images %>',
              src: '{,*/}*.svg',
              dest: '<%%= yeoman.dist %>/<%= config.images %>'
            }]
          }
        },
        cssmin: {
          dist: {
            files:{
                '<%%= yeoman.dist %>/<%= config.cssFiles %>/main.css': 
                ['<%%= yeoman.css %>/**/*.css','<%%= yeoman.tmp %>/<%= config.cssFiles %>/**/*.css']
            }
          }
        },
        htmlmin: {
          dist: {
            files: [{
              expand: true,
              cwd: '<%%= yeoman.basePath %>',
              src: '*.html',
              dest: '<%%= yeoman.dist %>'
            }]
          }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.basePath %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        '<%= config.images %>/**/*.{webp,gif}'
                        ]
                    }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.bowerComponents %>/bootstrap/img/',
                    dest: '<%%= yeoman.basePath %>/images/',
                    src: ['*']
              }]
            },
        },
    });
    grunt.registerTask('server',function(target){
        if(target==='dist'){
            return grunt.task.run(['build','open','connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'recess:dev',
            'copy:server',
            'open',
            'connect:server:keepalive',
            'watch'
        ]);
    });
    grunt.registerTask('build', [
      'clean:dist',
      'copy:server',
      'useminPrepare',
      'cssmin',
      'concat',
      'uglify',
      'copy',
      'usemin'
    ]);

    grunt.registerTask('default', [
      'jshint',
      'test',
      'build'
    ]);
   
}