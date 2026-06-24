import { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

type SecondaryButtonProps = {
    onPress: () => void;
    text: string;
    icon?: ReactElement;
    className?: string;
};

export function SecondaryButton({
    onPress,
    text,
    icon,
    className = "",
}: SecondaryButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            className={`h-14 w-full flex-row items-center justify-center rounded-2xl bg-card border border-purple-700 ${className}`}
        >
            {icon}
            <Text className="ml-2 font-semibold text-primary">
                {text}
            </Text>
        </TouchableOpacity>
    );
}
