import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Black',
  },
});

export default function Text(props) {
  return <RNText style={[styles.text, props.style]}>{props.children}</RNText>;
}

Text.defaultProps = {
  style: null,
};
