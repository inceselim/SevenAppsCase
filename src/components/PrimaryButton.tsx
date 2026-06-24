import { ReactElement } from "react";
import { Text, TouchableOpacity } from "react-native";

type PrimaryButtonProps = {
    onPress: () => void;
    text: string;
    icon?: ReactElement;
    className?: string;
};

export function PrimaryButton({
    onPress,
    text,
    icon,
    className = "",
}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            className={`h-14 w-full flex-row items-center justify-center rounded-2xl bg-primary ${className}`}
        >
            {icon}
            <Text className="ml-2 font-semibold text-white">
                {text}
            </Text>
        </TouchableOpacity>
    );
}
