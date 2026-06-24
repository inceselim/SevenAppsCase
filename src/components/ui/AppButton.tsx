import type { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    variant?: "primary" | "secondary" | "danger";
    className?: string;
};

export function AppButton({
    title,
    onPress,
    disabled = false,
    loading = false,
    icon,
    variant = "primary",
    className = "",
}: Props) {
    const variantClass = {
        primary: "bg-primary",
        secondary: "bg-card border border-border",
        danger: "bg-red-50 border border-red-300",
    }[variant];

    const textClass = {
        primary: "text-white",
        secondary: "text-textPrimary",
        danger: "text-red-500",
    }[variant];

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.85}
            className={`
        h-14 rounded-2xl items-center justify-center flex-row
        ${variantClass}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
        >
            {loading ? (
                <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : "#6366F1"} />
            ) : (
                <>
                    {icon}
                    <Text className={`font-bold ${textClass} ${icon ? "ml-2" : ""}`}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}