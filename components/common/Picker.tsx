import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

interface PickerItem {
  label: string;
  value: string;
}

interface PickerProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  error?: string;
}

export function Picker({ 
  label, 
  selectedValue, 
  onValueChange, 
  items, 
  error 
}: PickerProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.pickerContainer, error && styles.pickerError]}>
        <RNPicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <RNPicker.Item label="Select an option" value="" />
          {items.map((item) => (
            <RNPicker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value} 
            />
          ))}
        </RNPicker>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: {
        paddingHorizontal: 12,
      },
    }),
  },
  pickerError: {
    borderColor: '#EF4444',
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 150,
      },
      android: {
        height: 50,
      },
      web: {
        height: 40,
      },
    }),
  },
  error: {
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});