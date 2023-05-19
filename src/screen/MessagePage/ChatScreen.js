import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, SectionList } from 'react-native'
import { NativeBaseProvider, Input, Text } from 'native-base';
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"


export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCompany: "",
      realChatList:[]
    }
  }

  async getRealTimechatData () {
    this.state.realChatList = []
    await firestore()
      .collection('chats')
      .doc(`${auth().currentUser.email}`)
      .collection("user")
      .onSnapshot(documentSnapshots => {
        this.state.realChatList = []
        documentSnapshots.docs.map(doc => {
          this.state.realChatList.push(doc.data())
        })
        this.setState({})
      });
  }

  

  componentDidMount() {
    this.getRealTimechatData()
  }

  render() {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.headerStyle}>
            <Text style={{ margin: 10, fontSize: 15, fontWeight: 600, color: "grey" }}>
              Search {(<Text style={{ fontSize: 15, fontWeight: 600, color: "#EDC211" }}>
                Message</Text>)}</Text>
          </View>
          <View style={styles.bodyStyle}>
            <Input style={styles.inputStyle}
              variant="rounded" placeholder="Search"
              onChangeText={(searchCompany) => {
                //chat search
              }}
              ref={this.props.InputRef}
            />
          </View>
        </View>
        <View style={styles.body1}>
          <SectionList style={{
            width: "90%"
          }}
            sections={[
              { title: "Chat", data: this.state.realChatList },
            ]}
            renderItem={({ item }) =>
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "center", justifyContent: "center", margin: 5 }}>
                  <Image style={styles.iconStyle}
                    source={require("../../../assets/icn.png")} />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                    this.props.navigation.navigate("messageDetail", {
                      comName: item.name,
                      comMail: item.mail,
                      comID: item.id
                    })
                  }}>
                    <Text style={{ fontSize: 15, color: 'black', fontWeight:400 }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'grey' }}>
                      {item.mail}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.name}</Text>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </NativeBaseProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body1: {
    flex: 6,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "flex-start"
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
    margin: 3
  },
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 40, width: 40, margin: 5, left: 5
  }
})

