import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Router from './src/Router'
import { NativeBaseProvider } from 'native-base'

export default class App extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    )
  }
}

const styles = StyleSheet.create({})
