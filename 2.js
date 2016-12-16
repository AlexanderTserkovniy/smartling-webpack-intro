/**
 * Created by Oleksandr Tserkovnyi on 12/15/16.
 * kemperomg@gmail.com
 */

const context = require.context('./context');
// const context = require.context('./context', false);
// const context = require.context('./context', true);
// const context = require.context('./context', true, /\.js$/);

console.log(context.keys());
console.log(context.resolve('./sub/c.js'));
context.keys().map(path => {
  const module = context(path);
  module();
});