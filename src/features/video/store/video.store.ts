import { create } from "zustand";
import { VideoItem } from "../types/video.types";

type VideoStore = {
    videos: VideoItem[];

    addVideo: (video: VideoItem) => void;
    updateVideo: (id: string, data: Partial<VideoItem>) => void;
    deleteVideo: (id: string) => void;
};

const MOCK_VIDEOS: VideoItem[] = [
    {
        id: "1",
        name: "Dağ Manzarası",
        description: "Bugün harika bir manzara gördüm.",
        originalUri: "",
        croppedUri: "",
        startTime: 8,
        endTime: 13,
        duration: 5,
        createdAt: new Date().toISOString(),
        thumbnailUri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
        id: "2",
        name: "Deniz Dalgaları",
        description: "Denizin sesi çok huzurluydu.",
        originalUri: "",
        croppedUri: "",
        startTime: 2,
        endTime: 7,
        duration: 5,
        createdAt: new Date().toISOString(),
        thumbnailUri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
];

export const useVideoStore = create<VideoStore>((set) => ({
    videos: MOCK_VIDEOS,

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
}));