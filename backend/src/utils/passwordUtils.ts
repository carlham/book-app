import argon2 from "argon2"

//hashes password 
async function hashPassword(password: string) {
    return await argon2.hash(password)
}

//verify password
async function verifyPassword(password: string, hashedPassword: string) {
    return await argon2.verify(hashedPassword, password)
}

export default { hashPassword, verifyPassword }