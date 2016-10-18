# DevisPattern

<img src="https://d13yacurqjgara.cloudfront.net/users/506824/screenshots/1824942/d.gif" width="250"/>


<p align="center">
  <a href="https://circleci.com/gh/Devisjs/devis/tree/master"><img src="https://img.shields.io/circleci/project/Devisjs/devisPattern/master.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/devisPattern"><img src="https://img.shields.io/npm/v/devisPattern.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/devisPattern"><img src="https://img.shields.io/npm/l/devisPattern.svg" alt="License"></a>
  <a href="https://www.bithound.io/github/Devisjs/devisPattern"><img src="https://www.bithound.io/github/Devisjs/devisPattern/badges/score.svg" alt="bitHound Overall Score"></a>
  
  <a href="https://www.bithound.io/github/Devisjs/devisPattern"><img src="https://www.bithound.io/github/Devisjs/devisPattern/badges/code.svg" alt="bitHound Overall Score"></a>
  <br>

</p>

>A fast native pattern matcher addon on JavaScript object properties.

It's necessary, before using DevisPattern to install:
* python v2.7, and make a c ++ compiler like gcc under **unix / linux-gnu** and install more xcode with command line tools if you are under **mac os**

* on **Windows**: Install all the required tools and configurations using Microsoft's windows-build-tools using ```npm install --global --production windows-build-tools``` from an elevated PowerShell or CMD.exe (run as Administrator).

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
}, (args, done)=> {

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
npm install devisPattern
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
# The Why

This addon lets you build a simple decision tree so you can avoid writing if statements. It tries to make the minimum number of comparisons necessary to pick out the most specific match.

# API

### devisPattern

Generates a new pattern matcher instance. 


### .add( {...pattern...}, object )

Register a pattern, and the object that will be returned if an input
matches.  Both keys and values are considered to be strings. Other
types are converted to strings.

### .find( {...pattern...})

Return the unique match for this pattern, or null if not found. 

### .call({...pattern...},{...arguments...},callback)

Act this pattern.

### .list( )

Return the list of registered patterns that contain this partial
pattern.
