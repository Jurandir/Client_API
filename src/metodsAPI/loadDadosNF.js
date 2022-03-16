const loadAPI = require('../helpers/loadAPI')
const config  = require('../auth/config.json')

const loadDadosNF = async(cnpj,numero,serie,token) => {
    let server   = config.apiClienteURL
    let endpoint = ''
    let method   = 'POST'
    let params   =  
        {
            "valoresParametros":[ cnpj, numero, serie]
        }
    
    let ret = await loadAPI(method,endpoint,server,params,token)

    return ret

}

module.exports = loadDadosNF