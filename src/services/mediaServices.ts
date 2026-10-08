import axios from "axios";
import type {OMDBMedia} from "../model/OMDBMedia.ts";

// export async function getAllMediasOfFactoryHall(factoryHallId: string) {
//     const {data: medias} = await axios.get<Media[]>(`/Medias?hallId=${factoryHallId}`);
//     return medias;
// }

export const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;

export async function getMediaByTitle(title: string) {
    const {data: media} = await axios.get<OMDBMedia>(`https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}`);
    return media;
}