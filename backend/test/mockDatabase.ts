import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

let mongo: any

export const mockDatabaseConnection = async () => {
    if (!mongo) {
        mongo = await MongoMemoryServer.create()
    }
    const uri = mongo.getUri()
    await mongoose.connect(uri)
    return mongo
}
