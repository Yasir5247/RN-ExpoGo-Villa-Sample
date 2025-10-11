import React from 'react';
import { FocusAwareStatusBar, ScrollView, Text, View } from '@/components/ui';

export default function Profile() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16">
          <Text className="text-xl font-bold">Profile Tab</Text>
          <Text className="mt-4 text-base">This is a test profile tab.</Text>
        </View>
      </ScrollView>
    </>
  );
}

