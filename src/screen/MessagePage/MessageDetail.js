import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, SectionList, Image, TouchableOpacity } from 'react-native'
import { Input, Pressable } from "native-base"
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import UserStore from '../../component/UserStore';
import { observer } from 'mobx'
import MessageStore from "../../component/MessageStore"

observer
export default class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
      miliseconds: new Date().getUTCMilliseconds(),
      year: new Date().getFullYear(),
      month: new Date().getUTCMonth() + 1,
      day: new Date().getUTCDate(),
      checkMail: "",
      realmessageList: []
    }
  }

  async getRealTimeMessage() {
    this.state.realmessageList = []
    await firestore()
      .collection('messages')
      .doc(`${auth().currentUser.email}--${checkMail}`)
      .collection("chat").orderBy('date', 'desc')
      .onSnapshot(documentSnapshots => {
        this.state.realmessageList = []
        documentSnapshots.docs.map(doc => {
          this.state.realmessageList.push(doc.data())
        })
        this.setState({})
      });
  }

  componentDidMount() {
    this.state.realmessageList = []
    this.getRealTimeMessage()
  }

  render() {
    const { route } = this.props;
    const { comMail, comName, comID } = route.params;
    checkMail = comMail
    console.log(this.state.realmessageList);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 16, fontWeight: 800, color: "#EDC211" }}>{comName}</Text>
          <Text style={{ fontSize: 16, fontWeight: 400 }}>{comMail}</Text>
        </View>
        <View style={styles.body}>
          <SectionList style={{
            width: "100%"
          }}
            sections={[
              { title: "Message", data: this.state.realmessageList },
            ]}
            renderItem={({ item }) =>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {
                  item.mail == auth().currentUser.email ?
                    <View style={{
                      flexDirection: "column", margin: 10, justifyContent: "flex-end",
                      alignItems: "flex-end", width: "95%"
                    }}>
                      <View style={{ backgroundColor: "#EDC211", borderRadius: 10, elevation: 2 }}>
                        <Text style={{ fontSize: 15, color: 'white', margin: 10 }}>
                          {item.message}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 10, color: 'grey', margin: 3 }}>
                        {item.date}
                      </Text>
                    </View>
                    :
                    <View style={{
                      flexDirection: "column", margin: 10, justifyContent: "flex-start",
                      alignItems: "flex-start", width: "95%"
                    }}>
                      <View style={{ backgroundColor: "#9f9f9f9f", borderRadius: 10 }}>
                        <Text style={{ fontSize: 15, color: 'black', margin: 10 }}>
                          {item.message}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 10, color: 'grey' }}>
                        {item.date}
                      </Text>
                    </View>
                }
              </View>}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.name}</Text>
            )}
            keyExtractor={item => item.id}
            inverted
            stickySectionHeadersEnabled={false}
          />
        </View>
        <View style={styles.body2}>
          <View style={styles.inputBody}>
            <Input style={styles.inputStyle}
              variant="rounded"
              placeholder="Write Here..."
              onChangeText={(getMessage) => {
                this.state.message = getMessage
              }}
              ref={this.props.InputRef}
              InputRightElement={
                <Pressable onPress={() => {

                  if (this.state.message != "") {
                    firestore()
                      .collection('messages')
                      .doc(`${auth().currentUser.email}--${comMail}`)
                      .collection("chat")
                      .add({
                        id: Date.now(),
                        date: Date(),
                        mail: auth().currentUser.email,
                        message: this.state.message
                      })
                    firestore()
                      .collection('messages')
                      .doc(`${comMail}--${auth().currentUser.email}`)
                      .collection("chat")
                      .add({
                        id: Date.now(),
                        date: Date(),
                        mail: auth().currentUser.email,
                        message: this.state.message
                      })
                    firestore()
                      .collection('chats')
                      .doc(`${auth().currentUser.email}`)
                      .collection("user")
                      .doc(`${comMail}`)
                      .set({
                        id: comID,
                        name: comName,
                        mail: comMail,
                        message: this.state.message
                      })
                    firestore()
                      .collection('chats')
                      .doc(`${comMail}`)
                      .collection("user")
                      .doc(`${auth().currentUser.email}`)
                      .set({
                        id: auth().currentUser.uid,
                        mail: auth().currentUser.email,
                        name: UserStore.name,
                        message: this.state.message
                      })
                    this.props.InputRef = ""
                    console.log("Message Added");
                  }


                }} >
                  <Ionicons
                    testID="nextButton"
                    name="send"
                    color="#EDC211"
                    size={23}
                    style={{ backgroundColor: 'transparent', margin: 10 }}
                  />
                </Pressable>}
            />
          </View>
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

