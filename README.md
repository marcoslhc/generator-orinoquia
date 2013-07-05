# Yeoman generator
[![Build Status](https://secure.travis-ci.org/marcoslhc/yeoman-generator.png?branch=master)](https://travis-ci.org/marcoslhc/yeoman-generator)

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install yeoman-generator`
- Run: `yo orinoquia`

## What does it do? ##

### Site created ###
generator-orinoquia creates a site based on the [html5boilerplate](http://html5boilerplate.com/) markup, basic css normalization, styling and polyfill thanks to modernizr,
[Lea Verou's prefix-free](http://leaverou.github.io/prefixfree/) eases the use of css3 features and additionally set ups requirejs.

Also it has [backbone](http://backbonejs.org), [underscore](http://underscorejs.org) and [Jquery](http://jquery.com) pulled from CDN for easy UX development.

### Developer's tool ###

As usual in any yeoman project, generator-orinoquia uses bower for client-side package managment and grunt for task automation

The grunt commands and task used are:

* Development Server: `grunt server`
    * 
* Test: `grunt build:test`
* Dist: `grunt build:dist`

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
