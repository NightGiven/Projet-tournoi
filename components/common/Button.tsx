import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Platform } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const getButtonStyles = () => {
    let buttonStyle = [styles.button];
    
    // Size styles
    if (size === 'small') buttonStyle.push(styles.buttonSmall);
    if (size === 'large') buttonStyle.push(styles.buttonLarge);

    // Variant styles
    if (variant === 'primary') buttonStyle.push(styles.buttonPrimary);
    if (variant === 'secondary') buttonStyle.push(styles.buttonSecondary);
    if (variant === 'outline') buttonStyle.push(styles.buttonOutline);
    if (variant === 'danger') buttonStyle.push(styles.buttonDanger);

    // Disabled style
    if (disabled) buttonStyle.push(styles.buttonDisabled);

    return buttonStyle;
  };

  const getTextStyles = () => {
    let textStyles = [styles.text];
    
    // Size styles
    if (size === 'small') textStyles.push(styles.textSmall);
    if (size === 'large') textStyles.push(styles.textLarge);

    // Variant styles
    if (variant === 'primary') textStyles.push(styles.textPrimary);
    if (variant === 'secondary') textStyles.push(styles.textSecondary);
    if (variant === 'outline') textStyles.push(styles.textOutline);
    if (variant === 'danger') textStyles.push(styles.textDanger);

    // Disabled style
    if (disabled) textStyles.push(styles.textDisabled);

    return textStyles;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#6D28D9' : '#FFFFFF'} 
        />
      ) : (
        <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: '#6D28D9',
  },
  buttonSecondary: {
    backgroundColor: '#2563EB',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6D28D9',
  },
  buttonDanger: {
    backgroundColor: '#DC2626',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    borderColor: '#D1D5DB',
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 18,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#6D28D9',
  },
  textDanger: {
    color: '#FFFFFF',
  },
  textDisabled: {
    color: '#6B7280',
  },
});

export default Button;