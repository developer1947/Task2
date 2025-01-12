import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {MyStatusBar} from '../components/MyStatusBar';
import {BLACK, GrayishBlue,WHITE} from '../constants/color';
import {HEIGHT, WIDTH} from '../constants/config';
import {AboutImage} from '../constants/imagepath';

const About = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: WHITE, alignItems: 'center'}}>
      <MyStatusBar
        backgroundColor={WHITE}
        barStyle="dark-content"
        translucent={false}
      />

      <View style={styles.container2}>
        <View style={styles.container3}>
          <View style={styles.container4}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={styles.container5}>
              <Text allowFontScaling={false} style={styles.txt1}>
                ←
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container6}>
            <Text allowFontScaling={false} style={styles.txt2}>
              About Us
            </Text>
          </View>
        </View>
        <View style={styles.container7}>
          <View style={styles.container8}>
            <Text allowFontScaling={false} style={styles.txt3}>
              Information about the company, its mission, values, services, and
              goals.
            </Text>
          </View>
        </View>
      </View>

      <View style={{height: HEIGHT * 0.3, width: WIDTH * 1}}>
        <Image source={AboutImage} style={{height: '100%', width: '100%'}} />
      </View>
      <View style={{height: HEIGHT * 0.6, width: WIDTH * 0.9}}>
        <View
          style={{
            height: HEIGHT * 0.18,
            width: WIDTH * 0.9,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 14,
              color: BLACK,
              textAlign: 'left',
              fontFamily: 'PlusJakartaSans-VariableFont_wght',
              fontWeight:'500'
            }}>
            Welcome to Task Management System, the ultimate tool designed to
            streamline task organization, boost productivity, and simplify team
            collaboration. Our goal is to empower individuals and teams to
            manage their tasks more efficiently, stay organized, and achieve
            their objectives with ease.
          </Text>
        </View>
        <View
          style={{
            height: HEIGHT * 0.45,
            width: WIDTH * 0.9,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              color: BLACK,
              fontFamily: 'PlusJakartaSans-VariableFont_wght',
            }}>
            • Task Creation & Assignment: Easily create tasks and assign them to
            team members, ensuring clarity on who is responsible for what.{'\n'}
            • Deadline Management: Set due dates and reminders to ensure timely
            completion.{'\n'}• Collaboration Tools: Share updates, files, and
            communicate directly within tasks to keep everyone in the loop.
            {'\n'}• Progress Tracking: Visualize your task completion status and
            track progress with real-time updates.{'\n'}• Integration: Sync with
            other tools and platforms for smooth workflow management.{'\n'}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container2: {
    height: HEIGHT * 0.1,
    width: WIDTH * 1,
  },
  container3: {
    height: HEIGHT * 0.05,
    width: WIDTH * 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container4: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container5: {
    height: HEIGHT * 0.04,
    width: WIDTH * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    color: BLACK,
    fontFamily: 'KronaOne-Regular',
    fontSize: 28,
    fontWeight: 'bold',
  },
  container6: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    color: BLACK,
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    right: '12%',
  },
  container7: {
    height: HEIGHT * 0.05,
    width: WIDTH * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container8: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txt3: {
    fontSize: 12,
    color: GrayishBlue,
    fontFamily: 'PlusJakartaSans-VariableFont_wght',
    textAlign: 'center',
  },
});
export default About;
