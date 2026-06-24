import type { ReactNode } from "react";
import { View } from "react-native";

type Props = {
    children: ReactNode;
    className?: string;
};

export function AppCard({
    children,
    className = "",
}: Props) {
    return (
        <View
            className={`
        bg-card
        rounded-3xl
        p-4
        border
        border-border
        ${className}
      `}
        >
            {children}
        </View>
    );
}