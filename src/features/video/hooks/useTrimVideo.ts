import { useMutation } from "@tanstack/react-query";

import { trimVideoApi } from "./trim-video.api";

export function useTrimVideo() {
    return useMutation({
        mutationFn: trimVideoApi,
    });
}