import { Text, View, StyleSheet, TextInput, SafeAreaView, Image, TouchableOpacity, Alert, Pressable, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getProfile, sendReport } from "@/utils/database";

export default function studProfile() {
  const [accId, setAccId] = useState();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [points, setPoints] = useState('');
  const [grades, setGrades] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [report, setReport] = useState('');

  const getUserProfile = async () => {
    const studId = await AsyncStorage.getItem('studentId');
    console.log(studId);
    try {
      const profile = await getProfile(studId);
      console.log(profile);
      if (profile.success){
        setAccId(profile.student.accountid);
        setFirstname(profile.student.firstname);
        setLastname(profile.student.lastname);
        setMiddlename(profile.student.middlename);
        setSex(profile.student.sex);
        setEmail(profile.student.email);
        setBirthdate(profile.student.birthdate);
        setPoints(profile.student.totalpoints);
        setGrades(profile.student.totalgrades);
        setProfilePic(profile.student.profilePhoto);
      } else {
        Alert.alert('Error', profile.message);
      }
    } catch (error) {
      console.log('Error');
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const sendTheReport = async () => {
    try {
      const feedback = await sendReport(accId, report);
      if (feedback.success){
        Alert.alert('Success', feedback.message);
        setReport('');
        setIsModalVisible(false);
      } else {
        Alert.alert('Error', feedback.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogOut =  async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('accountId');
    await AsyncStorage.removeItem('studentId');
    await AsyncStorage.removeItem('account');
    router.dismissTo('/');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{points}</Text>
        <Text>{grades}</Text>
      </View>
      <View style={styles.groupButtons}>
        <Pressable>
          <Ionicons name="notifications" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="black" />
        </Pressable>
      </View>
      <View >
        <Image />
      </View>

      <Modal 
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible)
        }}
      >
        <View style={styles.CenterView}>
          <View style={styles.ModalView}>
            <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
            <Text>Report Form</Text>
            <TextInput editable={false} value={accId} placeholder={JSON.stringify({accId})}/>
            <TextInput
              editable
              multiline
              numberOfLines={10}
              maxLength={250}
              style={styles.textArea}
              placeholder="Your report"
              value={report}
              onChangeText={setReport}
            />
            <TouchableOpacity onPress={sendTheReport}>
              <Text>Send Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text>{firstname} {middlename} {lastname}</Text>
      <Text>Email: {email}</Text>
      <Text>Sex: {sex}</Text>
      <Text>Birthdate: {birthdate}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text>Logout</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
  },
  CenterView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 350,
    height: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textArea: {
    padding: 10,
    borderWidth: 1,
  },
});