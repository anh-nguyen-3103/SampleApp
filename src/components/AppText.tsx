import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

interface TextVariantProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
}

const AppText: React.FC<AppTextProps> & {
  H1: React.FC<TextVariantProps>;
  H2: React.FC<TextVariantProps>;
  H3: React.FC<TextVariantProps>;
  Paragraph: React.FC<TextVariantProps>;
} = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

AppText.H1 = ({ text, style, ...props }: TextVariantProps) => (
  <Text style={[styles.text, styles.h1, style]} {...props}>
    {text}
  </Text>
);

AppText.H2 = ({ text, style, ...props }: TextVariantProps) => (
  <Text style={[styles.text, styles.h2, style]} {...props}>
    {text}
  </Text>
);

AppText.H3 = ({ text, style, ...props }: TextVariantProps) => (
  <Text style={[styles.text, styles.h3, style]} {...props}>
    {text}
  </Text>
);

AppText.Paragraph = ({ text, style, ...props }: TextVariantProps) => (
  <Text style={[styles.text, styles.paragraph, style]} {...props}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
    color: '#000',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 26,
  },
  paragraph: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});

export { AppText };
