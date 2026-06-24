import { Calendar, Play } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { VideoItem } from "@/features/video/types/video.types";

type Props = {
    video: VideoItem;
    onPress: () => void;
};

export function VideoCard({ video, onPress }: Props) {
    const date = new Date(video.createdAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const previewImage = video.thumbnailUri
        ? { uri: video.thumbnailUri }
        : require("@/assets/images/video-placeholder.png");
    console.log(video)
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            className="mb-4 flex-row rounded-3xl border border-border bg-card p-3"
        >
            <View className="h-32 w-36 overflow-hidden rounded-2xl bg-slate-200">
                <Image
                    source={previewImage}
                    className="h-full w-full"
                    resizeMode="cover"
                />

                <View className="absolute inset-0 items-center justify-center">
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-black/55">
                        <Play size={22} color="#FFFFFF" fill="#FFFFFF" />
                    </View>
                </View>
                <View className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-1">
                    <Text className="text-[10px] font-bold text-white">
                        {video.duration}s
                    </Text>
                </View>
            </View>

            <View className="ml-4 flex-1 justify-between py-1">
                <View>
                    <Text numberOfLines={1} className="text-lg font-extrabold text-textPrimary">
                        {video.name}
                    </Text>

                    <Text numberOfLines={2} className="mt-1 text-sm leading-5 text-textSecondary">
                        {video.description}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Calendar size={14} color="#64748B" />

                        <Text className="ml-1.5 text-xs font-medium text-textSecondary">
                            {date}
                        </Text>
                    </View>

                    {/* Süre bilgisi video thumbanile koyuldu */}
                    {/* <View className="rounded-full bg-primary/10 px-3 py-1">
                        <Text className="text-xs font-extrabold text-primary">
                            {video.duration}s
                        </Text>
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>
    );
}