import { StyleSheet, Text, View, Pressable, Platform, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router'
import Image from '../assets/complite-logo.png';
import Ionicons from '@expo/vector-icons/Ionicons';

const openLesson = () => {
  router.push('./studLesson');
}

const closeSection = () => {
  router.dismiss();
}

export default function Section() {
  return (
    <View style={styles.container}>
      <Pressable onPress={closeSection} style={styles.backButton}>
        <Ionicons name="return-up-back" size={24} color="#F27B12" />
        <Text style={{color: '#F27B12'}}>Close</Text>
      </Pressable>
      <Text style={styles.headText}>Section Name</Text>
      <ScrollView>
        <TouchableOpacity style={[styles.Card, styles.Shadow]} onPress={openLesson}>
          <View style={styles.CardImage}>
            <ImageBackground source={Image} resizeMode='cover' />
          </View>
          <View style={styles.CardBody}>
            <Text style={styles.CardTitle}>Lesson Title</Text>
            <Text style={styles.CardDesc}>Description</Text>
          </View>
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
    fontSize: 32,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.25,
    elevation: 5,
  },
  Shadow: Platform.select({
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
  backButton: {
    padding: 10,
    opacity: .85,
  },
});