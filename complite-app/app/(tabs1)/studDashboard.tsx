import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ImageBackground, 
  Platform,
  Modal,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';

const Logout = () => {
  router.dismissAll();
}

const openSection = () => {
  router.push('/components/studSection');
}
  
export default function AboutScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable style={styles.user} onPress={() => setIsProfileVisible(true)}>
          <View style={styles.userAvatar}>
            <Image source={require('../assets/avatar.png')} style={styles.Avatar}/>
            <Text style={styles.headText}>Hi, User!</Text>
          </View>
          <View style={styles.userPoints}>
            <Ionicons name="star" size={18} color="#F27B12" />
            <Text style={{fontSize: 14, color: '#F27B12'}}>100</Text>
          </View>
        </Pressable>

        <Modal 
          animationType='slide'
          transparent={true}
          visible={isProfileVisible}
          onRequestClose={() =>{
            setIsProfileVisible(!isProfileVisible);
          }}
        >
          <View style={styles.containerModal}>
            <Pressable
              onPress={() => setIsProfileVisible(!isProfileVisible)}
            >
              <Ionicons name="close-circle-sharp" size={24} color="#F27B12" />
            </Pressable>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image source={require('../assets/avatar.png')} style={styles.ProfileAvatar}/>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#0D4DD6',
                textAlign: 'center',
                marginVertical: 10,
              }}>User</Text>
              <View style={styles.userPoints}>
                <Ionicons name="star" size={24} color="#F27B12" />
                <Text style={{fontSize: 20, color: '#F27B12'}}>100</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.CardTitle}>Email: </Text>
              <Text style={styles.CardDesc}>sample.com</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.CardTitle}>BirthDate: </Text>
              <Text style={styles.CardDesc}>Dec.05, 2024</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.CardTitle}>Sex: </Text>
              <Text style={styles.CardDesc}>Male</Text>
            </View>
          </View>
        </Modal>

          <TouchableOpacity  style={styles.Card} onPress={openSection}>
            <View style={styles.CardImage}>
              <ImageBackground source={require('../assets/complite-logo.png')} resizeMode='cover' />
            </View>
            <View style={styles.CardBody}>
              <Text style={styles.CardTitle}>Section Name</Text>
              <Text style={styles.CardDesc}>Description</Text>
            </View>
          </TouchableOpacity>

          <Modal 
            animationType='slide'
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}
          >
            <View style={styles.containerModal}>
              <View style={styles.modalView}>
                <Pressable
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <Ionicons name="close-circle-sharp" size={24} color="#F27B12" />
                </Pressable>
                <Text style={styles.headText}>Enter Section Code</Text>
                <TextInput placeholder='Section Code'onFocus={() => {styles.active}} style={styles.input} />
                <TouchableOpacity style={styles.buttonSub}>
                  <Text style={{color: '#FFFEFA', textAlign: 'center'}}>Add Section</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
            <Ionicons name='add-circle-outline' size={24} color="#F27B12" />
            <Text style={{color: '#F27B12', fontWeight: '500'}}>Enroll Section</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSub} onPress={Logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEFA',
    padding: 20,
  },
  Scroll: {
    justifyContent: 'space-around',
  },
  headText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D4DD6',
  },
  Card: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#FFFAFA',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 30,
      ...Platform.select({
        ios: {
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 5,
          shadowColor: '#171717',
        }
      }),
  },
  CardBody: {
    padding: 20,
  },
  CardTitle: {
    fontSize: 24,
    color: '#0D4DD6',
    fontWeight: 'bold',
  },
  CardDesc: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '400',
  },
  CardImage: {
    flex: 1,
    justifyContent: 'center',
    width: 'auto',
    height: 150,
    backgroundColor: '#FFFF2F',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addButton: {
    opacity: .7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 5,
    borderColor: '#F27B12',
    borderStyle: 'dotted',
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#0D4DD6',
    borderRadius: 5,
    marginVertical: 10,
  },
  active: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#F27B12',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonSub: {
    backgroundColor: '#0D4DD6',
    borderRadius: 5,
    padding: 10,
  },
  containerModal: {
    flex: 1,
    backgroundColor: '#FFFEFA',
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
        shadowColor: '#171717',
      },
    }),
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userAvatar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userPoints: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFAFA',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
        shadowColor: '#171717',
      }
    }),
  },
  Avatar: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  ProfileAvatar: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#FFFAFA',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        android: {
          elevation: 5,
          shadowColor: '#171717',
        }
      }),
  }
});