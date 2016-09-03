<img src="http://gdurl.com/PeQp" width="550"/>
>A fast pattern matcher addon on JavaScript object properties.

# devisPattern
This addon is used by the devis framework to pattern match actions.

### Quick example
Here's how you register some patterns, and then search for matches:

```JavaScript
const devisPattern =require("devisPattern"); //or require("./devisPattern/devisPattern"); if you download the project 

devisPattern.add({
    action: 'game',
    cmd: 'play'
}, (args, done) => {

    done({
        result: 'play'
    });
});
devisPattern.add({
    action: 'game',
    cmd: 'pause'
}, function(args, done) {

    done({
        result: 'pause'
    });
});

devisPattern.call({
    action: 'game',
    cmd: 'play'
}, (result)=> {

    console.log(result);

});

devisPattern.call({
    action: 'game',
    cmd: 'pause'
}, (result) =>{


    console.log(result);
});

```

## Install

```sh
npm install patrun
```
Or, if you download the project:

Generate the appropriate project build files for the current platform. Use `configure` for that:
```sh
node-gyp configure
```
Now you will have either a `Makefile` (on Unix platforms) or a `vcxproj` file (on Windows) in the `build/` directory. Next invoke the build command:
```sh
node-gyp build
```
