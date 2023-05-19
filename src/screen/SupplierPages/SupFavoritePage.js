import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import {
  NativeBaseProvider, VStack,
  FormControl, Input, Box,
  Text
} from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from "react-native-vector-icons/Ionicons"

let user = []
export default class SupFavoritePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userid: "",
      name: "",
      role: "",
      email: "",
      address: "",
      companyName: "",
      user: []
    }
  }


  componentDidMount() {
    if (auth().currentUser !== null) {
      this.state.userid = auth().currentUser.uid
      console.log(this.state.userid);
      firestore()
        .collection('Users')
        .where('uid', '==', this.state.userid)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            user.push(documentSnapshot.data())
          });
          this.setState({ user })
        });
    }
  }
  render() {
    this.state.user.map((users) => {
      this.state.name = users.name
      this.state.role = users.role
      this.state.email = users.email
      this.state.address = users.address
      this.state.companyName = users.companyName
    })
    return (

      <View style={styles.container} >
        <ScrollView>
          <View style={styles.headerStyle}>
            <View style={styles.center}>
              <Image style={styles.iconStyle}
                source={require("../../../assets/icn.png")} />

            </View>
            <View style={styles.container}>

              <Text style={{
                fontSize: 15, fontWeight: 600,
                color: "black"
              }}>{this.state.name}</Text>
              <Text style={{
                fontSize: 9, fontWeight: 600,
                color: "grey"
              }}>last seen 10.02.2023 12:35</Text>

            </View>
            <View style={styles.center}>
              <Ionicons
                testID="menuButton"
                name="ellipsis-vertical"
                color="#EDC211"
                size={24}
                style={styles.iconStyle}
              />
            </View>
          </View>

          <View>

          </View>


        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  inputStyle: {
    backgroundColor: "white",
    width: "90%",
  },
  headerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyStyle: {
    flexDirection: "column",
    margin: 15
  },
  iconStyle: {
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
    height: 40, width: 40, margin: 15,
  }
})
