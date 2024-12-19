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
import { getProfile, pointing, getActivities } from '@/utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Question {
  activityID: number;
  question: string;
  options: string[];
  answer: string;
}

interface Level {
  level: number;
  questions: Question[];
}

export default function studActivity() {
  const [progress, setProgress] = useState(0); // Tracks progress
  const [currentLevel, setCurrentLevel] = useState(1); // Unlocked levels
  const [userPoints, setUserPoints] = useState(0); // Experience points
  const [questionVisible, setQuestionVisible] = useState(false); // Modal visibility
  const [currentQuestion, setCurrentQuestion] = useState(null); // Current question data
  const [levelQuestions, setLevelQuestions] = useState([]); // Current level questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks which question is shown
  const [levels, setLevels] = useState<Level[]>([]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([1]);
  const [studentId, setStudentId] = useState<string | null>(null);
  
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    const id = await AsyncStorage.getItem('studentId');
    setStudentId(id);
    getUserProfile(id);
    await fetchActivities(id);
  };

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

  const fetchActivities = async (id: string | null) => {
    try {
      const data = await getActivities();
      if (data.success && data.levels) {
        setLevels(data.levels);
        const storedProgress = await AsyncStorage.getItem(`completedLevels_${id}`);
        if (storedProgress) {
          setCompletedLevels(JSON.parse(storedProgress));
        } else {
          // Default to Level 1
          setCompletedLevels([1]);
          await AsyncStorage.setItem(`completedLevels_${id}`, JSON.stringify([1]));
        }
      } else {
        Alert.alert('Error', 'No activities found');
      }
    } catch (error) {
      console.log('Error fetching activities:', error);
    }
  };

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

  const startLevel = (level: number) => {
    // Allow Level 1 to always be accessible
    if (level !== 1 && !completedLevels.includes(level - 1)) {
      Alert.alert('Locked', 'Complete the previous level first');
      return;
    }
  
    const selectedLevel = levels.find((l) => l.level === level);
    if (selectedLevel) {
      setLevelQuestions(selectedLevel.questions);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(selectedLevel.questions[0]);
      setQuestionVisible(true);
      setCurrentLevel(level);
    }
  };

  // Validate Answer
  const checkAnswer = async (selectedOption: string) => {
    if (currentQuestion && selectedOption === currentQuestion.answer) {
      Alert.alert('Correct!', 'You answered correctly 🎉');
      const newPoints = userPoints + 50;
      setUserPoints(newPoints);
      await recordPoints();
  
      if (currentQuestionIndex + 1 < levelQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentQuestion(levelQuestions[currentQuestionIndex + 1]);
      } else {
        const newLevel = currentLevel + 1;
        const updatedCompletedLevels = Array.from(new Set([...completedLevels, currentLevel, newLevel]));
        
        setCompletedLevels(updatedCompletedLevels);
        await AsyncStorage.setItem(`completedLevels_${studentId}`, JSON.stringify(updatedCompletedLevels));
        
        setProgress(progress + 1 / levels.length);
        setQuestionVisible(false);
        
        Alert.alert('Level Complete!', `You've completed Level ${currentLevel} 🎖️`);
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

      <ScrollView contentContainerStyle={styles.levelContainer}>
        {levels.map((levelData) => (
          <View key={levelData.level} style={styles.levelWrapper}>
            <TouchableOpacity
              style={[
                styles.levelCircle,
                !completedLevels.includes(levelData.level) && styles.lockedLevel,
              ]}
              disabled={!completedLevels.includes(levelData.level)}
              onPress={() => startLevel(levelData.level)}
            >
              <Ionicons
                name={completedLevels.includes(levelData.level) ? 'lock-open' : 'lock-closed'}
                size={24}
                color="#FCD200"
              />
              <Text style={styles.levelText}>
                {completedLevels.includes(levelData.level) ? `Level ${levelData.level}` : 'Locked'}
              </Text>
            </TouchableOpacity>
            {levelData.level < levels.length && <View style={styles.connector}></View>}
          </View>
        ))}
      </ScrollView>

      <Modal visible={questionVisible} animationType="slide" transparent onRequestClose={() => setQuestionVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.questionText}>{currentQuestion?.question}</Text>
            {currentQuestion?.options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionButton} onPress={() => checkAnswer(option)}>
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
  container: { flex: 1, backgroundColor: '#F5F4F6' },
  header: { flexDirection: 'row', padding: 20, backgroundColor: '#2C2C4E' },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  headerText: { color: '#FCD200', fontSize: 16 },
  levelContainer: { alignItems: 'center', paddingVertical: 20 },
  levelWrapper: { alignItems: 'center' },
  levelCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#6C5CE7', alignItems: 'center', justifyContent: 'center' },
  lockedLevel: { backgroundColor: '#444' },
  levelText: { color: '#FCD200', marginTop: 5 },
  connector: { width: 4, height: 30, backgroundColor: '#6C5CE7' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  modalContent: { backgroundColor: '#232946', padding: 20, borderRadius: 10, width: '80%' },
  questionText: { color: '#F5F4F6', fontSize: 18, marginBottom: 10 },
  optionButton: { backgroundColor: '#FCD200', padding: 10, marginVertical: 5, borderRadius: 5 },
  optionText: { color: '#232945', textAlign: 'center' },
});