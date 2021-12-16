import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Aplikasi HST</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 100,
        width: '100%',
        backgroundColor: '#005197',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 30,
        color: "white",
    },
})