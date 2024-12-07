import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Activity() {
  const [isStart, setIsStart] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };


  if (isStart){
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View 
            style={{justifyContent: 'center', alignItems: 'center'}}
          >
            <ProgressBar progress={progress} width={200} height={20} />
            <Text style={{textAlign: 'center'}}>{(progress * 100).toFixed(0)}%</Text>
          </View>
          <Text style={styles.lessonTitle}>Item 1</Text>
          <Text style={styles.lessonPara}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          <Image width={'auto'} height={100} style={{backgroundColor: 'yellow', marginVertical: 20,}} />
          <View style={styles.choices}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.choicesButton} onPress={handlePress}>
                <Text style={{color: '#0D4DD6'}}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choicesButton} onPress={handlePress}>
                <Text style={{color: '#0D4DD6'}}>B</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.choicesButton} onPress={handlePress}>
                <Text style={{color: '#0D4DD6'}}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choicesButton} onPress={handlePress}>
                <Text style={{color: '#0D4DD6'}}>D</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actBackButton} onPress={() => setIsStart(false)}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goButton} onPress={handlePress}>
              <Text style={{color: '#FFFAFA'}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="return-up-back" size={24} color="#F27B12" />
          <Link dismissTo style={{color: '#F27B12'}} href='./studLesson'>Go back</Link> 
        </TouchableOpacity>
        <Text style={styles.lessonTitle}>Activity</Text>
        <Text style={styles.lessonPara}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        <View style={styles.imgContainer}>
          <Image width={150} height={150} style={{backgroundColor: 'yellow', marginVertical: 20,}} />
          <Text style={styles.lessonTitle}>Goodluck!</Text>
        </View>
        <TouchableOpacity style={styles.goButton} onPress={() => setIsStart(true)}>
          <Text style={{color: '#FFFAFA', fontSize: 24,}}>Start</Text> 
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFEFA',
  },
  lessonTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#0D4DD6',
  },
  lessonPara: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
    textAlign: 'justify',
    marginVertical: 20,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    opacity: .85,
  },
  goButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#0D4DD6',
  },
  bar: {
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  actBackButton: {
    padding: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#F27B12',
    opacity: .85,
  },
  choices: {
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  choicesButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#0D4DD6',
    backgroundColor: '#FFFAFA',
    borderWidth: 1,
    flex: 1,
    margin: 5,
  }
});