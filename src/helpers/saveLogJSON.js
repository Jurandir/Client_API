const fs   = require('fs')
const path = require('path')

const saveLogJSON = async ( _FILE, _JSON ) => {

    let fullName = path.join(__dirname,`../../responses/${_FILE}.json`)
    fs.writeFileSync( fullName , JSON.stringify(_JSON, null, '\t') )

}

module.exports = saveLogJSON
