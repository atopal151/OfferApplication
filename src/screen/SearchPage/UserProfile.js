import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity,ImageBackground } from 'react-native'
import auth from "@react-native-firebase/auth"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { VStack, Avatar } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { observer } from "mobx-react";
import UserStore from '../../component/UserStore';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }
    
      render() {
        return (
          <View style={styles.container}>
            <View style={styles.body1}>
              <VStack>
              <ImageBackground source={require("../../../assets/bg.jpg")} style={{
                            height: "100%", width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                            resizeMode="cover" >
                <Avatar style={{ elevation: 10 }} alignSelf="center" size="2xl" source={{
                  uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                }}>
                </Avatar>
                <View style={styles.info}>
                  <Text style={{ color: "white", fontSize: 19,margin:10, fontWeight: 600 }} >
                    {UserStore.name}
                  </Text>
                  <Text style={{ color: "white", fontSize: 14, fontWeight: 400 }} >
                    {UserStore.companyName}
                  </Text>
                </View>
                </ImageBackground>
              </VStack>
            </View>
            <View style={styles.body4}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => {
    
              }}>
                <Ionicons
                  testID="nextButton"
                  name="pencil"
                  color="#EDC211"
                  size={25}
                  style={{ backgroundColor: 'transparent', margin:10}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.body2}>
              <Text style={{ color: "black", fontSize: 15, fontWeight: 600, margin: 10 }} >
                Name
              </Text>
              <Text style={{ color: "grey", fontSize: 12, fontWeight: 400, left: 20 }} >
                {UserStore.name}
              </Text>
              <Text style={{ color: "black", fontSize: 15, fontWeight: 600, margin: 10 }} >
                Compnay Name
              </Text>
              <Text style={{ color: "grey", fontSize: 12, fontWeight: 400, left: 20 }} >
                {UserStore.companyName}
              </Text>
              <Text style={{ color: "black", fontSize: 15, fontWeight: 600, margin: 10 }} >
                Role
              </Text>
              <Text style={{ color: "grey", fontSize: 12, fontWeight: 400, left: 20 }} >
                {UserStore.role}
              </Text>
              <Text style={{ color: "black", fontSize: 15, fontWeight: 600, margin: 10 }} >
                Mail Address
              </Text>
              <Text style={{ color: "grey", fontSize: 12, fontWeight: 400, left: 20 }} >
                {UserStore.email}
              </Text>
              <Text style={{ color: "black", fontSize: 15, fontWeight: 600, margin: 10 }} >
                Address
              </Text>
              <Text style={{ color: "grey", fontSize: 12, fontWeight: 400, left: 20 }} >
                {UserStore.address}
              </Text>
    
            </View>
            <View style={styles.body3}>
    
              <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                auth()
                  .signOut()
                  .then(() => {
                    console.log('User signed out!')
                    this.props.navigation.navigate("Signin")
                  });
              }}>
                <Ionicons
                  testID="nextButton"
                  name="log-out"
                  color="#EDC211"
                  size={30}
                  style={{ backgroundColor: 'transparent' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      },
    
      info: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20
      },
      buttonStyle: {
    
        justifyContent: "center",
        alignItems: "center"
      },
      body1: {
        flex: 6,
        width: "100%",
      },
      body2: {
        flex: 7,
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "100%",
      },
      body3: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
      body4: {
        flex: 1.2,
        alignItems: "flex-end",
        width: "100%",
        justifyContent: "center"
      }
    })
    