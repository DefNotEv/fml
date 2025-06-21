import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { View, StyleSheet } from 'react-native';

export default function TikTokTabBarBackground() {
  return (
    <BlurView
      tint="light"
      intensity={50}
      style={StyleSheet.absoluteFill}
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
    </BlurView>
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
