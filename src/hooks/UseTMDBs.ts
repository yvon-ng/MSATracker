import { useQuery } from "@tanstack/react-query";
import {searchMulti} from "../services/tmdbServices.ts";

export function useMultiSearch(query: string) {
    return useQuery({
        queryKey: ["keyword", "search", query],
        queryFn: () => searchMulti(query),
        enabled: query.trim().length > 0,
    });
}