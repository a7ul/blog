---
title: ⚛️🤟 Part 3/3 - Beginners guide to Custom React Renderers. How to build your own renderer from scratch?
date: '2018-10-23T01:10:03.284Z'
---

---

This is the third post of 3 post series on Custom React Renderers.This post will cover **the update phase of the renderer**.

I strongly recommend you to read earlier posts before reading this post.

- <a href='/react-custom-renderer-1/' target='_blank'>⚛️👆 Part 1/3 - Beginners guide to Custom React Renderers...</a> and
- <a href='/react-custom-renderer-2/' target='_blank'>⚛️✌️ Part 2/3 - Beginners guide to Custom React Renderers...</a>.

---

At this point we have a custom react renderer that can render our react app into the DOM tree.

Our HostConfig looks like this now:

```js
const HostConfig = {
  now: Date.now,
  getRootHostContext: function(nextRootInstance) {
    let rootContext = {}
    return rootContext
  },
  getChildHostContext: function(parentContext, fiberType, rootInstance) {
    let context = { type: fiberType }
    return context
  },
  shouldSetTextContent: function(type, nextProps) {
    return false
  },
  createTextInstance: function(
    newText,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    return document.createTextNode(newText)
  },
  createInstance: function(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    const element = document.createElement(type)
    element.className = newProps.className || ''
    element.style = newProps.style
    // ....
    // ....
    // if (newProps.onClick) {
    //   element.addEventListener('click', newProps.onClick)
    // }
    return element
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child)
  },
  finalizeInitialChildren: (
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) => {
    return newProps.autofocus //simply return true for experimenting
  },
  prepareForCommit: function(rootContainerInstance) {},
  resetAfterCommit: function(rootContainerInstance) {},
  commitMount: (domElement, type, newProps, fiberNode) => {
    domElement.focus()
  },
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child)
  },
  supportsMutation: true,
}
```

and this is our App code.

```js
import React from 'react'
// import ReactDOM from "react-dom";
import CustomRenderer from './renderer'

const Text = props => {
  return <p className={props.className}>{props.content}</p>
}

const App = () => {
  return (
    <div>
      <Text className="hello-class" content="Hello" />
      <span style="color:blue;" autofocus>
        World
      </span>
    </div>
  )
}

// ReactDOM.render(<App />, document.getElementById("root"));
CustomRenderer.render(<App />, document.getElementById('root'))
```

Now lets add state to our app and use a button to change the state on click and see what happens.
