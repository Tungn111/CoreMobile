import React, { useState } from 'react';
import {
  Image,
  Modal,
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
interface ImageViewerProps {
  uri?: string;
  style?: ViewStyle;
  enablePreview?: boolean;
  placeholder?: React.ReactNode;
  borderRadius?: number;
}

// =============================================
// COMPONENT
// =============================================
const ImageViewer: React.FC<ImageViewerProps> = ({
  uri,
  style,
  enablePreview = true,
  placeholder,
  borderRadius = Radius.md,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!uri || hasError) {
    return (
      <View style={[styles.placeholder, { borderRadius }, style]}>
        {placeholder || (
          <Text style={styles.placeholderIcon}>🖼️</Text>
        )}
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={enablePreview ? 0.85 : 1}
        onPress={() => enablePreview && setPreviewVisible(true)}
        style={[{ borderRadius, overflow: 'hidden' }, style]}
      >
        <Image
          source={{ uri }}
          style={styles.image}
          onError={() => setHasError(true)}
        />
      </TouchableOpacity>

      {/* Full-screen Preview */}
      <Modal
        visible={previewVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={() => setPreviewVisible(false)}
        >
          <Image
            source={{ uri }}
            style={styles.fullImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setPreviewVisible(false)}
          >
            <Text allowFontScaling={false} style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: Colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  placeholderIcon: {
    fontSize: rs(32),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing['2xl'],
    right: Spacing.xl,
    backgroundColor: Colors.glassBgStrong,
    width: rs(40),
    height: rs(40),
    borderRadius: rs(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  closeText: {
    color: Colors.white,
    fontSize: FontSize.base,
    fontWeight: '700',
  },
});

export default ImageViewer;
