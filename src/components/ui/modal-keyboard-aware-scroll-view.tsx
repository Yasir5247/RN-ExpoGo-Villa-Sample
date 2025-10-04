/**
 * Expo Go compatible keyboard-aware scroll view for modals.
 * Uses React Native's built-in KeyboardAvoidingView with BottomSheet.
 */
import {
  type BottomSheetScrollViewMethods,
  createBottomSheetScrollableComponent,
  SCROLLABLE_TYPE,
} from '@gorhom/bottom-sheet';
import { type BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/src/components/bottomSheetScrollable/types';
import { memo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Reanimated from 'react-native-reanimated';

const AnimatedScrollView = Reanimated.createAnimatedComponent(ScrollView);

const BottomSheetScrollViewComponent = createBottomSheetScrollableComponent<
  BottomSheetScrollViewMethods,
  BottomSheetScrollViewProps
>(SCROLLABLE_TYPE.SCROLLVIEW, AnimatedScrollView);

const BottomSheetKeyboardAwareScrollView = memo(
  (props: BottomSheetScrollViewProps) => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <BottomSheetScrollViewComponent {...props} />
    </KeyboardAvoidingView>
  )
);

BottomSheetKeyboardAwareScrollView.displayName =
  'BottomSheetKeyboardAwareScrollView';

export default BottomSheetKeyboardAwareScrollView;
