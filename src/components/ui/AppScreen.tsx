import type { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children: ReactNode;
    className?: string;
};

export function AppScreen({ children, className = "" }: Props) {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className={`flex-1 px-5 ${className}`}>
                {children}
            </View>
        </SafeAreaView>
    );
}