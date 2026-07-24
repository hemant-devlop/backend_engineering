import bcrypt from 'bcrypt'

import config from '../../config/index.js'

class PasswordService{

    async hash(plainPassword){
        return bcrypt.hash(plainPassword,config.security.bcryptRounds)
    }
    async compare(plainPassword,passwordHash){
        return bcrypt.compare(plainPassword,passwordHash)
    }
    async rehash(){}
}

export const passwordService=new PasswordService()