import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, FontSize, Spacing, rs } from '../config';

interface LoadingProps {
  /** Hiển thị fullscreen hay inline */
  fullScreen?: boolean;
  message?: string;
  color?: string;
  size?: 'small' | 'large';
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  message,
  color = Colors.primary,
  size = 'large',
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size={size} color={color} />
        {message && (
          <Text allowFontScaling={false} style={styles.message}>
            {message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text allowFontScaling={false} style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.base,
  },
  inline: {
    paddingVertical: Spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  message: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    marginTop: rs(8),
  },
});

export default Loading;
