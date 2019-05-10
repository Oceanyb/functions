import { AsyncStorage } from 'react-native';

// var domain = 'http://hongxin.natapp1.cc/version_1.0.0'
var domain = 'http://47.101.37.254:8084/suichu/version_1.0.0'
var apiFetch = {
  withToken: async function (_url,params) {
    let urlWith = ''
    try {
      var token = JSON.parse(await AsyncStorage.getItem('user')).token
    } catch (error) {
      console.log(error)
    }
    if(params != undefined){
      urlWith = domain + _url + '?'
      for(let i in params){
        urlWith = urlWith + i + '=' + params[i] + '&'
      }
      urlWith = urlWith.substr(0,urlWith.length - 1)
    }else{
      urlWith = domain + _url
    }
    console.log('with',urlWith)
    return fetch(urlWith, {
      method: "POST",
      // mode: "cors",
      headers: {
        token: token,
      }
    }).then(response => response)
    .catch(error => console.error('Error',error));
  },
  without: function (_url,params) {
    let urlWithout = ''
    if(params != undefined){
      urlWithout = domain + _url + '?'
      for(let i in params){
        urlWithout = urlWithout + i + '=' + params[i] + '&'
      }
      urlWithout = urlWithout.substr(0,urlWithout.length - 1)
    }else{
      urlWithout = domain + _url
    }
    console.log('without',urlWithout)
    return fetch(urlWithout, {
      method: "POST",
      // mode: "cors",
      // headers: {
      //   host:'47.101.37.254'
      // }
    }).then(response => response)
    .catch(error => console.error('Error',error));
  },
  getWithout: function (_url,params) {
    let getWithout = ''
    if(params != undefined){
      getWithout = domain + _url + '?'
      for(let i in params){
        getWithout = getWithout + i + '=' + params[i] + '&'
      }
      getWithout = getWithout.substr(0,getWithout.length - 1)
    }else{
      getWithout = domain + _url
    }
    console.log('without',getWithout)
    return fetch(getWithout, {
      method: "GET",
      // mode: "cors",
    }).then(response => response)
    .catch(error => console.error('Error',error));
  },
  getWith: async function (_url,params) {
    let getWith = ''
    try {
      var token = JSON.parse(await AsyncStorage.getItem('user')).token
    } catch (error) {
      console.log(error)
    }
    if(params != undefined){
      getWith = domain + _url + '?'
      for(let i in params){
        getWith = getWith + i + '=' + params[i] + '&'
      }
      getWith = getWith.substr(0,getWith.length - 1)
    }else{
      getWith = domain + _url
    }
    console.log('without',getWith)
    return fetch(getWith, {
      method: "GET",
      // mode: "cors",
      headers: {
        token: token,
      }
    }).then(response => response)
    .catch(error => console.error('Error',error));
  }
}

module.exports = apiFetch