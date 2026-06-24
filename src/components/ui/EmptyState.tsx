import { Video } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "./AppText";

export function EmptyState() {
    return (
        <View className="flex-1 items-center justify-center px-8">
            <View className="w-24 h-24 rounded-full bg-card border border-border items-center justify-center mb-6">
                <Video
                    size={40}
                    color="#6366F1"
                />
            </View>

            <AppText variant="title">
                Video not fount
            </AppText>

            <AppText
                variant="caption"
                className="text-center mt-3"
            >
                Please add your videos...
            </AppText>
        </View>
    );
}