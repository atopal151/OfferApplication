import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import auth from "@react-native-firebase/auth"

export default class ConsumerScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Consumer Screen </Text>
       
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!')
              this.props.navigation.navigate("Signin")
            });
        }}>
          <Text style={{ color: "white", fontWeight: "400" }}>
            Sign out
          </Text>

        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
})

