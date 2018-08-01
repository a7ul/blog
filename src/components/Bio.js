import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src="https://avatars2.githubusercontent.com/u/4029423?s=200"
          alt={`Atul R`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Atul R</strong> who lives and works in San
          Francisco building useful things.{' '}
          <a href="https://twitter.com/masteratul94">
            You should follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
