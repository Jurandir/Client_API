const loadAPI = require('../helpers/loadAPI')
const config  = require('./config.json')

const login = async(user,pass) => {
    let server   = config.loginURL
    let endpoint = ''
    let method   = 'POST'
    let params   =  
        {
            "cnpj": user,
            "senha": pass
        }
    
    let ret = await loadAPI(method,endpoint,server,params)

    return ret

}

module.exports = login