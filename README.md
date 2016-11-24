# DevisPattern

<img src="https://95yexa.dm2302.livefilestore.com/y3mJ3LIHYeILF4yBzweiHmDFcQckSKnJqRnSpyLyRrSJZuT2UJLUKHjDj0NT5G79MIMaQEDXakZvaD1wJ2j4tjeHVDf9Z_Fwgn-6z3Th0c-bB1cBhoY1JeZVt8erxvbgQf3TthILQl30d1obqbkzrULSrL2uqCapoKwVHiVtN2vm-g?width=784&height=791&cropmode=none" width="250"/>


<p align="center">
  <a href="https://circleci.com/gh/Devisjs/devis/tree/master"><img src="https://img.shields.io/circleci/project/Devisjs/devisPattern/master.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/devisPattern"><img src="https://img.shields.io/npm/v/devisPattern.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/devisPattern"><img src="https://img.shields.io/npm/l/devisPattern.svg" alt="License"></a>
  <a href="https://www.bithound.io/github/Devisjs/devisPattern"><img src="https://www.bithound.io/github/Devisjs/devisPattern/badges/score.svg" alt="bitHound Overall Score"></a>
  
  <a href="https://www.bithound.io/github/Devisjs/devisPattern"><img src="https://www.bithound.io/github/Devisjs/devisPattern/badges/code.svg" alt="bitHound Overall Score"></a>
  <a href="https://travis-ci.org/Devisjs/devisPattern"><img src="https://travis-ci.org/Devisjs/devisPattern.svg?branch=master" alt="travis"></a>
  
  <br>

</p>


>A fast native pattern matcher addon on JavaScript object properties.


This addon is used by the devis framework to pattern match actions.

**Requirements:**

It's necessary, before using DevisPattern to install:
- [CMake](http://www.cmake.org/download/)(*.msi version for windows: You must check the addition of the path for all users, And restart your computer after installation)
- A proper C/C++ compiler toolchain of the given platform
    - **Windows**:
        - [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools)
        or a recent version of Visual C++ will do ([the free Community](https://www.visualstudio.com/products/visual-studio-community-vs) version works well)             
    - **Unix/linux-gnu**:
        - Clang or GCC
        - Ninja or Make (Ninja will be picked if both present)
        - Xcode with command line tools if you are under **mac os**



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
