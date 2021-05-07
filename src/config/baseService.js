import axios from 'axios'
import service from './service'

function baseService (param) {
  return axios({
    method: 'POST',
    url: service.SERVER + service.SYSTEM_USER_LOGIN + '&username=' + param.username + '&password=' + param.password,
    auth: param
  }).then(res => res.data)
}

export default baseService
