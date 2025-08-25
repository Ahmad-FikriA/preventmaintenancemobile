import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational':
        return { color: '#059669', bgColor: '#ECFDF5', text: 'Operational' };
      case 'warning':
        return { color: '#D97706', bgColor: '#FFFBEB', text: 'Warning' };
      case 'critical':
        return { color: '#DC2626', bgColor: '#FEF2F2', text: 'Critical' };
      case 'maintenance':
        return { color: '#2563EB', bgColor: '#EFF6FF', text: 'Maintenance' };
      default:
        return { color: '#6B7280', bgColor: '#F3F4F6', text: 'Unknown' };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { padding: 4, fontSize: 10 };
      case 'large':
        return { padding: 8, fontSize: 14 };
      default:
        return { padding: 6, fontSize: 12 };
    }
  };

  const config = getStatusConfig(status);
  const sizeStyles = getSizeStyles(size);

  return (
    <View 
      style={[
        styles.badge, 
        { backgroundColor: config.bgColor, padding: sizeStyles.padding }
      ]}
    >
      <Text 
        style={[
          styles.badgeText, 
          { color: config.color, fontSize: sizeStyles.fontSize }
        ]}
      >
        {config.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontWeight: '600',
  },
});