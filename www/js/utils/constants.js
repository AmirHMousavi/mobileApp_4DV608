angular
  .module('starter.constants',[])
  .constant('AUTH_EVENTS', {notAuthenticated: 'auth-not-authenticated',emailAlreadyExists:'Email Is Already In Use'})
  .constant('API_ENDPOINT', {
    url: 'https://easysign.galactic.network/api',
    requestSignature: 'https://easysign.galactic.network/api' + '/request', //POST
    checkForRequests: 'https://easysign.galactic.network/api' + '/request', //GET
    signRequest: 'https://easysign.galactic.network/api' + '/request/:id', // POST
    checkIfRequestIsSigned: 'https://easysign.galactic.network/api' + 'request/:id', //GET
    register: 'https://easysign.galactic.network/api' + '/register', //POST
    login: 'https://easysign.galactic.network/api' + '/login', //POST
    uploadSignature: 'https://easysign.galactic.network/api' + '/register/:uuid' //POST
  });