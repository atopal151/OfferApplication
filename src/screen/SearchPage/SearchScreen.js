import React, { Component } from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity, SectionList } from 'react-native'
import {
  NativeBaseProvider, Input,
  Text
} from 'native-base';
import firestore from "@react-native-firebase/firestore"

export default class SearchScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchCompany: "",
      userid: "",
      name: "",
      role: "",
      email: "",
      address: "",
      companyName: "",
      realSearchList: []
    }
  }

  async getRealTimeSearchData() {
    this.state.realSearchList = []
    await firestore()
      .collection('Users')
      .onSnapshot(documentSnapshots => {
        this.state.realSearchList = []
        documentSnapshots.docs.map(doc => {
          this.state.realSearchList.push(doc.data())
        })
        this.setState({})
      });
  }

  componentDidMount() {
    this.state.realSearchList = []
    this.getRealTimeSearchData()
  }

  render() {
    console.log(this.state.searchCompany);
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.headerStyle}>
            <Text style={{ margin: 10, fontSize: 15, fontWeight: 600, color: "grey" }}>
              Search {(<Text style={{ fontSize: 15, fontWeight: 600, color: "#EDC211" }}>
                Company</Text>)}</Text>
          </View>
          <View style={styles.bodyStyle}>
            <Input style={styles.inputStyle}
              variant="rounded" placeholder="Search"
              onChangeText={(searchCompany) => {
                
                this.state.realSearchList = []
                firestore()
                  .collection('Users').where("companyName", ">=", searchCompany)
                  .onSnapshot(documentSnapshots => {
                    this.state.realSearchList = []
                    documentSnapshots.docs.map(doc => {
                      this.state.realSearchList.push(doc.data())
                    })
                    this.setState({})
                    console.log(this.state.realSearchList);
                  });
              }}
              ref={this.props.InputRef}
            />
          </View>
        </View>
        <View style={styles.body1}>
          <SectionList
            sections={[
              { title: "User", data: this.state.realSearchList },

            ]}
            renderItem={({ item }) =>
              <View style={{ flexDirection: "row" }}>
                <View style={{ alignItems: "center", justifyContent: "center", margin: 5 }}>
                  <Image style={styles.iconStyle}
                    source={require("../../../assets/icn.png")} />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={{ margin: 10 }} onPress={() => {
                    this.props.navigation.navigate("searchDetail", {
                      username: item.name,
                      companyName: item.companyName,
                      companyAddress: item.address,
                      companyMail: item.email,
                      roles: item.role,
                      uID: item.uid
                    })
                  }}>
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: 400 }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'grey' }}>
                      {item.email}
                    </Text>

                  </TouchableOpacity>
                </View>

              </View>}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.name}</Text>
            )}
            keyExtractor={item => item.uid}
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
    height: 40, width: 40, margin: 5,
  }
})

