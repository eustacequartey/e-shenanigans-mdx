import React, { useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Code } from './src/components/code'
import { preToCodeBlock } from 'mdx-utils'
import { Image, Blockquote } from './src/components'
import { ThemeProvider } from 'styled-components'
import { Light, Dark } from './static/styled-components/themes'

// components is its own object outside of render so that the references to
// components are stable
const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
  Image,
  Blockquote,
}

export const wrapRootElement = ({ element }) => {
  return (
    <MDXProvider components={components}>
      <ThemeProvider1 element={element} />
    </MDXProvider>
  )
}

const ThemeProvider1 = ({ element }) => {
  let stored

  if (typeof window !== 'undefined')
    stored = !!localStorage.getItem('isDarkMode')

  const [isDarkMode, setIsDarkMode] = useState(stored === 'true' ? true : false)

  function toggleTheme() {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', !isDarkMode)
    }
  }

  return (
    <ThemeProvider
      theme={{ currentTheme: isDarkMode ? Dark : Light, toggleTheme }}
    >
      {element}
    </ThemeProvider>
  )
}
