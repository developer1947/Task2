import * as React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from "./TabNavigation";



const Stack=createStackNavigator();
export default HomeStackNavigation=()=>{
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator">
        <Stack.Screen options={{headerShown:false}} name="BottomTabNavigator" component={BottomTabNavigator}/> 
    </Stack.Navigator>  
  )
}