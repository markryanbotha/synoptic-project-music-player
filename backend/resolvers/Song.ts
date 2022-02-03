import { Resolver, Mutation, Query, Arg } from "type-graphql"
import { Song, SongModel, SongInput } from "../models/Song"
import { uploadSong } from "../utility/upload"
import { deleteSong } from "../utility/delete"

@Resolver(Song)
export class SongResolver {
    @Query(() => [Song])
    async getAllSongs() {
        return await SongModel.find()
    }

    @Mutation(() => Song)
    async createSong(@Arg("songData") songData: SongInput) {
        const { title, audioSource, imageSource, artist, album } = songData

        if (!audioSource) {
            throw new Error("No audio file was attatched")
        }

        if (!imageSource) {
            throw new Error("No cover was attatched")
        }

        const { audio, image } = await uploadSong(audioSource, imageSource)

        const dbSong = new SongModel({
            title,
            audio,
            image,
            artist,
            album,
        })

        return await dbSong.save()
    }

    @Mutation(() => Song)
    async deleteSong(@Arg("id") id: string) {
        const songToDelete = await SongModel.findById(id)
        if (songToDelete) {
            await deleteSong(songToDelete.audio || "", songToDelete.image || "")
        } else {
            throw new Error("Song Does not exist")
        }
        await SongModel.findByIdAndDelete(id)
        return songToDelete
    }
}
