

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SupplierScreen from './screen/SupplierScreen';
import ConsumerScreen from './screen/ConsumerScreen';
import React, { Component } from 'react'
import Signin from './screen/Signin';
import Signup from './screen/Signup';
import GetStarted from './screen/GetStarted';
import ConHomePage from './screen/ConsumerPages/ConHomePage';
import SupHomePage from './screen/SupplierPages/SupHomePage';
import SupFavoritePage from './screen/SupplierPages/SupFavoritePage';
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from 'react-native'
import SearchDetail from './screen/SearchPage/SearchDetail';
import SearchScreen from './screen/SearchPage/SearchScreen';
import UserProfile from './screen/SearchPage/UserProfile';
import ChatScreen from './screen/MessagePage/ChatScreen';
import MessageDetail from './screen/MessagePage/MessageDetail';
import AddOfferPage from './screen/ConsumerPages/AddOfferPage';

//--------------------- Consumer page stack --------------

const ConsumerStack = createNativeStackNavigator();

function ConsumerStackPage() {
    return (
        <ConsumerStack.Navigator>
            <ConsumerStack.Screen name='conHome' component={ConHomePage} options={{ headerShown: false }} />
            <ConsumerStack.Screen name='conAddOffer' component={AddOfferPage} options={{ headerTitle: "", headerShown: true, headerTransparent: true }} />
            </ConsumerStack.Navigator>
    )
}
//--------------------- Search page stack --------------

const SearchStack = createNativeStackNavigator();

function SearchStackPage() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name='searchScreen' component={SearchScreen} options={{ headerShown: false }} />
            <SearchStack.Screen name='searchDetail' component={SearchDetail} options={{ headerTitle: "", headerShown: true, headerTransparent: true }} />
            <SearchStack.Screen name='messageDetail' component={MessageDetail} options={{ headerTitle: "", headerShown: true, headerTransparent: true }} />
        </SearchStack.Navigator>
    )
}

//--------------------- Message page stack --------------

const MessageStack = createNativeStackNavigator();

function MessageStackPage() {
    return (
        <MessageStack.Navigator>
            <MessageStack.Screen name='chatScreen' component={ChatScreen} options={{ headerShown: false }} />
            <MessageStack.Screen name='messageDetail' component={MessageDetail} options={{ headerTitle: "", headerShown: true, headerTransparent: true }} />
        </MessageStack.Navigator>
    )
}


//--------------------- Consumer Role Navigator Stack ------------


const Tab = createBottomTabNavigator();

function TabNavConsumerStack() {

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#EDC211",
            tabBarInactiveBackgroundColor: "white"
        }}   >
            <Tab.Screen name="Home" component={ConsumerStackPage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="home"
                        size={20}
                    />),
                    headerShown: false,

                }} />
            <Tab.Screen name="Search" component={SearchStackPage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="search"
                        size={20}
                    />),
                    headerShown: false
                }} />
            <Tab.Screen name="Chat" component={MessageStackPage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="chatbubbles"
                        size={20}
                    />),
                    headerShown: false
                }} />
            <Tab.Screen name="Profile" component={UserProfile}
                options={{
                    tabBarIcon: () => (<Icon
                        name="person-circle"
                        size={20}
                    />),
                    headerShown: false
                }} />
        </Tab.Navigator>
    )
}


//--------------------- Supplier Role Navigator Stack --------------


const Tab1 = createBottomTabNavigator();

function TabNavSupllierstack() {
    return (
        <Tab1.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#EDC211",
            tabBarInactiveBackgroundColor: "white"
        }}  >
            <Tab.Screen name="Home" component={SupHomePage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="home"
                        size={20}
                    />),

                    headerShown: false
                }} />
            <Tab.Screen name="Search" component={SearchStackPage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="search"
                        size={20}
                    />),
                    headerShown: false
                }} />
            <Tab.Screen name="Chat" component={MessageStackPage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="chatbubbles"
                        size={20}
                    />),
                    headerShown: false
                }} />
            <Tab.Screen name="Favorite" component={SupFavoritePage}
                options={{
                    tabBarIcon: () => (<Icon
                        name="star"
                        size={20}
                    />),
                    headerShown: false
                }} />
            <Tab.Screen name="Profile" component={UserProfile}
                options={{
                    tabBarIcon: () => (<Icon
                        name="person-circle"
                        size={20}
                    />),
                    headerShown: false
                }} />
        </Tab1.Navigator>
    )
}

//--------------------- Router Stack Navigator ------------

const Stack = createNativeStackNavigator();

export default class Router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen style={{ flex: 1 }}
                        name="getstarted" component={GetStarted}
                        options={{ headerShown: false }} />
                    <Stack.Screen style={{ flex: 1 }}
                        name="Signin" component={Signin}
                        options={{ headerShown: false }} />
                    <Stack.Screen style={{ flex: 1 }}
                        name="Signup" component={Signup}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="supplierscreenstack"
                        component={SupplierScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="consumerscreenstack"
                        component={ConsumerScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="tabnavsupllierstack"
                        component={TabNavSupllierstack}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="tabnavconsumerstack"
                        component={TabNavConsumerStack}
                        options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
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
    inputStyle: {
        backgroundColor: "white",
        opacity: 0.8,
        width: 180
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