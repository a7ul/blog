---
title: ⚛️ Using React hooks for functional components with perfect fallback for class components.
date: 2019-06-12T17:12:03.284Z
keywords: react, react-hooks, hooks, hocs, fallback
featuredImage: reactbanner.png
slug: react-hooks-hocs
---

This would be a very short post (approx 2min read). I recently wanted to abstract away a functionality that we had to use for multiple React components. I decided that I will write it using React hooks. Only issue is that we had a lot of legacy class components that needed the same functionality. So that would mean:

1. Rewrite all components to functional components - _Big NO NO_

2. Duplicate the same logic in both hooks and hoc format. _But what do we say to code duplication? Not today!_

After tinkering around a bit I came up with the following hack that allows me to write my logic as a hook and have great fallback option for class components in the form of a HOC.

We will take a simple example for this post. Lets say we have a hook as follows:

```js
import React, { useState } from 'react'

// Hook for functional components
export const useCountry = () => {
  const [country] = useState('IN')
  return country
}
```

Now to make it work with a class components let add a HOC that uses this hook.

```js
import React, { useState } from 'react'

// Hook for functional components
export const useCountry = () => {
  const [country] = useState('IN')
  return country
}

// HOC for class components
export const withCountry = Component => {
  return props => {
    const country = useCountry()
    return <Component {...props} country={country} />
  }
}
```

### Usage:

**For a functional component you could do:**

```js
const MyComponent = props => {
  const country = useCountry()
  return (
    <div>
      <div> Hi, I am from </div>
      <div>{country}</div>
    </div>
  )
}
export default MyComponent
```

**And for a class component you would do:**

```js
class MyComponent extends React.Component {
  render() {
    const { country } = this.props
    return (
      <div>
        <div> Hi, I am from </div>
        <div>{country}</div>
      </div>
    )
  }
}

export default withCountry(MyComponent)
```

This simple trick allows you to use the same **hook** with class components (as a **HOC** 🤨)

Hope this helps 🎉
