import { PrimaryButton } from "@/components/PrimaryButton";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { VideoCard } from "@/components/video/VideoCard";
import { useVideoStore } from "@/features/video/store/video.store";

import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const videos = useVideoStore((state) => state.videos);

  return (
    <AppScreen className="pt-8">
      <View className="flex-row items-start justify-between">
        <View>
          <AppText variant="heading">
            My Video <Text className="text-primary">Diary</Text>
          </AppText>
        </View>

        {/*  Sıralama butonu .
        <TouchableOpacity>

        </TouchableOpacity> */}
      </View>

      <View className="mt-4 flex-1">
        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
            renderItem={({ item }) => (
              <VideoCard
                video={item}
                onPress={() => router.push(`/video/${item.id}`)}
              />
            )}
          />
        )}
      </View>

      <PrimaryButton
        text="Add New Video"
        icon={<Plus size={20} color="#FFFFFF" />}
        onPress={() => router.push("/modal/crop")}
      />
    </AppScreen>
  );
}