import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderMenuProps = {
    title: string;
    rightElement?: ReactNode;
};

export function HeaderMenu({
    title,
    rightElement,
}: HeaderMenuProps) {
    return (
        <View className="h-14 flex-row items-center">
            <TouchableOpacity
                onPress={() => router.back()}
                className="h-10 w-10 items-center justify-center rounded-full bg-card border border-border"
            >
                <ChevronLeft size={22} color="#0F172A" />
            </TouchableOpacity>

            <Text className="flex-1 text-center text-lg font-bold text-textPrimary">
                {title}
            </Text>

            <View className="h-10 w-10 items-center justify-center">
                {rightElement}
            </View>
        </View>
    );
}