import { HeaderMenu } from "@/components/HeaderMenu";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { useVideoStore } from "@/features/video/store/video.store";
import { router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { useVideoPlayer, VideoView } from "expo-video";
import { Pencil, Share2, Trash2 } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const video = useVideoStore((state: any) =>
        state.videos.find((item: any) => item.id === id)
    );
    const videoUri = video.croppedUri || video.originalUri;

    const player = useVideoPlayer(videoUri, (player) => {
        player.loop = true;
    });
    const deleteVideo = useVideoStore((state: any) => state.deleteVideo);
    const handleDelete = () => {
        Alert.alert(
            "Delete Video",
            "Are you sure you want to delete this video?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteVideo(video.id);
                        router.back();
                    },
                },
            ]
        );
    };

    const handleShare = async () => {
        // video paylasma
        const videoUri = video?.croppedUri || video?.originalUri;

        if (!videoUri) {
            Alert.alert("Error", "Video file not found.");
            return;
        }

        const isAvailable = await Sharing.isAvailableAsync();

        if (!isAvailable) {
            Alert.alert("Error", "Sharing is not available on this device.");
            return;
        }

        await Sharing.shareAsync(videoUri, {
            mimeType: "video/mp4",
            dialogTitle: video.name,
            UTI: "public.movie",
        });
    };

    if (!video) {
        return (
            <View className="flex-1 bg-background items-center justify-center px-5">
                <Text className="text-lg font-bold text-textPrimary">
                    Video Not Found
                </Text>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-5 h-12 px-6 rounded-xl bg-primary items-center justify-center"
                >
                    <Text className="text-white font-semibold">
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background px-5">
            <HeaderMenu
                title="Video Details"
                rightElement={
                    <TouchableOpacity
                        onPress={() => {
                            handleDelete()
                        }}
                        className="h-10 w-10 items-center justify-center rounded-full bg-red-50"
                    >
                        <Trash2
                            size={22}
                            color="#EF4444"
                        />
                    </TouchableOpacity>
                }
            />
            <View className="flex-1">
                <Text className="text-2xl font-bold text-textPrimary">
                    {video.name}
                </Text>

                <View className="mt-6 h-64 overflow-hidden rounded-3xl bg-black">
                    <VideoView
                        player={player}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        nativeControls
                    />
                </View>

                <Text className="text-lg font-bold text-textPrimary mt-6">
                    Description
                </Text>

                <Text className="text-textSecondary mt-2">
                    {video.description}
                </Text>
            </View>

            <View className="pb-8 flex-row gap-3">
                <View className="flex-1">
                    <SecondaryButton
                        text="Edit Video"
                        icon={<Pencil size={18} color="#6366F1" />}
                        onPress={() => router.push(`/video/edit/${video.id}`)}
                    />
                </View>

                <View className="flex-1 ml-2">
                    <PrimaryButton
                        text="Share"
                        icon={<Share2 size={18} color="#fff" />}
                        onPress={() => { handleShare() }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}