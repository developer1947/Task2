import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {MyStatusBar} from '../components/MyStatusBar';
import {
  BLACK,
  GRAY,
  GrayishBlue,
  TealBlue,
  VividRed,
  WHITE,
} from '../constants/color';
import {HEIGHT, WIDTH} from '../constants/config';
import {
  BackImage,
  DeleteImage,
  DotsImage,
  HomeProfileImage,
  NotificaionImage,
} from '../constants/imagepath';
import {AddTask, BASE_URL, TaskList} from '../constants/url';
import {DELETENETWORK, GETNETWORK, POSTNETWORK} from '../utils/Network';
import CurrentDateTime from '../components/CurrentDateTime';
import {ModalContext} from '../navigation/TabNavigation';

const Home = () => {
  const [date, setDate] = useState({date: '', time: '', secondDateType: ''});
  const [data, setData] = useState([]);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState({});

  const [showButton, setShowButton] = useState(false);
  const {isModalVisible, setIsModalVisible} = useContext(ModalContext);
  const [addTitle, setAddTitle] = useState('');
  const TaskListApi = async () => {
    const apiUrl = TaskList;
    try { 
      const response = await GETNETWORK(apiUrl, true);

      if (response && response.success) {
        setData(response.tasks);
        const initialStatus = {};
        response.tasks.forEach(task => {
          initialStatus[task._id] = task.status || false;
        });

        setSelectedTaskStatus(initialStatus);
      } else {
        console.error('error', response.message);
      }
    } catch (error) {
      console.error('Error', error.message);
    }
  };

  const AddTaskApi = async () => {
    const apiUrl = AddTask;
    const payload = {
      title: addTitle,
      date: date.secondDateType,
    };
    try {
      console.log(apiUrl);
      const response = await POSTNETWORK(apiUrl, payload, false);

      if (response && response.success) {
        setIsModalVisible(false);
        TaskListApi();
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.error('Error', error.message);
    }
  };

  const DeleteTaskApi = async id => {
    const apiUrl = BASE_URL + `task/deletetask/${id}`;
    try {
      const response = await DELETENETWORK(apiUrl, false);

      if (response && response.success) {
        TaskListApi();
      } else {
        console.log('failed');
      }
    } catch (error) {
      console.error('Error', error.message);
    }
  };
  const toggleButtonVisibility = id => {
    setShowButton(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  useEffect(() => {
    TaskListApi();
  }, []);

  const toggleTaskStatus = async taskId => {
    const updatedStatus = !selectedTaskStatus[taskId];
    setSelectedTaskStatus(prevStatus => ({
      ...prevStatus,
      [taskId]: updatedStatus,
    }));
  };

  const handleDateTimeChange = newDateTime => {
    setDate(newDateTime);
  };

  const renderItem = ({item}) => {
    const isCompleted = selectedTaskStatus[item._id] || false;

    const dateObj = new Date(item.date);

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', {month: 'short'});
    return (
      <View
        style={{
          height: HEIGHT * 0.13,
          width: WIDTH * 1,
          top: '8%',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: HEIGHT * 0.1,
            width: WIDTH * 0.9,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: WHITE,
            elevation: 5,
            borderRadius: 10,
          }}>
          <View
            style={{
              height: HEIGHT * 0.1,
              width: WIDTH * 0.2,
              backgroundColor: 'lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                fontFamily: 'KronaOne-Regular',
                color: BLACK,
              }}>
              {day}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 16,
                fontFamily: 'KronaOne-Regular',
                color: BLACK,
                top: '5%',
              }}>
              {month}
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT * 0.1,
              width: WIDTH * 0.6,
              alignItems: 'flex-start',
              paddingStart: '3%',
            }}>
            <View
              style={{
                height: HEIGHT * 0.05,
                width: WIDTH * 0.6,
                justifyContent: 'center',
              }}>
              <Text allowFontScaling={false} numberOfLines={2} adjustsFontSizeToFit style={{color:BLACK,fontSize:14}}>{item.title}</Text>
            </View>

            <View
              style={{
                height: HEIGHT * 0.05,
                width: WIDTH * 0.6,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => toggleTaskStatus(item._id)}
                style={styles.radioButton}>
                <View
                  style={[
                    styles.radioCircle,
                    isCompleted ? styles.radioSelected : null,
                  ]}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '900',
                  color: BLACK,
                  left: '3%',
                }}>
                {isCompleted ? 'Completed' : 'Incomplete'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => toggleButtonVisibility(item._id)}
            style={{
              height: HEIGHT * 0.1,
              width: WIDTH * 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={DotsImage}
              style={{height: HEIGHT * 0.03, width: HEIGHT * 0.03}}
            />
          </TouchableOpacity>
          {showButton[item._id] && (
            <View
              style={{
                height: HEIGHT * 0.1,
                width: WIDTH * 0.9,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                position: 'absolute',
                paddingTop: '2%',
              }}>
              <TouchableOpacity
                onPress={() => DeleteTaskApi(item._id)}
                style={{
                  height: HEIGHT * 0.04,
                  width: WIDTH * 0.25,
                  backgroundColor: WHITE,
                  right: '10%',
                  borderRadius: 4,
                  flexDirection: 'row',
                  elevation: 5,
                }}>
                <View
                  style={{
                    height: HEIGHT * 0.04,
                    width: WIDTH * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={DeleteImage} style={{height: 20, width: 20}} />
                </View>
                <View
                  style={{
                    height: HEIGHT * 0.04,
                    width: WIDTH * 0.15,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: 12, color: BLACK, fontWeight: '700'}}>
                    Delete
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.constainer1}>
      <MyStatusBar
        backgroundColor={WHITE}
        barStyle="dark-content"
        translucent={false}
      />
      <CurrentDateTime onDateTimeChange={handleDateTimeChange} />
      <View style={styles.container2}>
        <View style={styles.container3}>
          <TouchableOpacity style={styles.container4}>
            <Image source={HomeProfileImage} style={styles.img1} />
          </TouchableOpacity>
          <View style={styles.container5}>
            <View style={styles.container6}>
              <View style={styles.container7}>
                <Text
                  allowFontScaling={false}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.txt9}>
                  Welcome,
                  <Text
                    allowFontScaling={false}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={styles.txt10}>
                    Swayam
                  </Text>
                </Text>
              </View>
              <View style={styles.container8}>
                <Text allowFontScaling={false} style={styles.txt11}>
                  Bhubaneswar, Odisha
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container9}>
            <TouchableOpacity style={styles.container10}>
              <Image source={NotificaionImage} style={styles.img2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          height: HEIGHT * 0.05,
          width: WIDTH * 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: HEIGHT * 0.03,
            width: WIDTH * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: HEIGHT * 0.03,
              width: WIDTH * 0.5,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                fontFamily: 'KronaOne-Regular',
                left: '1%',
                color: BLACK,
              }}>
              {date.date}
            </Text>
          </View>
          <View
            style={{
              height: HEIGHT * 0.03,
              width: WIDTH * 0.4,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                fontFamily: 'KronaOne-Regular',
                left: '1%',
                color: BLACK,
              }}>
              {date.time}
            </Text>
          </View>
        </View>
      </View>

      <View style={{height: HEIGHT * 0.85, width: WIDTH * 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(100, 100, 100, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                height: HEIGHT * 0.3,
                width: WIDTH * 0.85,
                backgroundColor: WHITE,
                elevation: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  height: HEIGHT * 0.1,
                  width: WIDTH * 0.85,
                  backgroundColor: TealBlue,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    height: HEIGHT * 0.03,
                    width: WIDTH * 0.85,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsModalVisible(false);
                    }}
                    style={{
                      height: HEIGHT * 0.03,
                      width: WIDTH * 0.2,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={BackImage}
                      style={{
                        height: HEIGHT * 0.015,
                        width: HEIGHT * 0.025,
                        tintColor: WHITE,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: HEIGHT * 0.03,
                      width: WIDTH * 0.5,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 12,
                        fontFamily: 'KronaOne-Regular',
                        left: '1%',
                        color: BLACK,
                      }}>
                      {date.date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: HEIGHT * 0.07,
                    width: WIDTH * 0.85,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 22,
                      color: WHITE,
                      fontFamily: 'KronaOne-Regular',
                    }}>
                    ADD TASK
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: HEIGHT * 0.1,
                  width: WIDTH * 0.85,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="Enter Title"
                  placeholderTextColor={BLACK}
                  value={addTitle}
                  onChangeText={setAddTitle}
                  style={{
                    height: HEIGHT * 0.08,
                    width: WIDTH * 0.8,
                    backgroundColor: WHITE,
                    elevation: 10,
                    borderRadius: 10,
                    fontFamily: 'PlusJakartaSans-VariableFont_wght',
                    fontWeight: '800',
                    color: BLACK,
                  }}
                />
              </View>
              <View
                style={{
                  height: HEIGHT * 0.1,
                  width: WIDTH * 0.85,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={AddTaskApi}
                  style={{
                    height: HEIGHT * 0.06,
                    width: WIDTH * 0.8,
                    backgroundColor: VividRed,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 18,
                      color: WHITE,
                      fontFamily: 'PlusJakartaSans-VariableFont_wght',
                      fontWeight: '900',
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  constainer1: {flex: 1, backgroundColor: WHITE, alignItems: 'center'},
  container2: {
    height: HEIGHT * 0.1,
    width: WIDTH * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.94,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container4: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    height: '80%',
    width: '90%',
  },
  container5: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container6: {
    height: HEIGHT * 0.08,
    width: WIDTH * 0.64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container7: {
    height: HEIGHT * 0.04,
    width: WIDTH * 0.64,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txt9: {
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    color: BLACK,

    letterSpacing: 1,
  },
  txt10: {
    color: TealBlue,
  },
  container8: {
    height: HEIGHT * 0.04,
    width: WIDTH * 0.64,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  txt11: {
    fontSize: 10,
    fontFamily: 'KronaOne-Regular',
    color: GrayishBlue,
  },
  container9: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container10: {
    height: HEIGHT * 0.05,
    width: WIDTH * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 7,
    elevation: 5,
    bottom: '8%',
  },
  img2: {
    height: HEIGHT * 0.03,
    width: HEIGHT * 0.025,
  },
  radioButton: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircle: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: WHITE,
  },
  radioSelected: {
    backgroundColor: GRAY,
  },
});
export default Home;
