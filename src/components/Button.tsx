import React from 'react';
import { ViewStyle } from 'react-native';
import { White } from '../constants/colors';
import { Text, Pressable, StyleSheet } from 'react-native';

type Props = {
    text: string,
    style?: ViewStyle,
    onPress: () => void
}

const Button = (props: Props) => {
    return (
        <Pressable
            onPress={props.onPress}
            style={[styles.container, props.style]}>
            <Text style={{ color: White, fontSize: 18 }}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        borderRadius: 10,
        paddingVertical: 5,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#33BBFFt',
    }
})

export default Button