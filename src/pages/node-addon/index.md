---
title: 🤖 Beginners guide to writing NodeJS Addons using C++ and N-API (node-addon-api)
date: 2018-06-15T08:11:03.284Z
keywords: nodejs, native, addon, n-api, napi, javascript, c++
featuredImage: ./node-addon.png
slug: node-addon-guide
---

# 🤖 Beginners guide to writing NodeJS Addons using C++ and N-API (node-addon-api)

According to nodejs.org:

> Node.js Addons are dynamically-linked shared objects, written in C++, that can be loaded into Node.js using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

There can be many reasons to write nodejs addons:
1. You may want to access some native apis that is difficult using JS alone.
2. You may want to integrate a third party library written in C/C++ and use it directly in NodeJs.
3. You may want to rewrite some of the modules in C++ for performance reasons.

Whatever your reason is, this blog focuses on explaining the N-API and how you can use it to build C/C++ based NodeJS addons.

The complete source code from this blog is available at
https://github.com/a7ul/blog-addons-example
So, If you are not interested in reading through, you can directly take a look at the code there also.

## What is N-API ?

> N-API (pronounced N as in the letter, followed by API) is an API for building native Addons. It is independent from the underlying JavaScript runtime (ex V8) and is maintained as part of Node.js itself. This API will be Application Binary Interface (ABI) stable across versions of Node.js. It is intended to insulate Addons from changes in the underlying JavaScript engine and allow modules compiled for one version to run on later versions of Node.js without recompilation.

In essence , N-API can be used to build NodeJS Addons using C or C++. And the addons built using this would not break across different implementations or versions of NodeJS.

N-API is a stable API as of Node v10 (latest stable release when writing this article). N-API was experimental in Node v8 and v9.

To see a demo of N-API in action watch this youtube video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-Oniup60Afs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


This article will only focus on C++ addons for NodeJs using N-API. For this we will use the node-addon-api (https://github.com/nodejs/node-addon-api) package from the N-API team which contains header-only C++ wrapper classes for the N-API ( basically it provides C++ object model and exception handling semantics with low overhead).

Since this blog post covers very minimal theory, I suggest you follow through by coding live as you read.

---

## Lets Code: Boilerplate setup

Create a basic node project test-addon

```sh
mkdir test-addon
cd test-addon
git init
npm init
```

Install the dependencies:

```
npm install node-gyp --save-dev
npm install node-addon-api
```

`node-gyp` is the toolchain to compile the addons.

`node-addon-api` is a helper project as described earlier that will make writing C++ addons easier.

In the `package.json` set the attribute `gypfile:true` and setup the following files as below:

`.gitignore`
```
node_modules
*.log
build
```

`binding.gyp`
```gyp
{
    "targets": [{
        "target_name": "testaddon",
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "sources": [
            "cppsrc/main.cpp"
        ],
        'include_dirs': [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'libraries': [],
        'dependencies': [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
    }]
}
```

`package.json`
```json
{
  "name": "test-addon",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "gypfile": true,
  "scripts": {
    "build": "node-gyp rebuild",
    "clean": "node-gyp clean"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "node-gyp": "^3.7.0"
  },
  "dependencies": {
    "node-addon-api": "^1.3.0"
  }
}
```

`binding.gyp` file contains all the files that need to be compiled and all the include files / libraries that the project will be using. If you notice we have added `cppsrc/main.cpp` file as our source file.

Also our package.json mentions a `index.js` file as its main file.

Lets create both of them :

`cppsrc/main.cpp`
```cpp

/* cppsrc/main.cpp */
#include <napi.h>

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return exports;
}

NODE_API_MODULE(testaddon, InitAll)
```

`index.js`

```js
//index.js
const testAddon = require('./build/Release/testaddon.node');

module.exports = testAddon;
```


The base boilerplate is complete. Lets try and build our addon.

```sh
npm run build
```

You should have an output similar to this:

```
npm run build

> test-addon@1.0.0 build /Users/atulr/Projects/Hobby/test-addon
> node-gyp rebuild
SOLINK_MODULE(target) Release/nothing.node
  CXX(target) Release/obj.target/testaddon/cppsrc/main.o
  SOLINK_MODULE(target) Release/testaddon.node
```

Wohoo 🕺 compilation was successful 🚀. Lets run it 😄

```
node index.js
```

Sadly you will not get any output here. Ideally you should use a debugger tool to debug and see what the contents of `testAddon` is but for demo here lets just add a `console.log` like this:

```js
//index.js
const testAddon = require('./build/Release/testaddon.node');
console.log('addon',testAddon);
module.exports = testAddon;
```

Now run `index.js` again. 

You should see an output like this :
```sh
node index.js
addon {}
```

Awesome !! Now we have a working setup to start with.

Before we go ahead, lets take a look at `cppsrc/main.cpp` in detail:
1. `#include<napi.h>` includes the napi header file so that we can access all the helper macros, classes and functions.
2. `NODE_API_MODULE` is a macro that accepts modulename and registerfunction as parameters.
3. In our case registerfunction is `InitAll` and it takes two parameters which are passed by N-API. First parameter `env` is the context that needs to be passed on to most N-API function and `exports` is the object used to set the exported functions and classes via N-API.
   
The source code documentation for NODE_API_MODULE says:
```cpp
/**
* This code defines the entry-point for the Node addon, it tells Node where to go
* once the library has been loaded into active memory. The first argument must
* match the "target" in our *binding.gyp*. Using NODE_GYP_MODULE_NAME ensures
* that the argument will be correct, as long as the module is built with
* node-gyp (which is the usual way of building modules). The second argument
* points to the function to invoke. The function must not be namespaced.
*/

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
```

To read in more depth you can visit the documentation of node-gyp here: 

https://github.com/nodejs/node-addon-api/blob/master/doc/node-gyp.md

---

## Exporting a Hello World C++ function using N-API

Now lets add an example of exporting a C++ function to NodeJS.
Lets take an example of a simple function

```cpp
std::string hello(){
  return "Hello World";
}
```

Lets try to export hello to Javascript side with our addon.

Create the following files:

`cppsrc/Samples/functionexample.h`

```cpp
#include <napi.h>
namespace functionexample {
  std::string hello();
  Napi::String HelloWrapped(const Napi::CallbackInfo& info);
  Napi::Object Init(Napi::Env env, Napi::Object exports);
}
```

The corresponding `cppsrc/Samples/functionexample.cpp`

```cpp
#include "functionexample.h"
std::string functionexample::hello(){
  return "Hello World";
}

Napi::String functionexample::HelloWrapped(const Napi::CallbackInfo& info) 
{
  Napi::Env env = info.Env();
  Napi::String returnValue = Napi::String::New(env, functionexample::hello());
  
  return returnValue;
}

Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports) 
{
  exports.Set(
"hello", Napi::Function::New(env, functionexample::HelloWrapped)
  );
 
  return exports;
}
```

Wow ! Looks like a lot. But if you look closely, its not as complex as it looks. For every function in C++ we want to export we will basically create a NAPI wrapped function (`HelloWrapped` in this example) and add it to the exports object using `Init`.

Lets take some time to understand `HelloWrapped` function. Every wrapped function that needs to be exported to JS should have input params/return value from the Napi namespace.

Every wrapped function takes in `CallbackInfo` as the input parameter. This contains things like the context and the input parameters that needs to be passed to the function.

`Init` function is used to just set the export key as `hello` with corresponding wrapped function `HelloWrapped `.

Now we need to make our `node-gyp` know that we have added extra c++ files. So make the following changes to `binding.gyp`, `main.cpp` and `index.js`

```diff
diff --git a/binding.gyp b/binding.gyp
index 23b9976..2d188af 100644
--- a/binding.gyp
+++ b/binding.gyp
@@ -4,7 +4,8 @@
         "cflags!": [ "-fno-exceptions" ],
         "cflags_cc!": [ "-fno-exceptions" ],
         "sources": [
-            "cppsrc/main.cpp"
+            "cppsrc/main.cpp",
+            "cppsrc/Samples/functionexample.cpp"
         ],
         'include_dirs': [
             "<!@(node -p \"require('node-addon-api').include\")"



diff --git a/cppsrc/main.cpp b/cppsrc/main.cpp
index f016c4e..f62ed77 100644
--- a/cppsrc/main.cpp
+++ b/cppsrc/main.cpp
@@ -1,7 +1,8 @@
 #include <napi.h>
+#include "Samples/functionexample.h"
 
 Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
-  return exports;
+  return functionexample::Init(env, exports);
 }
 
 NODE_API_MODULE(testaddon, InitAll)



diff --git a/index.js b/index.js
index 65f955e..e91b98f 100644
--- a/index.js
+++ b/index.js
@@ -1,3 +1,4 @@
 const testAddon = require('./build/Release/testaddon.node');
 console.log('addon',testAddon);
+console.log(testAddon.hello());
 module.exports = testAddon;

```

**Remember : Any change in c++ src files will need recompilation before you can use the changes in NodeJS.**
 
So make sure you run `npm run build` again after changing c++ files.

Also when you add a new header file/cpp file :
1. Add it to `binding.gyp` 
2. Add it to `main.cpp` 
3. Do `npm rebuild` and access it via JS.
   
Now run it! 

```
node index.js 
```
You should see the output as follows:
```
node index.js
addon { hello: [Function] }
Hello World
```
Voila 🚀 Now we have a hello world from C++ world into JS World!

---

## How about functions with input parameters ?

Lets say that the function that we want to export has both input and output params. 

For example:

```cpp
int add(int a, int b){
  return a + b;
}
```
To add the function we will make the following changes:

```diff
diff --git a/cppsrc/Samples/functionexample.cpp b/cppsrc/Samples/functionexample.cpp
index 0bd9bc2..37b7eb9 100644
--- a/cppsrc/Samples/functionexample.cpp
+++ b/cppsrc/Samples/functionexample.cpp
@@ -4,13 +4,33 @@ std::string functionexample::hello(){
     return "Hello World";
 }
 
+int functionexample::add(int a, int b){
+  return a + b;
+}
+
 Napi::String functionexample::HelloWrapped(const Napi::CallbackInfo& info) {
     Napi::Env env = info.Env();
     Napi::String returnValue = Napi::String::New(env, functionexample::hello());
     return returnValue;
 }
 
+
+Napi::Number functionexample::AddWrapped(const Napi::CallbackInfo& info) {
+    Napi::Env env = info.Env();
+    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
+        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
+    } 
+
+    Napi::Number first = info[0].As<Napi::Number>();
+    Napi::Number second = info[1].As<Napi::Number>();
+
+    int returnValue = functionexample::add(first.Int32Value(), second.Int32Value());
+    
+    return Napi::Number::New(env, returnValue);
+}
+
 Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports) {
     exports.Set("hello", Napi::Function::New(env, functionexample::HelloWrapped));
+    exports.Set("add", Napi::Function::New(env, functionexample::AddWrapped));
     return exports;
 }
 
 
diff --git a/cppsrc/Samples/functionexample.h b/cppsrc/Samples/functionexample.h
index 44563aa..e15aa7b 100644
--- a/cppsrc/Samples/functionexample.h
+++ b/cppsrc/Samples/functionexample.h
@@ -4,6 +4,10 @@ namespace functionexample {
 
     std::string hello();
     Napi::String HelloWrapped(const Napi::CallbackInfo& info);
-    Napi::Object Init(Napi::Env env, Napi::Object exports);
 
+    int add(int a, int b);
+    Napi::Number AddWrapped(const Napi::CallbackInfo& info);
+
+    Napi::Object Init(Napi::Env env, Napi::Object exports);
+    
 }
 
 
diff --git a/index.js b/index.js
index e91b98f..72860f8 100644
--- a/index.js
+++ b/index.js
@@ -1,4 +1,5 @@
 const testAddon = require('./build/Release/testaddon.node');
 console.log('addon',testAddon);
-console.log(testAddon.hello());
+console.log('hello ', testAddon.hello());
+console.log('add ', testAddon.add(5, 10));
 module.exports = testAddon;

```

**Explanation:** 

1. We added a simple `add` function.
2. We added the wrapper for the add function : `AddWrapped` which is used to interface the add function with N-API.
3. We added the key add to export the `AddWrapped` function to the JS.

I believe the example is fairly straightforward and self explanatory. If more explanation is needed, let me know in the comments and I ll add more details here.

Passing complex references and objects to the functions will be covered in the later sections below.

**Output:**

```
node index.js
addon { hello: [Function], add: [Function] }
hello  Hello World
add  15
```

Awesome 🥳

---

## Exporting a Hello World C++ Class using N-API

Lets create a simple C++ class that stores a double value. The member functions are pretty self explanatory.

`cppsrc/Samples/actualclass.cpp`
```cpp
/* cppsrc/Samples/actualclass.cpp */

#include "actualclass.h"

ActualClass::ActualClass(double value){
    this->value_ = value;
}

double ActualClass::getValue()
{
  return this->value_;
}

double ActualClass::add(double toAdd)
{
  this->value_ += toAdd;
  return this->value_;
}
```

`cppsrc/Samples/actualclass.h`
```cpp
/* cppsrc/Samples/actualclass.h */

class ActualClass {
 public:
  ActualClass(double value); //constructor
  double getValue(); //getter for the value
  double add(double toAdd); //adds the toAdd value to the value_
 private:
  double value_;
};
```

I believe the above code is pretty straightforward and self explanatory.
To export this class to JS side we will need to create a wrapper class. Lets name the wrapper class as `ClassExample `.

Create the wrapper Class as follows:

> Please look at the `classexample.h` first and try to grasp the intent of the Wrapper class before going to the implementation.

`cppsrc/Samples/classexample.h`
```cpp
/* cppsrc/Samples/classexample.h */

#include <napi.h>
#include "actualclass.h"

class ClassExample : public Napi::ObjectWrap<ClassExample> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports); //Init function for setting the export key to JS
  ClassExample(const Napi::CallbackInfo& info); //Constructor to initialise

 private:
  static Napi::FunctionReference constructor; //reference to store the class definition that needs to be exported to JS
  Napi::Value GetValue(const Napi::CallbackInfo& info); //wrapped getValue function 
  Napi::Value Add(const Napi::CallbackInfo& info); //wrapped add function
  ActualClass *actualClass_; //internal instance of actualclass used to perform actual operations.
};

```

`cppsrc/Samples/classexample.cpp`
```cpp
/* cppsrc/Samples/classexample.cpp */

#include "classexample.h"

Napi::FunctionReference ClassExample::constructor;

Napi::Object ClassExample::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(env, "ClassExample", {
    InstanceMethod("add", &ClassExample::Add),
    InstanceMethod("getValue", &ClassExample::GetValue),
  });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("ClassExample", func);
  return exports;
}

ClassExample::ClassExample(const Napi::CallbackInfo& info) : Napi::ObjectWrap<ClassExample>(info)  {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  int length = info.Length();
  if (length != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
  }

  Napi::Number value = info[0].As<Napi::Number>();
  this->actualClass_ = new ActualClass(value.DoubleValue());
}

Napi::Value ClassExample::GetValue(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  double num = this->actualClass_->getValue();
  return Napi::Number::New(env, num);
}


Napi::Value ClassExample::Add(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  if (  info.Length() != 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
  }

  Napi::Number toAdd = info[0].As<Napi::Number>();
  double answer = this->actualClass_->add(toAdd.DoubleValue());

  return Napi::Number::New(info.Env(), answer);
}

```

Lets take a good look at the header file of our wrapper class `classexample.h`:

As mentioned before, Anything that needs to be exported to JS world needs to be wrapped with N-API. Hence:

1. First step is to create a wrapper class which extends `Napi::ObjectWrap<ClassExample>` . 
2. Just like in case of functions we need a `Init` method to set the export key.
3. Except the `static Napi::FunctionReference constructor;` rest all the methods are self explanatory.
   
Now, lets take a look at the actual implementation `classexample.cpp`.

1. `ClassExample::Init` function is responsible to create and set the export key. Here we will export the class as `ClassExample` to the JS side.
   
Important part here is:
```cpp
Napi::Function func = DefineClass(env, "ClassExample", 
{
  InstanceMethod("add", &ClassExample::Add),
  InstanceMethod("getValue", &ClassExample::GetValue),
});
constructor = Napi::Persistent(func);
```

`func` is used to define the class that will be exported to JS and then the `func` is assigned to constructor which is a static function reference in c++. This is where the earlier defined `static Napi::FunctionReference constructor;` comes in. Similar to `InstanceMethod` there are various methods defined in NAPI to export different types of class methods. For example: Static methods can be exported using `StaticMethod`.

If you are wondering what `env` is:

> env is the environment that represent an independent instance of the JavaScript runtime

I think of it as the js context that needs to be passed around to most NAPI functions as the first argument.

1. Now lets see the implementation of `ClassExample::Add` function.

```cpp
Napi::Value ClassExample::Add(const Napi::CallbackInfo& info) 
{
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);
  
  if (info.Length() != 1 || !info[0].IsNumber()) {
     Napi::TypeError::New(env, "Numberexpected").ThrowAsJavaScriptException();
  }
  Napi::Number toAdd = info[0].As<Napi::Number>();
  double answer = this->actualClass_->add(toAdd.DoubleValue());
  return Napi::Number::New(info.Env(), answer);
}
```
- Here input params are checked first using info from `env`. 
- Now, to read a value from JS side we read it like `info[0].As<Napi::Number>();`.
- Since C++ is a strongly typed language and JS is not. We have to convert every value that we get from JS side to its appropriate type. After we convert the value we simply call the internal `actualClass` instance and return the value. 
- But since the value is a double we need to wrap it with a Napi::Number instance so that it can be passed to the JS side.

**We are not done yet. Remember we need to now add entries to tell the compiler to compile the new source files we added.**

```diff
diff --git a/binding.gyp b/binding.gyp
index 2d188af..031bf18 100644
--- a/binding.gyp
+++ b/binding.gyp
@@ -5,7 +5,9 @@
         "cflags_cc!": [ "-fno-exceptions" ],
         "sources": [
             "cppsrc/main.cpp",
-            "cppsrc/Samples/functionexample.cpp"
+            "cppsrc/Samples/functionexample.cpp",
+            "cppsrc/Samples/actualclass.cpp",
+            "cppsrc/Samples/classexample.cpp"
         ],
         'include_dirs': [
             "<!@(node -p \"require('node-addon-api').include\")"
             
             
diff --git a/cppsrc/main.cpp b/cppsrc/main.cpp
index f62ed77..2b739d3 100644
--- a/cppsrc/main.cpp
+++ b/cppsrc/main.cpp
@@ -1,8 +1,10 @@
 #include <napi.h>
 #include "Samples/functionexample.h"
+#include "Samples/classexample.h"
 
 Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
-  return functionexample::Init(env, exports);
+  functionexample::Init(env, exports);
+  return ClassExample::Init(env, exports);
 }
 
-NODE_API_MODULE(testaddon, InitAll)
+NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)


diff --git a/index.js b/index.js
index 72860f8..d849e0e 100644
--- a/index.js
+++ b/index.js
@@ -2,4 +2,9 @@ const testAddon = require('./build/Release/testaddon.node');
 console.log('addon',testAddon);
 console.log('hello ', testAddon.hello());
 console.log('add ', testAddon.add(5, 10));
+
+
+const classInstance = new testAddon.ClassExample(4.3);
+console.log('Testing class initial value : ',classInstance.getValue());
+console.log('After adding 3.3 : ',classInstance.add(3.3));
 module.exports = testAddon;
```

Make the above changes and run `npm run build`, followed by `node index.js`.
 
Notice that we have to both `classexample.cpp` and `actualclass.cpp` in the `binding.gyp`. The reason is that both classes are written by us. If you have a thrid party library c++ file. Then you would need to include the precompiled dynamic library in the `libraries` section of `binding.gyp` instead.

**Output:**
```
node index.js
addon { hello: [Function],
  add: [Function],
  ClassExample: [Function: ClassExample] }
hello  Hello World
add  15
Testing class initial value :  4.3
After adding 3.3 :  7.6
```
That was easy 😂 Wasn't it 😜?

This **should be enough for most use cases**. But if you need to know how to send *class instances back/any complex object between JS and C++* read on.

---

## Sending complex js objects to the C++ world

Lets say we have a use case like below:

```js
const prevInstance = new testAddon.ClassExample(4.3);
console.log('Initial value : ', prevInstance.getValue());
console.log('After adding 3.3 : ', prevInstance.add(3.3));
const newFromExisting = new testAddon.ClassExample(prevInstance);
console.log('Testing class initial value for derived instance');
console.log(newFromExisting.getValue()); 
```

Here, we have an instance of `ClassExample` in `prevInstance`.

And we want a new instance `newFromExisting` which has same value of `prevInstance`. For that, we want to pass the existing instance `prevInstance` to the constructor of `ClassExample `. Since, `prevInstance` is not a primitive value like int, double etc. The expected output of the last `console.log` should be `7.6` .
Lets see how we can do that:


```diff
diff --git a/cppsrc/Samples/classexample.cpp b/cppsrc/Samples/classexample.cpp
index 8dfa3cc..834f7ea 100644
--- a/cppsrc/Samples/classexample.cpp
+++ b/cppsrc/Samples/classexample.cpp
@@ -22,8 +22,17 @@ ClassExample::ClassExample(const Napi::CallbackInfo& info) : Napi::ObjectWrap<Cl
   Napi::HandleScope scope(env);
 
   int length = info.Length();
-  if (length != 1 || !info[0].IsNumber()) {
-    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
+  
+  if (length != 1) {
+    Napi::TypeError::New(env, "Only one argument expected").ThrowAsJavaScriptException();
+  }
+
+  if(!info[0].IsNumber()){
+    Napi::Object object_parent = info[0].As<Napi::Object>();
+    ClassExample* example_parent = Napi::ObjectWrap<ClassExample>::Unwrap(object_parent);
+    ActualClass* parent_actual_class_instance = example_parent->GetInternalInstance();
+    this->actualClass_ = new ActualClass(parent_actual_class_instance->getValue());
+    return;
   }
 
   Napi::Number value = info[0].As<Napi::Number>();
@@ -51,4 +60,8 @@ Napi::Value ClassExample::Add(const Napi::CallbackInfo& info) {
   double answer = this->actualClass_->add(toAdd.DoubleValue());
 
   return Napi::Number::New(info.Env(), answer);
+}
+
+ActualClass* ClassExample::GetInternalInstance() {
+  return this->actualClass_;
 }




diff --git a/cppsrc/Samples/classexample.h b/cppsrc/Samples/classexample.h
index 1f0cf69..7f6237f 100644
--- a/cppsrc/Samples/classexample.h
+++ b/cppsrc/Samples/classexample.h
@@ -5,6 +5,7 @@ class ClassExample : public Napi::ObjectWrap<ClassExample> {
  public:
   static Napi::Object Init(Napi::Env env, Napi::Object exports);
   ClassExample(const Napi::CallbackInfo& info);
+  ActualClass* GetInternalInstance();
 
  private:
   static Napi::FunctionReference constructor;
   
   
   
diff --git a/index.js b/index.js
index d849e0e..efce991 100644
--- a/index.js
+++ b/index.js
@@ -3,8 +3,13 @@ console.log('addon',testAddon);
 console.log('hello ', testAddon.hello());
 console.log('add ', testAddon.add(5, 10));
 
+const prevInstance = new testAddon.ClassExample(4.3);
+console.log('Initial value : ', prevInstance.getValue());
+console.log('After adding 3.3 : ', prevInstance.add(3.3));
+
+const newFromExisting = new testAddon.ClassExample(prevInstance);
+
+console.log('Testing class initial value for derived instance');
+console.log(newFromExisting.getValue());
 
-const classInstance = new testAddon.ClassExample(4.3);
-console.log('Testing class initial value : ',classInstance.getValue());
-console.log('After adding 3.3 : ',classInstance.add(3.3));
 module.exports = testAddon;
```


In the above changes.

1. First thing we did is change the implementation of `ClassExample::ClassExample` so that it can take an argument which is not a number.
2. Now we assume that if the argument is not a number, it must be an instance of the ClassExample itself. So to get the class instance from the JS side we need to UnWrap the object.

```cpp
Napi::Object object_parent = info[0].As<Napi::Object>();

ClassExample* example_parent = Napi::ObjectWrap<ClassExample>::Unwrap(object_parent);

ActualClass* parent_actual_class_instance = example_parent->GetInternalInstance();

this->actualClass_ = new ActualClass(parent_actual_class_instance->getValue());

return;
```
So we Unwrap the object using the `unwrap` method and then to get to the `actualClass` instance of in the `ClassExample` we defined an additional method called `GetInternalInstance` which simply returns the internal `actualClass` reference. Finally, we take the value from `actualClass` instance and create new `actualClass` instance for the new `ClassExample` instance.

Lets again run it! 

```
npm run build
node index.js
```

**Output:**
```
node index.js
Initial value :  4.3
After adding 3.3 :  7.6
Testing class initial value for derived instance
7.6
```

Crazy 🤯 🎉 We got the expected `7.6` Wohoo !! 🌮

---

The entire source code is available at : https://github.com/master-atul/blog-addons-example

I hope this helps someone trying to use N-API and create C++/C addons for NodeJS. 🌮

## References:

- https://github.com/nodejs/abi-stable-node-addon-examples/
- https://github.com/nodejs/node-addon-api.git/
- https://nodejs.org/api/addons.html