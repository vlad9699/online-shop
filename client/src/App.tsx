import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import ThemeConfig from './theme'
import CustomSnackbar from './components/snackbar/snackbar'
import { AuthLayout } from './components/Auth/AuthLayout'

const App: FC = () => {
  return (
    <ThemeConfig>
      <BrowserRouter>
        <CustomSnackbar/>
        <AuthLayout>
          <AppRouter/>
        </AuthLayout>
      </BrowserRouter>
    </ThemeConfig>
  )
}

export default App
