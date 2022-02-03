import { graphql, GraphQLSchema } from "graphql"
import { Maybe } from "graphql/jsutils/Maybe"
import { buildSchema } from "type-graphql"
import { PlaylistResolver } from "../resolvers/Playlist"
import { SongResolver } from "../resolvers/Song"
import { uploadSong } from "../utility/upload"

export const mockFunctions = () => {
    return exports.uploadSong()
}

interface Options {
    source: string
    variableValues?: Maybe<{
        [key: string]: any
    }>
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await buildSchema({
            resolvers: [SongResolver, PlaylistResolver],
        })
    }
    return graphql({
        schema,
        source,
        variableValues,
    })
}
