import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import mongoose from "mongoose"
import "dotenv/config"
import cors from "cors"

import { SongResolver } from "./resolvers/Song"
import { PlaylistResolver } from "./resolvers/Playlist"

const startServer = async () => {
    const app = express()

    app.use(cors())
    app.use(express.json({ limit: "50mb" }))
    app.use(express.urlencoded({ limit: "50mb" }))

    const schema = await buildSchema({
        resolvers: [SongResolver, PlaylistResolver],
    })

    const server = new ApolloServer({
        schema,
    })

    const databaseConnectionString = process.env.DB_URL || ""

    await mongoose.connect(databaseConnectionString)

    server.applyMiddleware({ app })

    app.listen({ port: 4000 }, () =>
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
        ),
    )
}

startServer()
