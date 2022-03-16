// By: Jurandir Ferreira ( Teste API (https://ws.termaco.com.br/api/apiTracking) )
// 15/03/2022

const fs = require('fs')
const login = require('./src/auth/login')
const config = require('./src/auth/config.json')
const listNfs = require('./dados.json')
const moment = require('moment')
const apiCliente = require('./src/metodsAPI/loadDadosNF')
const saveLogJSON = require('./src/helpers/saveLogJSON')

let user = config.clientes[0].user
let pass = config.clientes[0].pass

login(user, pass).then(async (ret) => {
    let dadosNF
    let dados = ret.dados
    let token = dados.token
    console.log(moment().format(), dados)

    for await (nf of listNfs) {
       
        let  path = `./responses/NF_${nf.numero}.json`
        let  fileExist = false

        try {
            fileExist = fs.existsSync(path)
        } catch(err) {
            console.error('File Erro:',err)
        }

        if ( (nf.cnpj == user) && (fileExist == false) ) {
            try {

                dadosNF = await apiCliente(user, nf.numero, nf.serie, token)

                let base64_OK = []
                if ((!dadosNF.dados.err)) {

                    base64_OK = dadosNF.dados.comprovantes.map(i => i)
                    nf.length = base64_OK.length
                    nf.ctrc = dadosNF.dados.documento

                    if (nf.length) {
                        saveLogJSON(`NF_${nf.numero}`, dadosNF)
                    }

                    console.log(nf.ctrc, nf.numero, 'Comprovante:', (nf.length ? 'OK' : 'Sem retorno'))


                } else {

                    console.log(nf.ctrc, nf.numero, 'Não localizado.')

                }

            } catch (err) {
                console.log('ERRO:', nf.ctrc, nf.numero, dadosNF, err)
            }
        }
    }

})

