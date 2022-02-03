import { Resolver, Mutation, Query, Arg } from "type-graphql"
import {
    Playlist,
    PlaylistModel,
    PlaylistInput,
    PlaylistSongsInput,
} from "../models/Playlist"
import { uploadPhoto } from "../utility/upload"
import { deleteImage } from "../utility/delete"

@Resolver(Playlist)
export class PlaylistResolver {
    @Query(() => [Playlist])
    async getAllPlaylists() {
        return await PlaylistModel.find().populate({ path: "songs" })
    }

    @Query(() => Playlist)
    async getPlaylistByID(@Arg("id") id: string) {
        return await PlaylistModel.findById(id).populate({ path: "songs" })
    }

    @Mutation(() => Playlist)
    async createPlaylist(@Arg("playlistData") playlistData: PlaylistInput) {
        const { name, coverSource, songs } = playlistData

        if (!coverSource) {
            throw new Error("No cover was attatched")
        }

        const cover = await uploadPhoto(coverSource)

        const dbPlaylist = new PlaylistModel({
            name,
            cover,
            songs,
        })

        return await dbPlaylist.save()
    }

    @Mutation(() => Playlist)
    async deletePlaylist(@Arg("id") id: string) {
        const playlistToDelete = await PlaylistModel.findById(id)
        if (playlistToDelete) {
            await deleteImage(playlistToDelete.cover || "")
        } else {
            throw new Error("Playlist Image does not exist")
        }
        await PlaylistModel.deleteOne({ id })
        return playlistToDelete
    }

    @Mutation(() => Playlist)
    async addSongsToPlaylist(
        @Arg("addSongsData") { playlistId, songs }: PlaylistSongsInput,
    ) {
        await PlaylistModel.findOneAndUpdate(
            { _id: playlistId },
            { $addToSet: { songs } },
        )

        return await PlaylistModel.findById(playlistId).populate({
            path: "songs",
        })
    }

    @Mutation(() => Playlist)
    async removeSongsFromPlaylist(
        @Arg("removeSongsData") { playlistId, songs }: PlaylistSongsInput,
    ) {
        await PlaylistModel.findOneAndUpdate(
            { _id: playlistId },
            { $pull: { songs: { $in: songs } } },
        )

        return await PlaylistModel.findById(playlistId).populate({
            path: "songs",
        })
    }
}
