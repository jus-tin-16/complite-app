import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Alert, 
    Modal, 
    ScrollView,
    Dimensions
} from 'react-native';
import { unenroll } from '@/utils/database';
import { fetchLesson } from '@/utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const EnrolledSection = ({section}) => {
    const [isLessonModalVisible, setLessonModalVisible] = useState(false);
    const [lesson, setLesson] = useState(null);

    const removeSection = async () => {
        try {
            const studid = await AsyncStorage.getItem('studentId');
            const remove = await unenroll(studid, section.enrollID);
            if (remove.success){
                Alert.alert('Success', remove.message);
            } else {
                Alert.alert('Error', remove.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const openLesson = async () => {
        try {
            const lessonData = await fetchLesson(1);
            setLesson(lessonData);
            setLessonModalVisible(true);
        } catch (error) {
            console.error('Error fetching lesson:', error);
            Alert.alert('Error', 'Could not fetch lesson');
        }
    }

    const formatLessonContent = (content) => {
        if (!content) return [];
        // Remove square brackets and split by commas
        return content.replace(/[\[\]"]/g, '').split(',').map(item => item.trim());
    }

    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionName}>{section.sectionName}</Text>
                <Text style={styles.teacherName}>{section.firstName} {section.middleName} {section.lastName}</Text>
                <Text style={styles.dateTime}>{section.dateTime}</Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={removeSection} 
                        style={styles.removeButton}
                    >
                        <Text style={styles.removeButtonText}>Unenroll Section</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={openLesson} 
                        style={styles.lessonButton}
                    >
                        <Text style={styles.lessonButtonText}>View Lesson 1</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isLessonModalVisible}
                onRequestClose={() => setLessonModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.lessonTitle}>Lesson 1</Text>
                        <ScrollView 
                            style={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                        >
                            {lesson && formatLessonContent(lesson.lessonContent).map((content, index) => (
                                <View key={index} style={styles.lessonParagraph}>
                                    <Text style={styles.lessonText}>{content}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        
                        <TouchableOpacity 
                            style={styles.doneButton}
                            onPress={() => setLessonModalVisible(false)}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F4F6',
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contentContainer: {
        padding: 16,
    },
    sectionName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#232946',
        marginBottom: 4,
    },
    teacherName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#232946',
        opacity: 0.8,
        marginBottom: 4,
    },
    dateTime: {
        fontSize: 14,
        color: '#232946',
        opacity: 0.6,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 12,
    },
    removeButton: {
        padding: 12,
        backgroundColor: '#FF4949',
        borderRadius: 12,
        flex: 1,
        elevation: 2,
    },
    removeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
    },
    lessonButton: {
        padding: 12,
        backgroundColor: '#FCD200',
        borderRadius: 12,
        flex: 1,
        elevation: 2,
    },
    lessonButtonText: {
        color: '#232946',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        width: width * 0.9,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        maxHeight: '80%',
        elevation: 5,
    },
    lessonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#232946',
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollView: {
        marginBottom: 20,
    },
    lessonParagraph: {
        marginBottom: 16,
    },
    lessonText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#232946',
        opacity: 0.9,
    },
    doneButton: {
        backgroundColor: '#FCD200',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    doneButtonText: {
        color: '#232946',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default EnrolledSection;