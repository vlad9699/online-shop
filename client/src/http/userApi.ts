import { $checkToken, $host } from './index'

// const registrationRequest = async ({ email, password, fistName, lastName }: any) => {
//   const response = await $host.post('api/user/registration', { email, password, fistName, lastName })
//   return response
// }

// export const registerRequestTest = async (dataReg: any) => await doHttpCall('POST', '/api/user/registration', { dataReg }, null)

const API = {
  async checkTokenRequest() {
    return await doHttpCall('GET__AUTH', '/api/user/auth', null, null )
  },
  async registerRequest(dataReg: any) {
    return await doHttpCall('POST', '/api/user/registration', dataReg, null)
  },

  async loginRequest(dataLogin: any) {
    return await doHttpCall('POST', '/api/user/login', dataLogin, null)
  },


}
export default API

function createResponse(result: any, error: any) {
  return [result, error]
}

async function doHttpCall(
  method: any,
  url: any,
  payload: any,
  params: any,
) {
  try {
    let result:any = null

    if (method === 'GET') {
      result = await $host.get(url, { params })
    } else if (method === 'POST') {
      result = await $host.post(url, { ...payload }, { params })
    } else if (method === 'PUT') {
      result = await $host.put(url, { ...payload }, { params })
    } else if (method === 'DELETE') {
      result = await $host.delete(url, { params: payload })
    }

    //HEADERS

    if (method == 'GET__AUTH') {
      result = await $checkToken.get(url, {params})
    }

    if (result.status === 203) {
      if (result?.data?.status) {
        return createResponse(null, null)
      }
    }

    if (!(result && result.data)) {
      return createResponse(null, 'Data not found')
    }
    return createResponse(result.data, null)
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized')
      }
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    const message = error?.response?.data?.message
    return createResponse(null, message || 'Unknown error')

  }
}
