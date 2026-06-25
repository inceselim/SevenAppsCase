import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { VideoItem } from "../types/video.types";

type VideoStore = {
    videos: VideoItem[];
    addVideo: (video: VideoItem) => void;
    updateVideo: (id: string, data: Partial<VideoItem>) => void;
    deleteVideo: (id: string) => void;
    clearVideos: () => void;
};

export const useVideoStore = create<VideoStore>()(
    persist(
        (set) => ({
            videos: [],

            addVideo: (video) =>
                set((state) => ({
                    videos: [video, ...state.videos],
                })),

            updateVideo: (id, data) =>
                set((state) => ({
                    videos: state.videos.map((video) =>
                        video.id === id ? { ...video, ...data } : video
                    ),
                })),

            deleteVideo: (id) =>
                set((state) => ({
                    videos: state.videos.filter((video) => video.id !== id),
                })),

            clearVideos: () =>
                set({
                    videos: [],
                }),
        }),
        {
            name: "video-diary-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);