import { HeaderMenu } from "@/components/HeaderMenu";
import { useVideoStore } from "@/features/video/store/video.store";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditVideoScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const video = useVideoStore((state) =>
        state.videos.find((item) => item.id === id)
    );

    const updateVideo = useVideoStore((state) => state.updateVideo);

    const [name, setName] = useState(video?.name ?? "");
    const [description, setDescription] = useState(video?.description ?? "");

    const handleSave = () => {
        if (!video) return;

        updateVideo(video.id, {
            name,
            description,
        });

        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background px-5">
            <HeaderMenu title="Edit Information" />
            <View className="flex-1">
                {/* <Text className="text-2xl font-bold text-textPrimary">
                    Edit Information
                </Text> */}

                <Text className="text-sm text-textSecondary mt-6 mb-2">
                    Name
                </Text>

                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Video name"
                    className="h-14 rounded-2xl border border-border bg-white px-4 text-textPrimary"
                />

                <Text className="text-sm text-textSecondary mt-5 mb-2">
                    Description
                </Text>

                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Video description"
                    multiline
                    textAlignVertical="top"
                    className="h-40 rounded-2xl border border-border bg-white px-4 py-4 text-textPrimary"
                />
            </View>

            <TouchableOpacity
                onPress={handleSave}
                className="mt-8 h-14 rounded-2xl bg-primary items-center justify-center"
            >
                <Text className="text-white font-semibold">
                    Save
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}