import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class AddOfferPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: "#EDC211" }}>Add {
                        <Text style={{ fontSize: 16, fontWeight: 600, color: "#9c9c9c" }}>Offer</Text>}</Text>
                </View>
                <View style={styles.body}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
    },
    body: {
        flex: 25,
    },
    body2: {
        flex: 2.5,
    },
    inputBody: {
        margin: 10
    },
    inputStyle: {
        backgroundColor: "white",
        width: "90%",
    },
})
