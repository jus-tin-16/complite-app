import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { getProfile, pointing } from '@/utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function studActivity() {
  const [progress, setProgress] = useState(0); // Tracks progress
  const [currentLevel, setCurrentLevel] = useState(1); // Unlocked levels
  const [userPoints, setUserPoints] = useState(0); // Experience points
  const [questionVisible, setQuestionVisible] = useState(false); // Modal visibility
  const [currentQuestion, setCurrentQuestion] = useState(null); // Current question data
  const [levelQuestions, setLevelQuestions] = useState([]); // Current level questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks which question is shown
  
  const getUserProfile = async () => {
    const studId = await AsyncStorage.getItem('studentId');
    console.log(studId);
    try {
      const profile = await getProfile(studId);
      console.log(profile);
      if (profile.success){
        setUserPoints(profile.student.totalpoints);
      } else {
        Alert.alert('Error', profile.message);
      }
    } catch (error) {
      console.log('Error');
    }
  }

  const recordPoints = async () => {
    try {
      const studid = await AsyncStorage.getItem('studentId');
      const p = await pointing(studid, userPoints);
      if (p.success){
        console.log(p.message);
      } else {
        console.log(p.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  // Questions grouped per level
  const levels = [
    {
      level: 1,
      questions: [
        {
          question: 'What does HTML stand for?',
          options: ['HyperText Markup Language', 'HyperTransfer Main Link', 'HyperText Main Language'],
          answer: 'HyperText Markup Language',
        },
        {
          question: 'Which tag is used for images in HTML?',
          options: ['<img>', '<picture>', '<image>'],
          answer: '<img>',
        },
      ],
    },
    {
      level: 2,
      questions: [
        {
          question: 'What is React Native?',
          options: ['Mobile App Framework', 'Game Engine', 'Web Browser'],
          answer: 'Mobile App Framework',
        },
        {
          question: 'Which component is used for touch events?',
          options: ['TouchableOpacity', 'Pressable', 'Button'],
          answer: 'TouchableOpacity',
        },
      ],
    },
    {
      level: 3,
      questions: [
        {
          question: 'Which language is used for styling web pages?',
          options: ['Python', 'CSS', 'Java'],
          answer: 'CSS',
        },
        {
          question: 'How do you apply styles in React Native?',
          options: ['CSS', 'Stylesheet', 'Inline'],
          answer: 'Stylesheet',
        },
      ],
    },
  ];

  // Start Level (Opens Modal)
  const startLevel = (level) => {
    const selectedLevel = levels.find((l) => l.level === level);
    setLevelQuestions(selectedLevel.questions);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(selectedLevel.questions[0]);
    setQuestionVisible(true);
  };

  // Validate Answer
  const checkAnswer = (selectedOption) => {
    if (selectedOption === currentQuestion.answer) {
      Alert.alert('Correct!', 'You answered correctly 🎉');
      setUserPoints(userPoints + 50);
      recordPoints();
      // Move to next question or finish level
      if (currentQuestionIndex + 1 < levelQuestions.length) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextQuestionIndex);
        setCurrentQuestion(levelQuestions[nextQuestionIndex]);
      } else {
        // Level Complete
        setProgress(progress + 1 / levels.length);
        setCurrentLevel(currentLevel + 1);
        Alert.alert('Level Complete!', `You've completed Level ${currentLevel} 🎖️`);
        setQuestionVisible(false);
        recordPoints();
      }
    } else {
      Alert.alert('Oops!', 'Wrong answer. Try again!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={{color: '#F5F4F6', fontSize: 24, fontWeight: 'bold'}}>Activities</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.headerText}>{userPoints} Points</Text>
          </View>
        </View>
      </View>

      {/* Levels - Step-wise Layout */}
      <ScrollView contentContainerStyle={styles.levelContainer}>
        {levels.map((levelData) => (
          <View key={levelData.level} style={styles.levelWrapper}>
            <TouchableOpacity
              style={[
                styles.levelCircle,
                levelData.level > currentLevel && styles.lockedLevel,
              ]}
              disabled={levelData.level > currentLevel}
              onPress={() => startLevel(levelData.level)}
            >
              {levelData.level <= currentLevel ? (
                <Ionicons name="lock-open" size={24} color="#FCD200" />
              ) : (
                <Ionicons name="lock-closed" size={24} color="#232946" />
              )}
              <Text style={styles.levelText}>
                {levelData.level <= currentLevel
                  ? `Level ${levelData.level}`
                  : 'Locked'}
              </Text>
            </TouchableOpacity>
            {/* Connector */}
            {levelData.level < levels.length && (
              <View style={styles.connector}></View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Question Modal */}
      <Modal
        visible={questionVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setQuestionVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.questionText}>{currentQuestion?.question}</Text>
            {currentQuestion?.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => checkAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F4F6' 
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#2C2C4E',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerItem: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#F5F4F6',
  },
  headerText: { 
    color: '#232946',
    fontSize: 16,
    fontWeight: 'bold'
  },
  levelContainer: { 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  levelWrapper: { 
    alignItems: 'center' 
  },
  levelCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
        android: {
        elevation: 10,
        shadowColor: '#52006A',
      },
    })
  },
  lockedLevel: { backgroundColor: '#444' },
  levelText: { color: '#FCD200', marginTop: 5 },
  connector: {
    width: 4,
    height: 30,
    backgroundColor: '#6C5CE7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#232946',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  questionText: { 
    color: '#F5F4F6', 
    fontSize: 18, 
    marginBottom: 10 
  },
  optionButton: {
    backgroundColor: '#FCD200',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: { color: '#232945', textAlign: 'center' },
});