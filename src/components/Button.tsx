import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing, Shadows, rs } from '../config';

// =============================================
// TYPES
// =============================================
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

// =============================================
// COMPONENT
// =============================================
const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  containerStyle,
  labelStyle,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        containerStyle,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text
            allowFontScaling={false}
            style={[styles.label, styles[`label_${variant}`], styles[`labelSize_${size}`], labelStyle]}
          >
            {label}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: rs(8),
    borderRadius: Radius.lg,
  },
  // === Variants ===
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    ...Shadows.md,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  danger: {
    backgroundColor: Colors.error,
    ...Shadows.md,
  },
  // === Sizes ===
  size_sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    minHeight: rs(36),
  },
  size_md: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    minHeight: rs(48),
  },
  size_lg: {
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.md,
    minHeight: rs(56),
  },
  // === Label ===
  label: {
    fontWeight: '600',
  },
  label_primary: { color: Colors.white },
  label_secondary: { color: Colors.white },
  label_outline: { color: Colors.primary },
  label_ghost: { color: Colors.textPrimary },
  label_danger: { color: Colors.white },
  labelSize_sm: { fontSize: FontSize.sm },
  labelSize_md: { fontSize: FontSize.base },
  labelSize_lg: { fontSize: FontSize.md },
  // === States ===
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
});

export default Button;
