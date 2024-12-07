import React from 'react';
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Image
} from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0D4DD6',
        headerStyle: {
          backgroundColor: '#FFFAFA',
        },
        headerShadowVisible: true,
        headerTintColor: '#0D4DD6',
        tabBarStyle: {
          backgroundColor: '#FFFAFA',
        }
      }}
    >
      <Tabs.Screen 
        name="studDashboard" 
        options={{ 
          title: 'Dashboard' ,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ),
        }} 
      />
      <Tabs.Screen 
        name="studRanks" 
        options={{ title: 'Ranks',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'star-sharp' : 'star-outline'} color={color} size={24} />
        ),
        }} 
      />
    </Tabs> 
  )
}
