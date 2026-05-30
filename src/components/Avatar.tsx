import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, FontSize, Radius, rs } from '../config';
import { getInitials } from '../utils/helpers';

// =============================================
// TYPES
// =============================================
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name?: string;
  uri?: string;
  source?: ImageSourcePropType;
  size?: AvatarSize;
  style?: ViewStyle;
  showOnlineIndicator?: boolean;
  isOnline?: boolean;
}

// =============================================
// SIZE MAP
// =============================================
const SIZE_MAP: Record<AvatarSize, number> = {
  xs: rs(28),
  sm: rs(36),
  md: rs(48),
  lg: rs(64),
  xl: rs(96),
};

const FONT_MAP: Record<AvatarSize, number> = {
  xs: FontSize.xs,
  sm: FontSize.sm,
  md: FontSize.base,
  lg: FontSize.xl,
  xl: FontSize['3xl'],
};

// =============================================
// COMPONENT
// =============================================
const Avatar: React.FC<AvatarProps> = ({
  name,
  uri,
  source,
  size = 'md',
  style,
  showOnlineIndicator = false,
  isOnline = false,
}) => {
  const dimension = SIZE_MAP[size];
  const fontSize = FONT_MAP[size];
  const imageSource = source || (uri ? { uri } : null);
  const initials = name ? getInitials(name) : '?';
  const indicatorSize = dimension * 0.28;

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.container,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          },
        ]}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={[
              styles.image,
              { width: dimension, height: dimension, borderRadius: dimension / 2 },
            ]}
          />
        ) : (
          <Text
            allowFontScaling={false}
            style={[styles.initials, { fontSize }]}
          >
            {initials}
          </Text>
        )}
      </View>

      {showOnlineIndicator && (
        <View
          style={[
            styles.indicator,
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: isOnline ? Colors.success : Colors.textMuted,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  container: {
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: Colors.white,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  indicator: {
    position: 'absolute',
    bottom: rs(1),
    right: rs(1),
    borderWidth: 2,
    borderColor: Colors.background,
  },
});

export default Avatar;
