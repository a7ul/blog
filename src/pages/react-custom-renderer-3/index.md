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

```js
import React from 'react'
// import ReactDOM from "react-dom";
import CustomRenderer from './renderer'

const Text = props => {
  return <p className={props.className}>{props.content}</p>
}

class App extends React.Component {
  state = {
    text: Date.now(),
  }
  onButtonClick = () => {
    this.setState(() => ({ text: Date.now() }))
  }
  render() {
    return (
      <div>
        <Text className="hello-class" content={this.state.text} />
        <span style="color:blue;" autofocus>
          World
        </span>
        <button onClick={this.onButtonClick}>Get current time</button>
      </div>
    )
  }
}

// ReactDOM.render(<App />, document.getElementById("root"));
CustomRenderer.render(<App />, document.getElementById('root'))
```

Now, you should see a button like this:
![added a new button](./added_btn.png)

When you try and click on the button, we see that nothing happens. This is happening because our onClick listener is not getting invoked. And the reason why this happens is because our renderer doesnt know what to do with **onClick** prop on the button.
Lets add that functionality to our **hostConfig**

```js
...
...
...
createInstance: function(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    const element = document.createElement(type);
    element.className = newProps.className || "";
    element.style = newProps.style;
    // ....
    // ....
    if (newProps.onClick) {
      element.addEventListener("click", newProps.onClick);
    }
    return element;
  },
...
...
...
```

Refresh and click on the button. Boom! we get an error.

![prepareUpdate error](./prepareUpdate.png)

Well 🤷🏻‍ atleast it means that our **onClick** listener is now working. Lets stub this method in our hostConfig.

```js
...
  prepareUpdate: function(...args) {
    console.log("prepareUpdate", ...args);
  }
...
```

We get another error related to **commitTextUpdate** now. Lets stub that too.

```js
...
 commitTextUpdate: function(...args) {
    console.log("commitTextUpdate", ...args);
  }
...
```

No more errors! Now, lets take a look at their respective implementations.

### ▸ prepareUpdate

---

The function signature is:

```js
function prepareUpdate(
  instance,
  type,
  oldProps,
  newProps,
  rootContainerInstance,
  currentHostContext
) {
  return {
    /* update payload */
  }
}
```

**_Parameters_**

- **instance**: instance is the current dom instance of the node.
- **type**: This contains the type of fiber i.e, 'div', 'span', 'p', 'input' etc.
- **oldProps**: props before this update.
- **newProps**: new props.
- **rootContainerInstance**: root dom node you specify while calling render. This is most commonly `<div id="root"></div>`
- **currentHostContext**: contains the context from the parent node enclosing this node. This is the return value from **getChildHostContext** of the parent node.

**_Return Value_** This function should return a payload object. Payload is a Javascript object that can contain information on what needs to be changed on this host element. If returned true,

**_Purpose_**
Prepare update is called first on the node, where the prop change occurs and then it is called on all the tree nodes recursively.
This method can be used to hint the reconciler whether an update needs to be performed on this node or not. If this function doesnt return anything, then reconciler decides whether the update should be performed on this node or not based on its algorithm.

The idea is that we will NOT perform any dom changes in this function. Dom changes should be done on the commit phase of the renderer only. Once the tree traversal for the prepareUpdate is done, then prepareForCommit method will be called on rootContainer followed by **commitUpdate** on each node where we returned an updatePayload from **prepareUpdate**.

**_For our custom renderer_**

We will do nothing here.

```js
prepareUpdate : function (
  instance,
  type,
  oldProps,
  newProps,
  rootContainerInstance,
  currentHostContext
) {
  return; //return nothing.
}
```

---

### ▸ commitUpdate

---

The function signature is:

```js
function commitUpdate(
  instance,
  updatePayload,
  type,
  oldProps,
  newProps,
  finishedWork
) {
  return {
    /* update payload */
  }
}
```

**_Parameters_**

- **instance**: instance is the current dom instance of the node.
- **updatePayload**: update payload from **prepareUpdate** on the same node.
- **type**: This contains the type of fiber i.e, 'div', 'span', 'p', 'input' etc.
- **oldProps**: props before this update.
- **newProps**: new props.
- **finishedWork**: The fiber node that manages work for this instance.

**_Purpose_**
Here we perform all updates that we queued using prepareUpdate method. We will get the instance, the updatePayload, old and new props etc. This is where we should do all our dom manupulation work if needed.

**_For our custom renderer_**

We will do nothing here.

```js
commitUpdate: function(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    return; //return nothing.
  },
```

---

### ▸ commitTextUpdate

---

The function signature is:

```js
function commitTextUpdate(textInstance, oldText, newText) {
  /** perform dom update on textInstance **/
}
```

**_Parameters_**

- **textInstance**: instance is the current text node on the dom.
- **oldText**: text before this update.
- **newText**: new text to be updated.

**_Purpose_**
Here we perform the actual dom update on the textNode.

**_For our custom renderer_**

Lets update the text node.

```js
commitTextUpdate: function(textInstance, oldText, newText) {
    textInstance.nodeValue = newText;
}
```

---

Now, lets run our app and see what happens. Click that "Get current time" button 👊🏽. Our text field should now update to the latest value in the state. 🥳🥳🥳

### Order of Execution for Update

If you see the list of all functions in the hostConfig from React Dom source code, you should see a lot of functions that are not yet covered but seem like somewhat related to update functionality. After playing around a lot with the renderer this is the order of execution that I came up with.
