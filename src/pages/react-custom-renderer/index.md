---
title: 🚀⚛️ Beginners guide to React Renderers. How to build your own renderer from scratch?
date: '2018-10-15T20:12:03.284Z'
---

React helps you write your UI declaratively.
<a href="https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2" target="_blank">More on declarative vs imperative here</a>. It was initially developed for Web, but since then it has been extended as
<a href="https://facebook.github.io/react-native/" target="_blank">React Native</a>,
<a href="https://github.com/Flipboard/react-canvas" target="_blank">React Canvas</a>,
<a href="https://github.com/nitin42/redocx" target="_blank">Redocx</a>,
<a href="https://github.com/diegomura/react-pdf" target="_blank">React PDF</a> and even
<a href="https://github.com/iamdustan/react-hardware" target="_blank">React Hardware</a>.

<a href="https://github.com/chentsulin/awesome-react-renderer" target="_blank">There are a lot more out there and you can find them here</a>

I always wanted to learn how these renderers worked and in this post, I will explore React Renderers in detail. One of the talks that inspired me to take a look into this was by <a href="http://kenwheeler.github.io/" target="_blank">Ken Wheeler</a> at React Amsterdam 2017

<iframe width="560" height="315" src="https://www.youtube.com/embed/oPofnLZZTwQ" frameborder="0" allow="autoplay; encrypted-media" ></iframe>

<br />
<br />
<hr />

**_Most of the content on this post is a result of my experimentation with React and reading through multiple react renderer codebases and blog posts. If you find any corrections in this post or any other extra details, please let me know in the comments._**

# Before we dive in

Before we go ahead and implement custom renderers that will drive cars and power nuclear power plants (Let your imagination go crazy 🌈), its a good idea to revisit some basics. You can safely skip them and dive straight to next section, if you consider yourself a react ninja 🤺 who can build react apps blindfolded 😎.

**Available React APIs from the main react module.** <a href="https://reactjs.org/docs/react-api.html" target="_blank"> https://reactjs.org/docs/react-api.html</a>

**Understanding JSX in depth.** <a href="https://reactjs.org/docs/jsx-in-depth.html" target="_blank">https://reactjs.org/docs/jsx-in-depth.html</a>

**React Stack Renderer Implementation Notes (Optional)** <a href="https://reactjs.org/docs/implementation-notes.html" target="_blank">https://reactjs.org/docs/implementation-notes.html</a>

/// TODO - Move these two when we need them

**Basic understanding of What Fiber is (Optional)**:<a href=" https://www.youtube.com/watch?v=ZCuYPiUIONs" target="_blank"> https://www.youtube.com/watch?v=ZCuYPiUIONs</a>

**React Async Rendering (Time Slicing + Suspense)**:
<a href="https://www.youtube.com/watch?v=nLF0n9SACd4" target="_blank"> https://www.youtube.com/watch?v=nLF0n9SACd4</a>
<a href="https://www.youtube.com/watch?v=6g3g0Q_XVb4?t=1588" target="_blank"> https://www.youtube.com/watch?v=6g3g0Q_XVb4?t=1588</a>
https://www.youtube.com/watch?v=7LmrS2sdMlo
https://github.com/sw-yx/fresh-async-react

# React Reconciler and Renderer

# Components, Instances, Elements and Fiber

Lets say we have a react app that looks like this:

```js
import React from 'react'
import ReactDom from 'react-dom'

class MyButton extends React.Component {
  state = { text: 'click me' }
  onBtnClick = () => {
    this.setState(() => ({ text: 'I was clicked' }))
  }
  render() {
    return <button onClick={this.onBtnClick}> {this.state.text} </button>
  }
}

const Content = props => <p>{props.text}</p>

const App = () => {
  return (
    <div>
      <p style="padding:20px">Hello World</p>
      <Content text="hello world" />
      <MyButton />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
```

Few fundamental units in the react-reconciler.

### Component

In the above example: **MyButton**, **Content** and **App** are essentially components that you define. A Component can be defined as a class (MyButton) or as a function (Content and App). It is basically a declaration of how the UI elements should look and behave.

### Instances

For components declared as a class, the instances are the in memory initialized version of the components. An instance is what you refer to as **this** in the component class you write. It is useful for storing local state and reacting to the lifecycle events. There can be multiple independent instances of the same component. We will never create these instances manually, they will be managed by React. Also, functional components don’t have instances at all.

### Elements

An element is an immutable plain object describing a component instance or DOM node and its desired properties. The render function of the component returns an element. In case of functional components. The input is props while the output is a react element. Since elements are just plain light JS objects they are easy to traverse and don’t need to be parsed.

To explain it lets take an example:

Here **Content** is a functional component.

```js
const Content = props => {
  return <p style={props.style}>{props.text}</p>
}
```

Lets say we use it as

```js
<Content style="background:blue;" text="hello world" />
```

This will tell React to call

```js
Content({ text: 'hello world', style: 'background:blue;' })
```

If we **console.log** it, we get

```js
console.log(Content({ text: 'hello world', style: 'background:blue;' }))
// This logs
{
  "type":"p",
  "props":{
    "style":"background:blue;",
    "children":"hello world"
  },
}
```

This is a react element for the component. It contains only information about the component type **p**, its props (style, children). In otherwords, it is a lightweight javascript object that contains only the information needed to draw the element on the screen.

Now what if we do this with App:

```js
const App = () => {
  return (
    <div>
      <p style="padding:20px">Hello World</p>
      <Content text="hello world" />
      <MyButton />
    </div>
  )
}
console.log(App())
// This would log
{
   "type": "div",
   "props": {
      "children":[
         {
            "type":"p",
            "props":{
               "style":"padding:20px",
               "children":"Hello World"
            },
         },
         {
           "type": ƒ Content(props),
           "props": {"text":"hello world"},
         },
         {
           "type": ƒ MyButton()
         },
      ]
   },
}
```

If you notice carefully, The second and third child has type which is not a string. They are functions(basically components). Now, react reconciler would call render on those children for which the type is not a string. This would happen recursively till react can resolve all the types to strings. Hence, if a react element type is a string it is a dom element otherwise it is a Component.

I recommend reading the more detailed version by Dan Abramov here: <a href="https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html" target="_blank">https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html</a>

### fiber

This was introduced in the new React Fiber Reconciler. A fiber is a JavaScript object that contains information about a component, its input and output. It has a one to one relation with the instance. It manages the work for the instance. The fiber keeps track of the instance using the property stateNode. And it also has information about its relationship with other instances. At any time, a component instance has at most two fibers that correspond to it: the current (flushed fiber or rendered fiber) and the work-in-progress fiber. A fiber node looks like this

```js
{
  child, stateNode, siblings, alternate, return, type, key
}
```

<a href="https://github.com/facebook/react/blob/9ea4bc6ed607b0bbd2cff7bbdd4608db99490a5f/packages/react-reconciler/src/ReactFiber.js#L406" target="_blank">From the source code </a> I could understand that React Fiber reconciler uses the react element to generate a react fiber for the component instance. So you can think of it as a react element with time management super powers🥇.
<a href='https://giamir.com/what-is-react-fiber' target='_blank'>You can find more details about the fiber here</a>

Now that we are done with crash course on React Internal elements, lets do what we came here for.

# Lets build a custom renderer

# References

- Building React From Scratch by Paul O Shannessy - <a href="https://www.youtube.com/watch?v=_MAD4Oly9yg" target="_blank" >https://www.youtube.com/watch?v=\_MAD4Oly9yg</a>
- https://reactjs.org/docs/react-api.html
- https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
- https://reactjs.org/docs/jsx-in-depth.html
- https://reactjs.org/docs/implementation-notes.html
- https://medium.com/@agent_hunt/react-is-also-the-llvm-for-creating-declarative-ui-frameworks-767e75ce1d6a
- https://medium.com/@agent_hunt/hello-world-custom-react-renderer-9a95b7cd04bc
- https://github.com/nitin42/Making-a-custom-React-renderer
- https://goshakkk.name/react-custom-renderers/
- https://hackernoon.com/learn-you-some-custom-react-renderers-aed7164a4199
- https://giamir.com/what-is-react-fiber
