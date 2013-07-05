define(['jquery','underscore','backbone'], function($,_,Backbone){
    return function(){
        console.log('jQuery:\t\t'+$.fn.jquery);
        console.log('Underscore:\t'+_.VERSION);
        console.log('Backbone:\t'+Backbone.VERSION);
        console.log('Hello World');
    }
});