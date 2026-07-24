import crypto from 'crypto'

class HashService{
    hashSha256(hash){
      return crypto.createHash("sha256").update(hash).digest("hex");
    }
}

export const hashService=new HashService()