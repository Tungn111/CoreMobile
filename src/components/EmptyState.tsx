import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing, rs } from '../config';

// =============================================
// TYPES
// =============================================
interface EmptyStateProps {
  emoji?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

// =============================================
// COMPONENT
// =============================================
const EmptyState: React.FC<EmptyStateProps> = ({
  emoji = '📭',
  title = 'Không có dữ liệu',
  description = 'Chưa có thông tin nào để hiển thị.',
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text allowFontScaling={false} style={styles.title}>
        {title}
      </Text>
      <Text allowFontScaling={false} style={styles.description}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.button}
          onPress={onAction}
        >
          <Text allowFontScaling={false} style={styles.buttonLabel}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
    gap: Spacing.sm,
  },
  emoji: {
    fontSize: rs(56),
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.6,
  },
  button: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.glassBg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonLabel: {
    fontSize: FontSize.base,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default EmptyState;
