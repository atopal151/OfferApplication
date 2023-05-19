import React, { Component } from 'react'
import {
    TouchableOpacity, StyleSheet, View,
    ImageBackground, Image
} from 'react-native'
import {
    NativeBaseProvider, VStack,
    FormControl, Input, Box,
    Text
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserStore from '../component/UserStore';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userid: "",
            role: "",
            name: "",
            address: "",
            companyName: "",
            user: []
        }
    }

    componentDidMount() {

        if (auth().currentUser !== null) {
            UserStore.getUser()
            this.state.userid = auth().currentUser.uid
            console.log(this.state.userid);
            firestore()
                .collection('Users')
                .where('uid', '==', this.state.userid)
                .get()
                .then(querySnapshot => {
                    let user = []
                    console.log(querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                        user.push(documentSnapshot.data())
                    });
                    this.setState({ user })
                    this.state.user.map((users) => {
                        this.state.name = users.name
                        this.state.role = users.role
                        this.state.email = users.email
                        this.state.address = users.address
                        this.state.companyName = users.companyName
                        console.log(this.state.role);
                    })
                    if (this.state.role === 'supllier') {
                        console.log("User supplier" + this.state.name);
                        this.props.navigation.navigate("tabnavsupllierstack", {
                            companyNames: this.state.companyName,
                            surname: this.state.name,
                            rolles: this.state.role,
                            mail: this.state.email,
                            userAddress: this.state.address
                        })
                    } else if (this.state.role === 'consumer') {
                        console.log("User consumer");
                        this.props.navigation.navigate("tabnavconsumerstack", {
                            companyNames: this.state.companyName,
                            surname: this.state.name,
                            rolles: this.state.role,
                            mail: this.state.email,
                            userAddress: this.state.address
                        })
                    }
                });
        }
    }

    render() {
        return (
            <NativeBaseProvider>
                <ImageBackground source={require("../../assets/background.jpg")}
                    resizeMode="cover" style={styles.container}>
                    <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                        <Image style={styles.iconStyle}
                            source={require("../../assets/icn.png")} />
                        <Box w="75%" maxW="320" py="8">
                            <VStack space={3} >
                                <FormControl>
                                    <Input style={styles.inputStyle} variant="rounded"
                                        placeholder="Email"
                                        onChangeText={email => this.setState({ email })}
                                        ref={this.props.InputRef}
                                    />
                                </FormControl>
                                <FormControl>
                                    <Input type="password" style={styles.inputStyle}
                                        variant="rounded" placeholder="Password"
                                        onChangeText={password => this.setState({ password })}
                                        ref={this.props.InputRef}
                                    />
                                    <Text style={{ margin: 10, alignSelf: "flex-end", fontSize: 12, color: "#9c9898" }}>
                                        Forgot Password ?
                                    </Text>
                                </FormControl>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                        auth()
                                            .signInWithEmailAndPassword(this.state.email, this.state.password)
                                            .then(() => {
                                                console.log("Sign in");
                                                this.state.userid = auth().currentUser.uid
                                                console.log(this.state.userid);
                                                UserStore.getUser()
                                                firestore()
                                                    .collection('Users')
                                                    .where('uid', '==', this.state.userid)
                                                    .get()
                                                    .then(querySnapshot => {
                                                        let user = []
                                                        console.log(querySnapshot.size);
                                                        querySnapshot.forEach(documentSnapshot => {
                                                            user.push(documentSnapshot.data())
                                                        });
                                                        this.setState({ user })
                                                        this.state.user.map((users) => {
                                                            this.state.name = users.name
                                                            this.state.role = users.role
                                                            this.state.email = users.email
                                                            this.state.address = users.address
                                                            this.state.companyName = users.companyName
                                                            console.log(this.state.role);
                                                        })
                                                        if (this.state.role === 'consumer') {
                                                            console.log("User consumer");
                                                            this.props.navigation.navigate("tabnavconsumerstack",)
                                                        } else if (this.state.role === 'supllier') {
                                                            console.log("User supllier");
                                                            this.props.navigation.navigate("tabnavsupllierstack",)
                                                        }
                                                    });
                                            })
                                            .catch(error => {
                                                if (error.code === 'auth/email-already-in-use') {
                                                    console.log('That email address is already in use!');
                                                }
                                                if (error.code === 'auth/invalid-email') {
                                                    console.log('That email address is invalid!');
                                                }
                                                if (error.code === 'auth/wrong-password') {
                                                    console.log('Wrong Password!');
                                                }
                                                console.error("Can't find User" + error);
                                            });
                                    }}>
                                        <Text style={{ color: "white", fontWeight: "400" }}>
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        justifyContent: "center",
                                        alignItems: "center", margin: 10
                                    }}
                                        onPress={() => { this.props.navigation.navigate("Signup") }}>
                                        <Text style={{ alignSelf: "center", fontSize: 12 }}>
                                            Do you have an account ?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </VStack>
                        </Box>
                    </View>
                </ImageBackground>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    buttonStyle: {
        backgroundColor: "#EDC211",
        width: 200,
        height: 40,
        margin: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    inputStyle: {
        backgroundColor: "white",
        opacity: 0.8,
        width: 180
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    iconStyle: {
        justifyContent: "center",
        alignItems: "center",
    }
});


