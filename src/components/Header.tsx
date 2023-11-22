import { View, Text } from 'react-native'
import React from 'react'
import { White } from '../constants/colors'
import { Strings } from '../constants/strings'

const Header = () => {
    return (
        <View style={{
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: White,
            marginBottom: 10
        }}>
            <Text style={{ fontSize: 16 }}>{Strings.header}</Text>
        </View>
    )
}

export default Header