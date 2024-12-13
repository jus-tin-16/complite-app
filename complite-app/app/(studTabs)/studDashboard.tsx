import { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Modal, TextInput } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEnrollSection, enrollToSection } from "@/utils/database";
import EnrollSection from '../components/enrolledSectionList.js';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function studDashboard() {
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [secCode, setSecCode] = useState('');
    
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      enrolledSections();
    }, 2000);
  }, []);

  const enrolledSections = async () => {
    const studentid = await AsyncStorage.getItem('studentId');
    try {
      const enrolled = await getEnrollSection(studentid);
      console.log(enrolled);
      setSections(enrolled);
    } catch (error) {
      console.log(error);
    }
  }

  const enrollSection = async () => {
    try {
      const id = await AsyncStorage.getItem('studentId');
      const enroll = await enrollToSection(secCode, id);
      console.log(enroll);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    enrolledSections();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Your Sections</Text>
      <FlatList
        data={sections}
        renderItem={({ item }) => <EnrollSection section={ item }/>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Modal 
        animationType="fade"
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
                <Text>Enroll Section</Text>
                <TextInput editable value={secCode} onChangeText={setSecCode} placeholder='Section Code' />
                    
                <TouchableOpacity onPress={enrollSection}>
                  <Text>Enroll Section</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text>Enroll</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
});