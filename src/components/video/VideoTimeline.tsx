import * as VideoThumbnails from "expo-video-thumbnails";
import { useEffect, useMemo, useState } from "react";
import { Image, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

type Props = {
    videoUri: string;
    duration: number;
    startTime: number;
    onChangeStartTime: (value: number) => void;
};

const CLIP_DURATION = 5;
const FRAME_COUNT = 8;
const STRIP_HEIGHT = 76;

export function VideoTimeline({
    videoUri,
    duration,
    startTime,
    onChangeStartTime,
}: Props) {
    const [frames, setFrames] = useState<string[]>([]);
    const [stripWidth, setStripWidth] = useState(0);

    const translateX = useSharedValue(0);
    const startX = useSharedValue(0);

    const maxStartTime = Math.max(duration - CLIP_DURATION, 0);

    const selectionWidth = useMemo(() => {
        if (duration <= 0 || stripWidth <= 0) return 0;
        return (CLIP_DURATION / duration) * stripWidth;
    }, [duration, stripWidth]);

    const maxTranslateX = Math.max(stripWidth - selectionWidth, 0);

    useEffect(() => {
        if (duration <= 0 || stripWidth <= 0) return;

        translateX.value = (startTime / duration) * stripWidth;
    }, [startTime, duration, stripWidth, translateX]);

    useEffect(() => {
        let mounted = true;

        async function generateFrames() {
            if (!videoUri || duration <= 0) return;

            const generated: string[] = [];
            const interval = duration / FRAME_COUNT;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
                    time: Math.floor(interval * i * 1000),
                });

                generated.push(uri);
            }

            if (mounted) {
                setFrames(generated);
            }
        }

        generateFrames();

        return () => {
            mounted = false;
        };
    }, [videoUri, duration]);

    const updateStartTime = (x: number) => {
        if (stripWidth <= 0 || duration <= 0) return;

        const rawStart = (x / stripWidth) * duration;
        const nextStart = Math.max(0, Math.min(rawStart, maxStartTime));

        onChangeStartTime(Math.round(nextStart));
    };

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            startX.value = translateX.value;
        })
        .onUpdate((event) => {
            const nextX = Math.max(
                0,
                Math.min(startX.value + event.translationX, maxTranslateX)
            );

            translateX.value = nextX;
            runOnJS(updateStartTime)(nextX);
        });

    const selectionStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            width: selectionWidth,
            height: STRIP_HEIGHT,
        };
    });

    return (
        <View className="mt-6">
            <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-sm font-extrabold text-textPrimary">
                    Timeline
                </Text>

                <Text className="text-xs font-bold text-primary">
                    {startTime}s - {startTime + CLIP_DURATION}s
                </Text>
            </View>

            <View
                className="overflow-hidden rounded-2xl bg-black"
                style={{ height: STRIP_HEIGHT }}
                onLayout={(event) => setStripWidth(event.nativeEvent.layout.width)}
            >
                <View className="h-full flex-row">
                    {frames.length > 0 ? (
                        frames.map((uri, index) => (
                            <Image
                                key={`${uri}-${index}`}
                                source={{ uri }}
                                style={{
                                    width: stripWidth > 0 ? stripWidth / FRAME_COUNT : 0,
                                    height: STRIP_HEIGHT,
                                }}
                                resizeMode="cover"
                            />
                        ))
                    ) : (
                        <View className="flex-1 items-center justify-center bg-slate-800">
                            <Text className="text-xs font-semibold text-white/70">
                                Loading timeline...
                            </Text>
                        </View>
                    )}
                </View>

                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        className="absolute left-0 top-0 rounded-2xl border-4 border-primary bg-primary/20"
                        style={selectionStyle}
                    >
                        <View className="absolute left-0 top-0 h-full w-3 rounded-l-xl bg-primary" />
                        <View className="absolute right-0 top-0 h-full w-3 rounded-r-xl bg-primary" />
                    </Animated.View>
                </GestureDetector>
            </View>

            <Text className="mt-3 text-xs font-semibold text-textSecondary">
                You can change start position video
            </Text>
        </View>
    );
}