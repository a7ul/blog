---
title: ⚛️✌️ Part 2/3 - Beginners guide to React Renderers. How to build your own renderer from scratch?
date: '2018-10-21T22:12:03.284Z'
---

---

This is the continuation of the post here: <a href='/react-custom-renderer-1/' target='_blank'>⚛️👆 Part 1/3 - Beginners guide to React Renderers. How to build your own renderer from scratch?</a>. I would strongly recommend reading Part 1 before.

---

## HostConfig

**Recap**: Renderers are required to implement all the necessary platform specfic functions inside the **HostConfig**.
Our HostConfig looks like this at the moment.

```js
const HostConfig = {
  //TODO We will specify all required methods here
}
```

<br/>

From the <a href='https://github.com/facebook/react/blob/dac9202a9c5add480f853bcad2ee04d371e72c0c/packages/react-reconciler/src/forks/ReactFiberHostConfig.custom.js' target='_blank'>source code of **react-reconciler**</a>, we find the complete list of methods in hostConfig
as follows:

```js
HostConfig.getPublicInstance
HostConfig.getRootHostContext
HostConfig.getChildHostContext
HostConfig.prepareForCommit
HostConfig.resetAfterCommit
HostConfig.createInstance
HostConfig.appendInitialChild
HostConfig.finalizeInitialChildren
HostConfig.prepareUpdate
HostConfig.shouldSetTextContent
HostConfig.shouldDeprioritizeSubtree
HostConfig.createTextInstance
HostConfig.scheduleDeferredCallback
HostConfig.cancelDeferredCallback
HostConfig.setTimeout
HostConfig.clearTimeout
HostConfig.noTimeout
HostConfig.now
HostConfig.isPrimaryRenderer
HostConfig.supportsMutation
HostConfig.supportsPersistence
HostConfig.supportsHydration
// -------------------
//      Mutation
//     (optional)
// -------------------
HostConfig.appendChild
HostConfig.appendChildToContainer
HostConfig.commitTextUpdate
HostConfig.commitMount
HostConfig.commitUpdate
HostConfig.insertBefore
HostConfig.insertInContainerBefore
HostConfig.removeChild
HostConfig.removeChildFromContainer
HostConfig.resetTextContent
HostConfig.hideInstance
HostConfig.hideTextInstance
HostConfig.unhideInstance
HostConfig.unhideTextInstance
// -------------------
//     Persistence
//     (optional)
// -------------------
HostConfig.cloneInstance
HostConfig.createContainerChildSet
HostConfig.appendChildToContainerChildSet
HostConfig.finalizeContainerChildren
HostConfig.replaceContainerChildren
HostConfig.cloneHiddenInstance
HostConfig.cloneUnhiddenInstance
HostConfig.createHiddenTextInstance
// -------------------
//     Hydration
//     (optional)
// -------------------
HostConfig.canHydrateInstance
HostConfig.canHydrateTextInstance
HostConfig.getNextHydratableSibling
HostConfig.getFirstHydratableChild
HostConfig.hydrateInstance
HostConfig.hydrateTextInstance
HostConfig.didNotMatchHydratedContainerTextInstance
HostConfig.didNotMatchHydratedTextInstance
HostConfig.didNotHydrateContainerInstance
HostConfig.didNotHydrateInstance
HostConfig.didNotFindHydratableContainerInstance
HostConfig.didNotFindHydratableContainerTextInstance
HostConfig.didNotFindHydratableInstance
HostConfig.didNotFindHydratableTextInstance
```

<br/>
🤬Now, that looks like too much work 🤯. Fortunately, we only need to implement <strong>few of those functions</strong> to get the renderer up and running.🕺🏻👻
<div style="display:flex;flex-direction:row;align-items:center;">
<img src="./shocked.gif" alt="shocked meme" style="height:200px;margin:0 auto;"/>
</div>

I will try to explain what most of these methods do, but we will primarily focus on the ones we need. **Disclaimer:** Most of the content is a result of my experimentation with React renderers and reading through the publicly available source code and blog posts. Hence, if you find anything that needs correction, please do let me know in the comments.

## Initial render

We are trying to render **src/index.js** that looks like this:

```js
const Text = props => {
  return <p className={props.className}>{props.content}</p>
}

const App = () => {
  return (
    <div>
      <Text className="hello-class" content="Hello" />
      <span style="color:blue;">World</span>
    </div>
  )
}
```

So our rendered view tree should look like this:

<div style="display: block; max-width: 300px; margin: 0 auto;"><img src="./first_render_view_tree.png" alt="first render tree" /></div>

Now lets look at the error that we got earlier: ![now error](./first_error_now.png) <br/>
From the list of functions in the hostConfig lets implement **now()**.

```js
const HostConfig = {
  now: Date.now,
}
```

**now** is used by the reconciler to calculate the current time. Hence we will provide it **Date.now**.

Refresh! and we get : ![get root host error](./get_root_host_not_function.png)
Lets stub this function

```js
const HostConfig = {
  now: Date.now,
  getRootHostContext: function(...args) {
    console.log('getRootHostContext', ...args)
  },
}
```

Refresh! and we get: ![get child host error](./get_child_host_error.png)

Continuing the chain till we have no more errors we get:

```js
const HostConfig = {
  now: Date.now,
  getRootHostContext: function(...args) {
    console.log('getRootHostContext', ...args)
  },
  getChildHostContext: function(...args) {
    console.log('getChildHostContext', ...args)
  },
  shouldSetTextContent: function(...args) {
    console.log('shouldSetTextContent', ...args)
  },
  createTextInstance: function(...args) {
    console.log('createTextInstance', ...args)
  },
  createInstance: function(...args) {
    console.log('createInstance', ...args)
  },
  appendInitialChild: function(...args) {
    console.log('appendInitialChild', ...args)
  },
  finalizeInitialChildren: function(...args) {
    console.log('finalizeInitialChildren', ...args)
  },
  prepareForCommit: function(...args) {
    console.log('prepareForCommit', ...args)
  },
  resetAfterCommit: function(...args) {
    console.log('resetAfterCommit', ...args)
  },
}
```

Now we should get a blank screen, but our logs should help us figure out what the reconciler is trying to do and in what order these functions are getting called.
![initial render logs list](./initial_render_logs_list.png)
_(Right Click on the image and select **Open Image in New Tab** to get a better resolution version)._

The order of execution looks like this:

<a target="_blank" href="./inital_render_tree_flow.svg">
  <img src="./inital_render_tree_flow.svg" alt="inital render flow" style="margin: 0 auto;display: block;" />
</a>
<br />

Now we should be able to guess what these methods do. But instead of just making wild guesses, It is a good idea to read through <a href='https://github.com/facebook/react/blob/409e472fcaae2b6c171f4e9a0c4b5ad88ec2bf21/packages/react-dom/src/client/ReactDOMHostConfig.js#L97' target='_blank'>the source code of <strong>react-dom</strong> to </a> better understand what each of these functions are doing.

# References

- https://github.com/facebook/react/tree/master/packages/react-dom
- https://medium.com/@agent_hunt/react-is-also-the-llvm-for-creating-declarative-ui-frameworks-767e75ce1d6a
- https://medium.com/@agent_hunt/hello-world-custom-react-renderer-9a95b7cd04bc
- https://github.com/nitin42/Making-a-custom-React-renderer
- https://goshakkk.name/react-custom-renderers/
- https://hackernoon.com/learn-you-some-custom-react-renderers-aed7164a4199
