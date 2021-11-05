import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.render(<Provider store={store}><HelmetProvider><App/></HelmetProvider></Provider>, document.getElementById('root'),
)

