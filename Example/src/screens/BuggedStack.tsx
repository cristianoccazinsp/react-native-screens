/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, View, StyleSheet,TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const animationConfig = {
  animation: 'spring',
  config: {
    stiffness: 1200,
    damping: 200,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    useNativeDriver: true,
  },
};

function ScreenX({navigation, route}) {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.paragraph}>
        This screen is used for testing bugs!
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text>Go Back</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(route.params?.next)}><Text>Go Next</Text></TouchableOpacity>
    </View>
  );
}

function ScreenEnd({navigation}) {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.paragraph}>
        Final screen.
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text>Go back</Text></TouchableOpacity>
    </View>
  );
}



const Stack = createStackNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => {
        return {
          headerMode: 'screen',
          header: (props) => (
            <View style={styles.headerStyle}>
              <Text>{props.scene.descriptor.options.title}</Text>
            </View>
          ),
          gestureEnabled: false,
          cardOverlayEnabled: true,
          transitionSpec: {
            open: animationConfig,
            close: animationConfig,
          },
        };
      }}>
      <Stack.Screen
        name="Screen1"
        component={ScreenX}
        options={({navigation, route}) => {
          return {
            title: 'Home',
            header: (props) => (
              <View style={styles.headerStyle}>
                <Text>Home Test</Text>
              </View>
            ),
          };
        }}
        initialParams={{ next: 'Screen2'}}
      />
      <Stack.Screen
        name="Screen2"
        component={ScreenX}
        options={{title: 'Screen2'}}
        initialParams={{ next: 'Screen3'}}
      />
      <Stack.Screen
        name="Screen3"
        component={ScreenX}
        options={{
          title: 'Screen3',
        }}
        initialParams={{ next: 'Screen4' }}
      />
      <Stack.Screen
        name="Screen4"
        component={ScreenEnd}
        options={{title: 'Screen4'}}
      />
    </Stack.Navigator>
  );
};


export default function BuggedStack() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerStyle: {
    height: 80,
    elevation: 3,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'skyblue',
  }
});
