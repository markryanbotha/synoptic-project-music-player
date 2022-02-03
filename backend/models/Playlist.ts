import { prop, getModelForClass, Ref } from "@typegoose/typegoose"
import { ObjectId } from "mongoose"
import { Field, ObjectType, InputType } from "type-graphql"
import { Song } from "./Song"

@ObjectType()
export class Playlist {
    @Field()
    public _id?: string

    @Field((_type) => String)
    @prop()
    public name?: string

    @Field((_type) => String)
    @prop()
    public cover?: string

    @Field((_type) => [Song])
    @prop({ autopopulate: true, ref: Song })
    public songs?: Ref<Song>[]
}

@InputType()
export class PlaylistInput {
    @Field((_type) => String)
    @prop()
    public name?: string

    @Field((_type) => String)
    @prop()
    public coverSource?: string

    @Field((_type) => [String])
    @prop()
    public songs?: ObjectId[]
}

@InputType()
export class PlaylistSongsInput {
    @Field((_type) => String)
    @prop()
    public playlistId?: ObjectId

    @Field((_type) => [String])
    @prop()
    public songs?: ObjectId[]
}

export const PlaylistModel = getModelForClass(Playlist, {
    schemaOptions: { collection: "playlists" },
})
