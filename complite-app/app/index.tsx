import { useState, useEffect } from "react";
import { 
    Text,
    TextInput,
    TouchableOpacity,
    View, 
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    Modal,
    Pressable,
    Platform,
    Dimensions,
    Alert
  } from "react-native";
import { router } from 'expo-router';
import { loginUser } from '../utils/database';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [isLogVisible, setIsLogVisible] = useState(false);


  const loginSubmit = async () => {
    if (!username || !password){
      Alert.alert('Error', 'Please fill out the required fields.');
      return;
    }

    try {
      const response = await loginUser(username, password);
      if(response){
        Alert.alert('Success', 'Nice');
        setUsername('');
        setPassword('');
        setIsLogVisible(false);
        router.navigate('/(tabs1)/studDashboard');
      } else {
        console.log(response);
        Alert.alert('Error');
      }
    } catch (error) {

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{
            fontSize: 24,
            fontWeight: '600'
          }}
        >Hello, Students!</Text>
        <Image source={require('../assets/Robot.png')} style={styles.charImage} />
        <Text style={{
            fontSize: 32,
            fontWeight: 'bold'
          }}
        >Welcome to COMPLITE</Text>
      </View>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={isLogVisible}
        onRequestClose={() => {setIsLogVisible(!isLogVisible)}}
      >
        <View>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.header}>Login</Text>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput 
                style={styles.inputUser}
                placeholder="Enter Username" 
                value={username}
                onChangeText={setUsername}
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputUser}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.loginButton} onPress={loginSubmit}>
                <Text style={styles.buttonLabel}>Login</Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => setIsLogVisible(!isLogVisible)}>
                <Text style={styles.button}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => setIsLogVisible(true) }>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
  
  const styles = StyleSheet.create({
    container: {  
      flex: 1,
    },
    upperContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    loginButton: {
      backgroundColor: 'blue',
      marginHorizontal: 20,
      marginVertical: 30,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center'
    },
    buttonLabel: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white' 
    },
    charImage: {
      width: 200,
      height:  200,
    },
    centeredView: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      flex: 1,
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
        }
      }),
    },
    header: {
      textAlign: 'center',
      fontSize: 32,
      fontWeight: '600',
      marginBottom: 10,
    },
    inputLabel: {
      fontSize: 24,
      fontWeight: '600',
      marginVertical: 10,
    },
    inputUser:{
      borderWidth: 2,
      borderColor: 'blue',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
      color: 'white',
    },
    button: {
      textAlign: 'center',
      padding: 10,
    },
});
