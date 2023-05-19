import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native'

export default class GetStarted extends Component {
    constructor(props){
        super(props);
        this.state={
    

        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate("Signin")
        },1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../../assets/background.jpg")}
                    resizeMode="cover" style={styles.image}>
                    <View style={{ alignItems: "center", justifyContent: "center", flex:5 }}>
                        <Image style={styles.iconStyle}
                            source={require("../../assets/icn.png")} />
                        <Text style={styles.textStyle}>Welcome the Offer Application</Text>
                        <Text style={styles.textStyle2}> In this application, you can bid for the products that
                            you can bid for the products that consumer consumers need.</Text>
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center", flex:1}}>
                        <TouchableOpacity style={styles.buttonStyle} 
                        onPress={()=>{ this.props.navigation.navigate("Signin")}}>
                            <Text style={{ color: "white", fontWeight: "400" }}>
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
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
        margin: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        margin: 30,
        fontWeight: "600",
        color: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle2: {
        margin: 50,
        fontWeight: "600",
        color: "#9C9898",
        justifyContent: "center",
        alignItems: "center"
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
