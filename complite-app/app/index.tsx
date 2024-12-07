import { useState, useEffect } from "react";
import { 
    Text,
    TextInput,
    TouchableOpacity,
    View, 
    StyleSheet,
    SafeAreaView,
    FlatList
  } from "react-native";
import { Link } from 'expo-router';
import axios from 'axios';

export default function Index() {
  const [student, setStudents] = useState();
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    async function getAllStudent(){
      try {
        const student = await axios.get('http://10.0.2.2:8000/api/account');
        console.log(student.data);
        setStudents(student.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllStudent(); 
  }, []);

  if (isLoggedIn) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>  
            <Link href="/studDashboard" style={styles.button}>
              Go to About screen
            </Link>
          </View>
          <View style={
            {
              flex: 2,
              backgroundColor: 'yellow',
            }}
          >
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={() => setIsLoggedIn(false)}
            >
              <Text style={styles.label}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.logo}>LOGO</Text>
        <Text style={styles.label}>Email/Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email/Username"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
        />
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => setIsLoggedIn(true)}
        >
          <Text style={styles.label}>Login</Text>
        </TouchableOpacity>
        <FlatList
          data={student}
          renderItem={({item})=><Text style={styles.label}>{item.username}</Text>}
        />
      </View>
    </SafeAreaView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    header: {
      flex: 1,
      backgroundColor: 'red',
    },
    body: {
      backgroundColor: 'yellow',
    },
    formContainer: {
      width: '70%',
      height: '50%',
      backgroundColor: 'darkgrey',
      padding: 20,
      borderRadius: 20,
      justifyContent: 'center',
    },
    logo: {
      textAlign: 'center',
      fontSize: 32,
      fontWeight: '600',
      color: 'white',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
      color: 'white',
    },
    input: {
      fontSize: 16,
      color: 'gray',
      backgroundColor: 'white',
      marginBottom: 20,
      padding: 10,
      borderRadius: 10,
    },
    loginButton: {
      backgroundColor: 'brown',
      width: '30%',
      alignItems: 'center',
      padding: 10,
      alignSelf: 'center',
    },
    button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: '#fff',
    },
});
