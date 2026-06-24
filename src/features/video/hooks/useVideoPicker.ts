import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";

// Galeriden video sec, 1. snde thumbnail üret
export async function pickVideo() {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["videos"],
        quality: 1,
    });

    if (result.canceled) {
        return null;
    }

    const selectedVideo = result.assets[0];

    const { uri: thumbnailUri } =
        await VideoThumbnails.getThumbnailAsync(
            selectedVideo.uri,
            {
                time: 1000,
            }
        );

    return {
        ...selectedVideo,
        thumbnailUri,
    };
}