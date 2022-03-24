
const bcrypt = require('bcryptjs');
        let salt = bcrypt.genSaltSync(7);
        let hash = bcrypt.hashSync("mantap", salt);


        console.log(hash)