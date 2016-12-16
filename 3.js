/**
 * Created by Oleksandr Tserkovnyi on 12/15/16.
 * kemperomg@gmail.com
 */

const anglr = require('angular');
const jquery = require('jquery');
console.log(jquery('body').html());
const backbone = require('backbone');
console.log('Is backbone?', backbone.VERSION);
console.log('Is angular?', anglr.version);
console.log('Is angular really missed?', angular.version);


// --profile -> Shows spent on module bundle
// --display-modules -> Shows hidden modules taken to bundle
// --display-reasons -> Shows why some module was taken
