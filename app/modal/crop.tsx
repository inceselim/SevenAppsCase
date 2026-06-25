import { HeaderMenu } from "@/components/HeaderMenu";
import { PrimaryButton } from "@/components/PrimaryButton";
import { VideoTimeline } from "@/components/video/VideoTimeline";
import { useTrimVideo } from "@/features/video/hooks/useTrimVideo";
import { pickVideo } from "@/features/video/hooks/useVideoPicker";
import { useVideoStore } from "@/features/video/store/video.store";
import { videoMetadataSchema } from "@/features/video/validation/video-metadata.schema";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { Video } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CropModalScreen() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);

    const [videoDuration, setVideoDuration] = useState(60);
    const [startTime, setStartTime] = useState(0);
    const endTime = startTime + 5;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState<{
        name?: string;
        description?: string;
    }>({});

    const addVideo = useVideoStore((state) => state.addVideo);
    const trimVideoMutation = useTrimVideo();

    const player = useVideoPlayer(selectedVideo?.uri ?? "", (player) => {
        player.loop = true;
    });

    const handlePickVideo = async () => {
        const video = await pickVideo();

        if (!video) return;

        setSelectedVideo(video);
        setStartTime(0);

        if (video.duration) {
            setVideoDuration(Math.floor(video.duration / 1000));
        }
    };

    const handleSaveVideo = async () => {
        if (!selectedVideo) return;

        const validation = videoMetadataSchema.safeParse({
            name,
            description,
        });

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;

            setErrors({
                name: fieldErrors.name?.[0],
                description: fieldErrors.description?.[0],
            });

            return;
        }

        try {
            const croppedUri = await trimVideoMutation.mutateAsync({
                uri: selectedVideo.uri,
                start: startTime,
                end: endTime,
            });

            addVideo({
                id: Date.now().toString(),
                name: validation.data.name,
                description: validation.data.description,
                originalUri: selectedVideo.uri,
                croppedUri,
                thumbnailUri: selectedVideo.thumbnailUri,
                startTime,
                endTime,
                duration: 5,
                createdAt: new Date().toISOString(),
            });

            router.back();
        } catch {
            Alert.alert("Trim Failed", "Video could not be cropped.");
        }
    };

    const handleBottomButton = () => {
        if (step === 1) {
            if (selectedVideo) {
                setStep(2);
            } else {
                handlePickVideo();
            }

            return;
        }

        if (step === 2) {
            setStep(3);
            return;
        }

        handleSaveVideo();
    };

    const validateField = (
        field: "name" | "description",
        value: string
    ) => {
        const result = videoMetadataSchema.safeParse({
            name: field === "name" ? value : name,
            description: field === "description" ? value : description,
        });

        if (result.success) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
            return;
        }

        const fieldErrors = result.error.flatten().fieldErrors;

        setErrors((prev) => ({
            ...prev,
            [field]: fieldErrors[field]?.[0],
        }));
    };

    const bottomButtonText =
        trimVideoMutation.isPending
            ? "Saving..."
            : step === 1
                ? selectedVideo
                    ? "Continue"
                    : "Choose Video"
                : step === 2
                    ? "Continue"
                    : "Save Video";

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-5">
                <HeaderMenu title="Crop Video" />
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 24,
                        flexGrow: 1,
                    }}
                >
                    {step === 1 && (
                        <View className="flex-1 items-center justify-center">
                            <View className="h-28 w-28 items-center justify-center rounded-full bg-primary/10">
                                <Video size={48} color="#6366F1" />
                            </View>

                            <Text className="mt-8 text-2xl font-extrabold text-textPrimary">
                                Select a Video
                            </Text>

                            <Text className="mt-4 text-sm font-bold text-primary">
                                Step 1 / 3
                            </Text>

                            <Text className="mt-3 text-center text-base leading-6 text-textSecondary">
                                Choose a video from your gallery
                            </Text>

                            {selectedVideo && (
                                <View className="mt-8 w-full rounded-2xl border border-border bg-card p-4">
                                    <Text className="text-sm font-bold text-textPrimary">
                                        Selected Video
                                    </Text>

                                    <Text
                                        numberOfLines={1}
                                        className="mt-2 text-sm text-textSecondary"
                                    >
                                        {selectedVideo.fileName || selectedVideo.uri}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    {step === 2 && (
                        <View className="flex-1 pt-8">
                            <Text className="text-2xl font-extrabold text-textPrimary">
                                Choose 5 Seconds
                            </Text>

                            <Text className="mt-4 text-sm font-bold text-primary">
                                Step 2 / 3
                            </Text>

                            <Text className="mt-3 text-base leading-6 text-textSecondary">
                                Select the start point. The app will automatically create a
                                5-second segment.
                            </Text>

                            <View className="mt-8 h-64 overflow-hidden rounded-3xl bg-black">
                                {selectedVideo?.uri ? (
                                    <VideoView
                                        player={player}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        nativeControls
                                    />
                                ) : (
                                    <View className="flex-1 items-center justify-center">
                                        <Text className="text-white">No video selected</Text>
                                    </View>
                                )}
                            </View>

                            {selectedVideo?.uri && (
                                <>
                                    <VideoTimeline
                                        videoUri={selectedVideo.uri}
                                        duration={videoDuration}
                                        startTime={startTime}
                                        onChangeStartTime={setStartTime}
                                    />

                                    <View className="mt-6 rounded-3xl border border-border bg-card p-5">
                                        <Text className="text-sm font-bold text-textPrimary">
                                            Selected Range
                                        </Text>

                                        <Text className="mt-2 text-3xl font-extrabold text-primary">
                                            {startTime}s - {endTime}s
                                        </Text>

                                        <Text className="mt-2 text-sm text-textSecondary">
                                            Duration: 5 seconds
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    )}

                    {step === 3 && (
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <ScrollView className="flex-1 pt-8">
                                <Text className="text-2xl font-extrabold text-textPrimary">
                                    Add Details
                                </Text>

                                <Text className="mt-4 text-sm font-bold text-primary">
                                    Step 3 / 3
                                </Text>

                                <Text className="mt-3 text-base leading-6 text-textSecondary">
                                    Add a name and description for your cropped video diary.
                                </Text>

                                <View className="mt-8">
                                    <Text className="mb-2 text-sm font-bold text-textPrimary">
                                        Name
                                    </Text>

                                    <TextInput
                                        value={name}
                                        onChangeText={(value) => {
                                            setName(value);
                                            validateField("name", value);
                                        }}
                                        placeholder="Video name"
                                        className="h-14 rounded-2xl border border-border bg-card px-4 text-textPrimary"
                                    />
                                    {errors.name && (
                                        <Text className="mt-2 text-xs font-semibold text-red-500">
                                            {errors.name}
                                        </Text>
                                    )}
                                </View>

                                <View className="mt-5">
                                    <Text className="mb-2 text-sm font-bold text-textPrimary">
                                        Description
                                    </Text>

                                    <TextInput
                                        value={description}
                                        onChangeText={(value) => {
                                            setDescription(value);
                                            validateField("description", value);
                                        }}
                                        placeholder="Write a short description"
                                        multiline
                                        textAlignVertical="top"
                                        className="h-40 rounded-2xl border border-border bg-card px-4 py-4 text-textPrimary"
                                    />
                                    {errors.description && (
                                        <Text className="mt-2 text-xs font-semibold text-red-500">
                                            {errors.description}
                                        </Text>
                                    )}
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    )}
                </ScrollView>

                <View className="pb-8">
                    <PrimaryButton
                        text={bottomButtonText}
                        icon={<Video size={18} color="#FFFFFF" />}
                        onPress={handleBottomButton}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}