import React, { forwardRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing, rs } from '../config';

// =============================================
// TYPES
// =============================================
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

// =============================================
// COMPONENT
// =============================================
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      isPassword = false,
      secureTextEntry,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const hasError = Boolean(error);
    const secure = isPassword ? !showPassword : secureTextEntry;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && (
          <Text allowFontScaling={false} style={styles.label}>
            {label}
          </Text>
        )}

        <View
          style={[
            styles.inputContainer,
            isFocused && styles.focused,
            hasError && styles.errored,
          ]}
        >
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            allowFontScaling={false}
            style={[
              styles.input,
              leftIcon ? styles.inputWithLeft : undefined,
              (rightIcon || isPassword) ? styles.inputWithRight : undefined,
            ]}
            placeholderTextColor={Colors.textMuted}
            secureTextEntry={secure}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />

          {isPassword ? (
            <TouchableOpacity
              style={styles.iconRight}
              onPress={() => setShowPassword(p => !p)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.showText}>
                {showPassword ? 'Ẩn' : 'Hiện'}
              </Text>
            </TouchableOpacity>
          ) : rightIcon ? (
            <TouchableOpacity
              style={styles.iconRight}
              onPress={onRightIconPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {rightIcon}
            </TouchableOpacity>
          ) : null}
        </View>

        {hasError && (
          <Text allowFontScaling={false} style={styles.errorText}>
            {error}
          </Text>
        )}
        {!hasError && hint && (
          <Text allowFontScaling={false} style={styles.hintText}>
            {hint}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    gap: rs(6),
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    minHeight: rs(52),
  },
  focused: {
    borderColor: Colors.borderFocus,
    backgroundColor: 'rgba(108,99,255,0.04)',
  },
  errored: {
    borderColor: Colors.error,
  },
  iconLeft: {
    paddingLeft: Spacing.base,
    paddingRight: Spacing.sm,
  },
  iconRight: {
    paddingHorizontal: Spacing.base,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: FontSize.base,
  },
  inputWithLeft: {
    paddingLeft: 0,
  },
  inputWithRight: {
    paddingRight: 0,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error,
  },
  hintText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  showText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default Input;
