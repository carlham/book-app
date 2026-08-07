import mongoose from "mongoose"

const DB_URI = process.env.DB_URI
const DB_NAME = process.env.DB_NAME

const connect = async () => {
    if (!DB_URI) return console.log("\n\nURI of database has not been specified. Aborting")
    if (!DB_NAME) return console.log("\n\nName of database has not been specified. Aborting")
        try {
            await mongoose.connect(DB_URI, { dbName: DB_NAME })
            console.log("Database connection successful.")
            return true
        } catch (error) {
            console.log("Unable to connect to database.")
            return false            
        }
}

//graceful closing of connection
const disconnect = async () => {
    try {
        await mongoose.disconnect()
        console.log("Connection to database closed.")
    } catch (error) {
        console.log("Unable to close database")
    }
}

const database = {
    disconnect: async () => await disconnect(),
    connect: async () => await connect()
}

export default database