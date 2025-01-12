import React, {createContext, useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,

  Text,
} from 'react-native';

import {ABOUTImage, AddImage, HomeImage} from '../constants/imagepath';

import Home from '../screens/Home';
import About from '../screens/About';
import {HEIGHT, WIDTH} from '../constants/config';
import {LustRed, TealBlue, BLACK} from '../constants/color';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();
export const ModalContext = createContext();

export default function BottomTabNavigator() {
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fadeAnim1 = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    Animated.timing(fadeAnim1, {
      toValue: isActive ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isActive]);
  useEffect(() => {
    if (!isModalVisible) {
      setIsActive(false);
    }
  }, [isModalVisible]);
  
  return (
    <ModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;
            let label;
            if (route.name === 'Home') {
              iconSource = HomeImage;
              label = 'Home';
            } else if (route.name === 'About') {
              iconSource = ABOUTImage;
              label = 'About';
            }

            const tintColor = focused ? 'red' : 'gray';

            return (
              <View style={{justifyContent: 'center'}}>
                <View style={[styles.tabItem, focused]}>
                  <Image
                    source={iconSource}
                    style={[styles.icon, {tintColor}]}
                  />
                </View>
              </View>
            );
          },

          tabBarLabel: () => null,
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 10,
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            position: 'absolute',
            borderColor: '#EAEAEA',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            paddingLeft: '3%',
            paddingRight: '3%',
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          height: HEIGHT * 0.09,
          width: WIDTH * 0.2,
          right: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: '12%',
          position: 'absolute',
        }}>
        <Image source={AddImage} style={styles.images} />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isActive}
        animationType="fade"
        onRequestClose={() => setIsActive(false)}>
        <View
          style={{
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: 'rgba(100, 100, 100, 0.9)',

            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              height: HEIGHT * 0.09,
              width: WIDTH * 0.2,
              right: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: '15%',
              position: 'absolute',
            }}>
            <Image source={AddImage} style={styles.images} />
          </TouchableOpacity>
          <View
            style={{
              height: HEIGHT * 0.1,
              width: WIDTH * 0.7,
              top: '22%',
              right: '15%',
              padding: '3%',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Animated.View
              style={{
                height: HEIGHT * 0.07,
                width: WIDTH * 0.44,
                opacity: fadeAnim1,
              }}>
              <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
                style={{
                  height: HEIGHT * 0.07,
                  width: WIDTH * 0.44,
                  borderRadius: 40,
                }}>
                <LinearGradient
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={[LustRed, TealBlue]}
                  style={{
                    height: '100%',
                    width: '100%',
                    top: '2%',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LinearGradient
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 0}}
                    colors={['#D5E6E9', 'white', '#FAE2E3']}
                    style={{
                      height: '86%',
                      width: '96%',
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: BLACK,
                        fontFamily: 'KronaOne-Regular',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      ADD TASK
                    </Text>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Modal>
      </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusedTabItem: {
    backgroundColor: '#FADEDF',
    padding: '10%',
    borderRadius: 20,
  },
  label: {
    fontSize: 11,
    paddingLeft: 8,
    fontFamily: 'PlusJakartaSans-VariableFont_wght',
    fontWeight: '700',
  },
  image: {
    height: '100%',
    width: '88%',
  },

  images: {
    height: HEIGHT * 0.09,
    width: HEIGHT * 0.09,
  },
});
