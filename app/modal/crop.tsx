import { pickVideo } from "@/features/video/hooks/useVideoPicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CropModalScreen() {
    const [video, setVideo] = useState<any>(null);

    const handleSelectVideo = async () => {
        const selected = await pickVideo();

        if (selected) {
            setVideo(selected);
        }
    };

    return (
        <View className="flex-1 bg-background px-5 pt-16">
            <Text className="text-3xl font-bold">
                Select Video
            </Text>

            {!video ? (
                <TouchableOpacity
                    onPress={handleSelectVideo}
                    className="mt-10 h-16 rounded-2xl bg-primary items-center justify-center"
                >
                    <Text className="text-white font-semibold">
                        Choose Video
                    </Text>
                </TouchableOpacity>
            ) : (
                <View className="mt-8">
                    <Text className="font-bold text-lg">
                        Video Selected
                    </Text>

                    <Text className="mt-2 text-textSecondary">
                        {video.fileName ?? video.uri}
                    </Text>

                    <TouchableOpacity
                        className="mt-8 h-14 rounded-2xl bg-primary items-center justify-center"
                    >
                        <Text className="text-white font-semibold">
                            Next Step
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}