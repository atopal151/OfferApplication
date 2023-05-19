import React, { Component } from 'react'
import {
    TouchableOpacity, StyleSheet, View,
    ImageBackground, Image, ScrollView, Alert, TextInput
} from 'react-native'
import {
    NativeBaseProvider, VStack,
    FormControl, Input, Box, Select, CheckIcon, Text, TextArea,
} from 'native-base';

import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';


export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            userid: "",
            selectRole: "",
            name: "",
            address: "",
            companyName: "",
            user: []
        }
    }

    render() {
        return (
            <ImageBackground source={require("../../assets/background.jpg")} style={{height:"100%"}}
                resizeMode="cover" >
                <ScrollView>
                    <NativeBaseProvider>
                        <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                            <Image style={styles.iconStyle}
                                source={require("../../assets/icn.png")} />
                            <Box safeArea p="2" w="90%" maxW="320" py="8">
                                <VStack space={3} mt="5">
                                    <FormControl>
                                        <Input style={styles.inputStyle}
                                            variant="rounded" placeholder="Company Name" autoCapitalize="characters"
                                            onChangeText={(companyName) => {
                                                this.setState({ companyName })
                                                console.log(companyName);
                                            }}
                                            ref={this.props.InputRef} />
                                    </FormControl>
                                    <FormControl>
                                        <Input style={styles.inputStyle} variant="rounded" autoCapitalize="characters"
                                            placeholder="Name Username"
                                            onChangeText={name => this.setState({ name })}
                                            ref={this.props.InputRef}
                                        /></FormControl>
                                    <FormControl>
                                        <Input style={styles.inputStyle} variant="rounded"
                                            placeholder="Email"
                                            onChangeText={email => this.setState({ email })}
                                            ref={this.props.InputRef}
                                        /></FormControl>
                                    <FormControl>
                                        <Input type="password" style={styles.inputStyle}
                                            variant="rounded" placeholder="Password"
                                            onChangeText={password => this.setState({ password })}
                                            ref={this.props.InputRef} />
                                    </FormControl>
                                    <FormControl>
                                        <TextArea numberOfLines={2}
                                            backgroundColor="white"
                                            opacity={0.8}
                                            borderRadius={15}
                                            placeholder="Address" _dark={{
                                                placeholderTextColor: "gray.300"
                                            }} mb="1"
                                            onChangeText={address => this.setState({ address })}
                                            ref={this.props.InputRef} />
                                    </FormControl>
                                    <FormControl w="100%" maxW="300" isRequired >
                                        <Select minWidth="200"
                                            variant="rounded"
                                            backgroundColor="white"
                                            opacity={0.8}
                                            accessibilityLabel="Choose Role"
                                            onValueChange={selectRole => this.setState({ selectRole })}
                                            placeholder="Choose Role" _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size={1} />
                                            }} mt="1">
                                            <Select.Item label="Consumer" value="consumer" />
                                            <Select.Item label="Supllier" value="supllier" />
                                        </Select>
                                    </FormControl>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                            auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                                                firestore().collection('Users').add({
                                                    uid: auth().currentUser.uid,
                                                    companyName: this.state.companyName,
                                                    email: this.state.email,
                                                    name: this.state.name,
                                                    address: this.state.address,
                                                    role: this.state.selectRole
                                                })
                                                //Alert.alert("'User account created", ` Let's Signin `)
                                                if (this.state.selectRole === "supplier") {
                                                    this.props.navigation.navigate("tabnavsupllierstack",)
                                                } else if (this.state.selectRole === "consumer") {
                                                    this.props.navigation.navigate("tabnavconsumerstack",)
                                                }
                                            })

                                        }}>
                                            <Text style={{ color: "white", fontWeight: "400" }}>
                                                Sign Up
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
                                            onPress={() => { this.props.navigation.navigate("Signin") }}>
                                            <Text style={{ alignSelf: "center", fontSize: 12 }}>
                                                Do you have an account ?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </VStack>
                            </Box>
                        </View>
                    </NativeBaseProvider>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonStyle: {
        backgroundColor: "#EDC211",
        width: 200,
        height: 40,
        margin: 20,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    inputStyle: {
        backgroundColor: "white",
        opacity: 0.8
    },

    iconStyle: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    }
});
