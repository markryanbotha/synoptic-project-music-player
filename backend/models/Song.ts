import { prop, getModelForClass, plugin } from "@typegoose/typegoose"
import { Field, ObjectType, InputType } from "type-graphql"
import mongooseAutoPopulate from "mongoose-autopopulate"
@ObjectType()
@plugin(mongooseAutoPopulate as any)
export class Song {
    @Field()
    public _id?: string

    @Field((_type) => String)
    @prop()
    public title?: string

    @Field((_type) => String)
    @prop()
    public audio?: string

    @Field((_type) => String)
    @prop()
    public image?: string

    @Field((_type) => String)
    @prop()
    public artist?: string

    @Field((_type) => String)
    @prop()
    public album?: string
}

@InputType()
export class SongInput {
    @Field((_type) => String)
    @prop()
    public title?: string

    @Field((_type) => String)
    @prop()
    public audioSource?: string

    @Field((_type) => String)
    @prop()
    public imageSource?: string

    @Field((_type) => String)
    @prop()
    public artist?: string

    @Field((_type) => String)
    @prop()
    public album?: string
}

export const SongModel = getModelForClass(Song, {
    schemaOptions: { collection: "songs" },
})
