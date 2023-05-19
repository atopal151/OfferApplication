import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import {
  Text, Input,
} from 'native-base';
import { observer } from "mobx-react";
import UserStore from '../../component/UserStore';
import { FAB } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";

observer
class ConHomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(UserStore.companyName);
    return (
      <View style={styles.container} >
        <View style={styles.headerStyle}>
          <View style={{ alignItems: "center", margin: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 900, color: "#EDC211" }}> Hi! {
              <Text style={{ fontSize: 15, fontWeight: 600, color: "grey" }}>{UserStore.companyName}</Text>}
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
          <ScrollView>
            <View style={{ margin: 10 }}>
              <Text>My Open Offer</Text>
            </View>
          </ScrollView>

        </View>
        <FAB visible={console.log("q")} icon={
          <TouchableOpacity onPress={() => { this.props.navigation.navigate("conAddOffer") }}>
            <Icon
              name="add"
              style={{ color: "white" }}
              size={25}
            />
          </TouchableOpacity>} size='large' style={{ margin: 10 }} placement='right' color='#EDC211' />
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
    height: 40, width: 40, margin: 5,
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
  inputStyle: {
    backgroundColor: "white",
    width: "90%",
  },
  bodyStyle: {
    flexDirection: "column",
    margin: 10
  },
})

export default ConHomePage;

