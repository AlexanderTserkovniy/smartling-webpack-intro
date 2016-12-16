# Webpack intro

First of all install please `nodemon` globally. It will help you to rerun all your files if anything changed.

`npm i nodemon -g`

## Small intro to nodemon

`nodemon` - runs `./index.js` and watches root folder for any change.

    [nodemon] watching: *.*
    [nodemon] starting `node index.js`

To execute another command use `-x [COMMAND]`

To ignore watching some files use `-i [FILE_PATH]` (usefull for `bundle.js` because we don't want to rerun the app in this case)

`nodemon -i bundle.js -x webpack --config=webpack.config.js --profile --display-modules --display-reasons`

## Example 1

Webpack is run in node environment, so it means that we could use any OS node packages as well as any 3rd party for working with webpack.

Note: webpack bundles your app modules and does not provide any sort of bridge between node and your run time app. Meaning that you cannot access any sort of OS entities during running your app in browser.

What you can do, is you can "define" some variable during compile phase for using it within the app. E.g.:

    plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        })
    ]

Note: `JSON.stringify` is required if you want to transfer value as JavaScript value, not as letters itself: `new webpack.DefinePlugin({FILENAME: __filename})` will give you `/Users/oleksandr.tserkovnyi/Projects/smartling-webpack-intro/1.js` plain value by `FILENAME` variable.

Now the `NODE_ENV` variable will be available in any module of your app.

    if (NODE_ENV === undefined) {
        console.log('NO NODE ENV!');
    }

    // bundle.js

    if ((undefined) === undefined) {
	  console.log('NO NODE ENV!');
	}

Module resolving

	resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx', '.coffee']
    }

`modulesDirectories` makes possible to resolve module within specified pathes. To resolve means to find it by simple `require('moduleName')`.

`extensions` means which extensions are possible. Note that `''` makes possible to use and require modules without extension like this: `touch module` `require(./module) // requires nesly created module`

FOR PERFORMANCE: Keep as less as possible `modulesDirectories` as well as `extensions`.

## Example 2

_To run it change entry prop in `webpack.config.js` to ./2.js_

`require.context('./context')` creates context in specified place giving you a bunch of different methods to work with it.

`context.keys()` gives an array of all modules within this context.
`context.resolve('./sub/c.js')` will throw an exception if this module does not exist in specified place.
...

Second param of it `require.context('./context', [RECURSIVE])` RECURSIVE means that you could disable recursive (deep) look up for modules in context.

Third param `require.context('./context', [RECURSIVE], [MODULE_REG_EXP])` MODULE\_REG\_EXP gives you possbility to specify exact files to match for taking into context.

Please uncomment each line one by one to see results.

If `context` contains an expression see:

###dynamic requires
A context is created if your request contains expressions, so the exact module is not known on compile time.

Example:

require("./template/" + name + ".jade");
webpack parses the require statement and extracts some information:

Directory: ./template
Regular expression: /^.*\.jade$/

[Webpack Context](https://webpack.github.io/docs/context.html)

## Example 3

_To run it use `webpack.config.3.js`_

Take a look how much time (`--profile`) it takes to compile. Then uncomment `noParse` section and see the difference. Pre compiled modules do not require complie again, so please pay attention when you require them and add them to noParse. `noParse` accepts as one regular expression as well as array of them.

If you run it as it is, you will see an error that `require is not defined` meaning that somewhere in the code, some package wants to require something additionally. In such cases it is better to keep this module parsing (to remove from `noParse`), because it is hard to predict which dependencies it will require in the future.

Such modules as angular provide you with global variable, so they are also not required to be parsed.

Basically the rule to use no parse is pretty easy: if module does not contain require or import or anything else within, you could no parse it. Most of the frontend libraries do this.

## Example 4

_To run it change entry prop in `webpack.config.js` to ./4.js_

This is a task to train `ContextReplacementPlugin`. This plugin controls 3rd party require calls making it possible to ingnore some (though there is another plugin `IgnorePlugin` for doing that) or specify another place to look up.

The task is to make bundling 2x faster using `ContextReplacementPlugin`. You need to specify only `en-gb` and `ru` languages for using moment.

For me it takes ~600ms initially and after correct using of this plugin it takes ~250ms.

[Take a look at usages and create solution.](https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin)

Tip: Use `--display-modules` to see all dependencies.

## Usefull commands

Run `webpack --json  --profile >stats.json` then go to [https://webpack.github.io/analyse/](https://webpack.github.io/analyse/) and use it there so see graph like dependency tree.

`--progress` see progress of bundling.

You could run webpack just via command line and cpecify everything there. I lost somewhere this command :)

Have a nice day guys!