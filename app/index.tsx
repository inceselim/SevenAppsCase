import { PrimaryButton } from "@/components/PrimaryButton";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { VideoCard } from "@/components/video/VideoCard";
import { useVideoStore } from "@/features/video/store/video.store";

import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const videos = useVideoStore((state) => state.videos);
  const [search, setSearch] = useState("");

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return videos;
    }

    return videos.filter((video) => {
      return (
        video.name.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );
    });
  }, [videos, search]);

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

      <View className="mt-6 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4">
        <Text className="mr-2 text-lg">
          🔍
        </Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search videos..."
          placeholderTextColor="#94A3B8"
          className="flex-1 text-base text-textPrimary"
        />
      </View>

      <View className="mt-4 flex-1">
        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={filteredVideos}
            ListEmptyComponent={() => (
              <View className="mt-10 items-center justify-center">
                <Text className="text-sm font-semibold text-textSecondary">
                  No videos found.
                </Text>
              </View>
            )}
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