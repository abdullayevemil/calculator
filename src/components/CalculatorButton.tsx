import React, { FC } from "react";
import { Dimensions, Pressable, PressableStateCallbackType, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

const buttonWidth = (Dimensions.get('window').width - 50) / 4;

interface Props {
    button: string;
    onPress: () => void;
}

export const CalculatorButton: FC<Props> = ({ button, onPress }) => {
    const buttonStyle = ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
        const width = button === '0' ? buttonWidth * 2 : buttonWidth;

        return [styles.button, { width, backgroundColor: pressed ? 'rgba(255, 255, 255, 0.1)' : '#0d0d0d' }];
    };

    const textStyle: StyleProp<TextStyle> = [
        styles.text,
        { color: isNaN(+button) ? '#F66100' : 'white' },
    ];

    return (
        <Pressable onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>{button}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        height: buttonWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 36,
        fontWeight: 600,
    }
});