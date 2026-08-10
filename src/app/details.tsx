import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

/**
 * DETAILS SCREEN — UI with NativeWind
 * Same kinds of layouts as Home, but styled with Tailwind className.
 */
export default function DetailsScreen() {
  return (
    <ScrollView className="bg-zinc-100" contentContainerClassName="gap-3 p-5 pb-10">
      <Text className="text-2xl font-extrabold text-zinc-900">NativeWind Layout</Text>
      <Text className="mb-2 text-sm leading-5 text-zinc-600">
        Designed with Tailwind className. No StyleSheet on this screen.
      </Text>

      {/* Row: space between */}
      <Text className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
        flex-row + justify-between
      </Text>
      <View className="flex-row items-center justify-between">
        <View className="h-16 w-16 items-center justify-center rounded-xl bg-blue-600">
          <Text className="text-sm font-bold text-white">A</Text>
        </View>
        <View className="h-16 w-16 items-center justify-center rounded-xl bg-green-600">
          <Text className="text-sm font-bold text-white">B</Text>
        </View>
        <View className="h-16 w-16 items-center justify-center rounded-xl bg-orange-600">
          <Text className="text-sm font-bold text-white">C</Text>
        </View>
      </View>

      {/* Flex grow ratios */}
      <Text className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
        flex-1 / flex-2 / flex-1
      </Text>
      <View className="flex-row gap-2">
        <View className="h-14 flex-1 items-center justify-center rounded-lg bg-blue-600">
          <Text className="text-sm font-bold text-white">flex-1</Text>
        </View>
        <View className="h-14 flex-[2] items-center justify-center rounded-lg bg-green-600">
          <Text className="text-sm font-bold text-white">flex-2</Text>
        </View>
        <View className="h-14 flex-1 items-center justify-center rounded-lg bg-orange-600">
          <Text className="text-sm font-bold text-white">flex-1</Text>
        </View>
      </View>

      {/* Centered card */}
      <Text className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
        justify-center + items-center
      </Text>
      <View className="h-36 items-center justify-center rounded-xl bg-zinc-300">
        <View className="w-4/5 gap-1.5 rounded-xl bg-white p-4">
          <Text className="text-base font-bold text-zinc-900">Centered Card</Text>
          <Text className="text-sm leading-[18px] text-zinc-600">
            Parent uses items-center and justify-center with Tailwind classes
          </Text>
        </View>
      </View>

      {/* Column with gap */}
      <Text className="mt-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
        flex-col + gap
      </Text>
      <View className="flex-col gap-2">
        <View className="rounded-[10px] bg-blue-100 p-3.5">
          <Text>Item 1</Text>
        </View>
        <View className="rounded-[10px] bg-green-100 p-3.5">
          <Text>Item 2</Text>
        </View>
        <View className="rounded-[10px] bg-orange-100 p-3.5">
          <Text>Item 3</Text>
        </View>
      </View>

      <Link href="/" className="mt-4 text-base font-semibold text-blue-500">
        ← Back to Home (Flex)
      </Link>
    </ScrollView>
  );
}
