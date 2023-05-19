import React, { Component } from 'react'
import { StyleSheet, View, Image,ScrollView } from 'react-native'
import {
  Text,Input
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
let user = []
export default class SupHomePage extends Component {
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
        <View style={styles.headerStyle}>
          <View style={{ alignItems: "center", margin: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 900, color: "#EDC211" }}> Hi! {
              <Text style={{ fontSize: 15, fontWeight: 600, color: "grey" }}>{this.state.companyName}</Text>}
            </Text>
          </View>
          <Image style={styles.center}
            source={require("../../../assets/icn.png")} />
        </View>
        <View style={styles.body}>
        <View style={styles.bodyStyle}>
            <Input style={styles.inputStyle}
              variant="rounded" placeholder="Search"
              onChangeText={(searchOffer) => {
               
              }}
              ref={this.props.InputRef}
            />
          </View>
        </View>
        <ScrollView>
            <View>
              
            </View>
          </ScrollView>
      </View >


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
  },
  inputStyle: {
    backgroundColor: "white",
    width: "90%",
  },
  bodyStyle: {
    flexDirection: "column",
    margin: 10
  },
  headerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%"
  },
  body: {
    flex: 10,
    width: "100%"
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 40, width: 40, margin: 10,
  },
  iconStyle: {
    height: 40,
    width: 40,
  }
})