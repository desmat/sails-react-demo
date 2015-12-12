/**
 * copied from https://github.com/wi2/isomorphic-sails-react-example/blob/master/tasks/config/browserify.js
 */


module.exports = function(grunt) {

  grunt.config.set('browserify', {
    options: {      
      transform:  [require("babelify"), require('grunt-react').browserify], 
      extension: ['jsx'],
      harmony: true, 
      debug: true
    },    
    js: {
      src: ['./components/*.jsx', './components/**/*.jsx'],
      dest: '.tmp/public/js/bundle.js',
    }, 
  });

  grunt.loadNpmTasks('grunt-browserify');
};








// module.exports = function(grunt) {

//   grunt.config.set('browserify', {
//     options: {
//       external: ['react', 'react-router', 'sails-store', 'sails-react-store'],
//       transform: [
//         [require("babelify"), require('grunt-react').browserify]
//       ],
//       harmony: true
//     },
//     dev: {
//       src: ['./components/*.jsx', './components/*.js', 
//             './components/**/*.jsx', './components/**/*.js'],
//       dest: './assets/js/bundle.js'
//     }
//   });

//   grunt.loadNpmTasks('grunt-browserify');
// };



