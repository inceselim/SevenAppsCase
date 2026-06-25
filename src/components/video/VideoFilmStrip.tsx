import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useMemo, useState } from "react";
import { Image, Text, View } from "react-native";

type Props = {
    videoUri: string;
    duration: number;
    startTime: number;
};

export function VideoFilmStrip({
    videoUri,
    duration,
    startTime,
}: Props) {
    const [frames, setFrames] = useState<string[]>([]);
    const [stripWidth, setStripWidth] = useState(0);

    const selectionLeft = useMemo(() => {
        if (duration <= 0 || stripWidth <= 0) return 0;

        return (startTime / duration) * stripWidth;
    }, [startTime, duration, stripWidth]);

    const selectionWidth = useMemo(() => {
        if (duration <= 0 || stripWidth <= 0) return 0;

        return (5 / duration) * stripWidth;
    }, [duration, stripWidth]);

    useEffect(() => {
        const generateFrames = async () => {
            if (!videoUri || duration <= 0) return;

            const frameCount = 8;
            const interval = duration / frameCount;

            const result: string[] = [];

            for (let i = 0; i < frameCount; i++) {
                const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
                    time: Math.floor(interval * i * 1000),
                });

                result.push(uri);
            }

            setFrames(result);
        };

        generateFrames();
    }, [videoUri, duration]);

    return (
        <View className="mt-6">
            <Text className="mb-3 text-sm font-bold text-textPrimary">
                Timeline
            </Text>

            <View className="h-16 overflow-hidden rounded-2xl">
                <View className="h-full flex-row">
                    {frames.map((uri, index) => (
                        <Image
                            key={index}
                            source={{ uri }}
                            className="h-16 flex-1"
                            resizeMode="cover"
                        />
                    ))}
                </View>

                <View
                    pointerEvents="none"
                    className="absolute top-0 h-full rounded-2xl border-4 border-primary bg-primary/20"
                    style={{
                        left: selectionLeft,
                        width: selectionWidth,
                    }}
                />
            </View>

            <View className="mt-3 flex-row justify-between">
                <Text className="text-xs font-semibold text-textSecondary">
                    Start: {startTime}s
                </Text>

                <Text className="text-xs font-semibold text-textSecondary">
                    End: {startTime + 5}s
                </Text>
            </View>
        </View>
    );
}