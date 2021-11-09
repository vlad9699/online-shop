import axios from 'axios'


const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const $checkToken = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = (config:any) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = "Bearer " + token
  } else {
    config.headers.authorization = ""
  }
  return config
}

const checkTokenInterceptor = (config:any) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.authorization = token
  return config
}

$authHost.interceptors.request.use(authInterceptor)
$checkToken.interceptors.request.use(checkTokenInterceptor)

export {
  $host,
  $authHost,
  $checkToken
}
