import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MessagingScreen from '../screens/MessagingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Matches') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Messaging') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3DBABE',
          tabBarInactiveTintColor: '#3986B8',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            height: 80,
            paddingBottom: 10,
            paddingTop: 8,
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Tab.Screen 
          name="Notifications" 
          component={NotificationsScreen}
        />
        <Tab.Screen 
          name="Matches" 
          component={MatchesScreen}
        />
        <Tab.Screen 
          name="Messaging" 
          component={MessagingScreen}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 