/**
 * Created by Oleksandr Tserkovnyi on 12/15/16.
 * kemperomg@gmail.com
 */

console.log(1 + '.js');

if (NODE_ENV === undefined) {
  console.log('NO NODE ENV!');
}

console.log('NODE_ENV', NODE_ENV);
console.log('CURRENT_DIR', CURRENT_DIR);

console.log(require('./module'));