export default {
  'SERVER': 'http://localhost:7000',
  'SYSTEM_USER_LOGIN': '/auth/oauth/token?grant_type=password&client_id=haozai&client_secret=haozai',
  'getFullPath': k => {
    return this.SERVER + this[k]
  }
}
