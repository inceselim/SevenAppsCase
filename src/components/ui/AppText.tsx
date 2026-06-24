import type { ReactNode } from "react";
import { Text } from "react-native";

type Variant =
    | "title"
    | "heading"
    | "body"
    | "caption";

type Props = {
    children: ReactNode;
    variant?: Variant;
    className?: string;
};

export function AppText({
    children,
    variant = "body",
    className = "",
}: Props) {
    const variants = {
        heading: "text-3xl font-extrabold text-textPrimary",
        title: "text-xl font-bold text-textPrimary",
        body: "text-base text-textPrimary",
        caption: "text-sm text-textSecondary",
    };

    return (
        <Text
            className={`
        ${variants[variant]}
        ${className}
      `}
        >
            {children}
        </Text>
    );
}