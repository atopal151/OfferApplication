import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Avatar } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SearchDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { route } = this.props;
        const { username, companyName, companyAddress, companyMail, roles,uID } = route.params;
        return (
            <View style={styles.container}>
                <View style={styles.body1}>
                    <ImageBackground source={require("../../../assets/bg.jpg")} style={{
                        height: "100%", width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                        resizeMode="cover" >
                        <Avatar style={{ elevation: 10 }} alignSelf="center" size="2xl" source={{
                            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                        }}></Avatar>
                        <Text style={{ margin: 5, fontSize: 18, fontWeight: 800, color: "white" }}>{companyName}</Text>
                        <Text style={{ margin: 5, color: "white" }}>{username}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.body2}>
                    <Text style={styles.text1} >
                        User Role
                    </Text>
                    <Text style={styles.text2} >
                        {roles}
                    </Text>
                    <Text style={styles.text1} >
                        Compan Mail Address
                    </Text>
                    <Text style={styles.text2} >
                        {companyMail}
                    </Text>
                    <Text style={styles.text1} >
                        Company Address
                    </Text>
                    <Text style={styles.text2} >
                        {companyAddress}
                    </Text>
                </View>
                <View style={{ backgroundColor: "#9c9c9c", borderRadius: 10, margin: 10 }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                        this.props.navigation.navigate("messageDetail",{
                            comMail:companyMail,
                            comName:companyName,
                            comID:uID
                        })
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 10 }}>
                            <Text style={{ margin: 10, color: "white", fontWeight: 700 }}>Send Message</Text>
                            <Ionicons
                                testID="nextButton"
                                name="send"
                                color="white"
                                size={30}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </View>
                    </TouchableOpacity></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    body1: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",

    },
    text1: {
        color: "black",
        fontSize: 17,
        fontWeight: 600,
        margin: 10
    },
    text2: {
        color: "grey",
        fontSize: 15,
        fontWeight: 400,
        left: 20
    },
    body2: {
        flex: 5,
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "100%",
    },
    

})
