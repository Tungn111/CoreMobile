import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing, Shadows, rs } from '../config';

// =============================================
// TYPES
// =============================================
export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface AlertButton {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'ghost';
}

interface CustomAlertProps {
  visible: boolean;
  type?: AlertType;
  title?: string;
  message: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
  dismissOnBackdrop?: boolean;
}

// =============================================
// ALERT CONFIG
// =============================================
const ALERT_CONFIG: Record<AlertType, { emoji: string; color: string; bg: string }> = {
  success: { emoji: '✅', color: Colors.success, bg: Colors.successLight },
  error: { emoji: '❌', color: Colors.error, bg: Colors.errorLight },
  warning: { emoji: '⚠️', color: Colors.warning, bg: Colors.warningLight },
  info: { emoji: 'ℹ️', color: Colors.info, bg: Colors.infoLight },
  confirm: { emoji: '❓', color: Colors.primary, bg: 'rgba(108,99,255,0.12)' },
};

// =============================================
// COMPONENT
// =============================================
const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type = 'info',
  title,
  message,
  buttons,
  onDismiss,
  dismissOnBackdrop = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const config = ALERT_CONFIG[type];

  const animate = useCallback((toShow: boolean) => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: toShow ? 1 : 0.85,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
      }),
      Animated.timing(opacityAnim, {
        toValue: toShow ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  useEffect(() => {
    animate(visible);
  }, [visible, animate]);

  const defaultButtons: AlertButton[] = [
    { label: 'Đóng', onPress: () => onDismiss?.(), variant: 'ghost' },
  ];

  const resolvedButtons = buttons && buttons.length > 0 ? buttons : defaultButtons;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => dismissOnBackdrop && onDismiss?.()}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backdrop}
        onPress={() => dismissOnBackdrop && onDismiss?.()}
      >
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          {/* Icon */}
          <View style={[styles.iconWrapper, { backgroundColor: config.bg }]}>
            <Text style={styles.emoji}>{config.emoji}</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {title && (
              <Text allowFontScaling={false} style={styles.title}>
                {title}
              </Text>
            )}
            <Text allowFontScaling={false} style={styles.message}>
              {message}
            </Text>
          </View>

          {/* Buttons */}
          <View style={[styles.buttonRow, resolvedButtons.length > 2 && styles.buttonColumn]}>
            {resolvedButtons.map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.75}
                style={[
                  styles.button,
                  btn.variant === 'danger' && styles.btnDanger,
                  btn.variant === 'ghost' && styles.btnGhost,
                  btn.variant === 'primary' && styles.btnPrimary,
                  !btn.variant && (idx === resolvedButtons.length - 1
                    ? styles.btnPrimary
                    : styles.btnGhost),
                ]}
                onPress={btn.onPress}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.btnLabel,
                    btn.variant === 'danger' && styles.btnLabelDanger,
                    btn.variant === 'ghost' && styles.btnLabelGhost,
                    (!btn.variant && idx === resolvedButtons.length - 1) && styles.btnLabelPrimary,
                  ]}
                >
                  {btn.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: rs(340),
    backgroundColor: Colors.backgroundCard,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    gap: Spacing.base,
    ...Shadows.lg,
  },
  iconWrapper: {
    width: rs(64),
    height: rs(64),
    borderRadius: rs(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: rs(28),
  },
  content: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    width: '100%',
    marginTop: Spacing.xs,
  },
  buttonColumn: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: rs(44),
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
  },
  btnDanger: {
    backgroundColor: Colors.error,
  },
  btnGhost: {
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btnLabel: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  btnLabelPrimary: { color: Colors.white },
  btnLabelDanger: { color: Colors.white },
  btnLabelGhost: { color: Colors.textSecondary },
});

export default CustomAlert;

// =============================================
// HOOK — useAlert
// =============================================
import { useState } from 'react';

interface AlertState {
  visible: boolean;
  type: AlertType;
  title?: string;
  message: string;
  buttons?: AlertButton[];
}

export function useAlert() {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    type: 'info',
    message: '',
  });

  const showAlert = useCallback(
    (params: Omit<AlertState, 'visible'>) => {
      setAlertState({ ...params, visible: true });
    },
    [],
  );

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, visible: false }));
  }, []);

  const AlertComponent = (
    <CustomAlert
      {...alertState}
      onDismiss={hideAlert}
    />
  );

  return { showAlert, hideAlert, AlertComponent };
}
