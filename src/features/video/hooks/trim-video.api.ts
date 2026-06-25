import { trimVideo } from "expo-trim-video";

type TrimVideoParams = {
    uri: string;
    start: number;
    end: number;
};

export async function trimVideoApi({
    uri,
    start,
    end,
}: TrimVideoParams): Promise<string> {
    if (!uri) {
        throw new Error("Video URI is required.");
    }

    if (start < 0) {
        throw new Error("Start time cannot be negative.");
    }

    if (end <= start) {
        throw new Error("End time must be greater than start time.");
    }

    const result = await trimVideo({
        uri,
        start,
        end,
    });

    if (!result?.uri) {
        throw new Error("Trimmed video URI was not returned.");
    }

    return result.uri;
}