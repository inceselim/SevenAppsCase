export type VideoItem = {
    id: string;
    name: string;
    description: string;
    originalUri: string;
    croppedUri: string;
    startTime: number;
    endTime: number;
    duration: number;
    createdAt: string;
    thumbnailUri?: string;
};