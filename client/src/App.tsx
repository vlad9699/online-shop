import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import ThemeConfig from './theme'

const App: FC = () => {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </ThemeConfig>
  )
}

export default App
