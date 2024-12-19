import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Modal, FlatList} from 'react-native';
import { deleteSection } from '@/utils/database';
import { getSectionStudents } from '@/utils/database';
import Ionicons from '@expo/vector-icons/Ionicons';

const COLORS = {
  background: '#F5F4F6',    // White Smoke
  primary: '#FCD200',       // Gold
  accent: '#E93023',        // Chili Red
  warning: '#3EB183',       // Mint
  text: '#232946',          // Space Cadet
};

const Section = ({section}) => {
    const [isStudentsModalVisible, setIsStudentsModalVisible] = useState(false);
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    const deleteSec = async () => {
        try {
            const del = await deleteSection(section.sectionID);
            if (del.success){
                Alert.alert('Success', del.message);
            } else {
                Alert.alert('Error', del.message);
            }
        } catch (error) {
            conseole.log(error);
        }   
    }

    const showEnrolledStudents = async () => {
      try {
          const students = await getSectionStudents(section.sectionID);
          setEnrolledStudents(students);
          setIsStudentsModalVisible(true);
      } catch (error) {
          console.log(error);
          Alert.alert('Error', 'Could not retrieve enrolled students');
      }
    }

    const renderStudentItem = ({ item }) => (
      <View style={styles.studentItem}>
          <Text style={styles.studentName}>
              {item.firstName} {item.middleName} {item.lastName}
          </Text>
          <Text style={styles.studentEmail}>{item.email}</Text>
      </View>
    );

    return(
      <View style={styles.container}>
      <View style={styles.contentContainer}>
          <Text style={styles.sectionName}>{section.sectionName}</Text>
          <Text style={styles.sectionCode}>Code: {section.sectionCode}</Text>
          <Text style={styles.dateTime}>{section.dateTime}</Text>
          
          <View style={styles.buttonContainer}>
              <TouchableOpacity 
                  onPress={showEnrolledStudents} 
                  style={[styles.actionButton, styles.viewStudentsButton]}
              >
                  <Text style={styles.buttonText}>View Students</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={deleteSec} 
                  style={[styles.actionButton, styles.removeButton]}
              >
                  <Text style={styles.buttonText}>Remove Section</Text>
              </TouchableOpacity>
          </View>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={isStudentsModalVisible}
          onRequestClose={() => setIsStudentsModalVisible(false)}
      >
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Enrolled Students</Text>
                      <TouchableOpacity 
                          onPress={() => setIsStudentsModalVisible(false)}
                          style={styles.closeButton}
                      >
                          <Ionicons name="close-circle" size={24} color={COLORS.accent} />
                      </TouchableOpacity>
                  </View>

                  {enrolledStudents.length > 0 ? (
                      <FlatList
                          data={enrolledStudents}
                          renderItem={renderStudentItem}
                          keyExtractor={(item) => item.studentId.toString()}
                          ListHeaderComponent={
                              <Text style={styles.studentCount}>
                                  Total Students: {enrolledStudents.length}
                              </Text>
                          }
                      />
                  ) : (
                      <View style={styles.emptyState}>
                          <Text style={styles.emptyStateText}>No students enrolled in this section</Text>
                      </View>
                  )}
              </View>
          </View>
      </Modal>
  </View>
    );
};

const styles = StyleSheet.create({
     // ... (previous styles remain the same)
     buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
  },
  actionButton: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 5,
      alignItems: 'center',
  },
  viewStudentsButton: {
      backgroundColor: COLORS.primary,
  },
  removeButton: {
      backgroundColor: COLORS.accent,
  },
  buttonText: {
      color: 'white',
      fontWeight: '600',
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      width: '90%',
      maxHeight: '70%',
      padding: 20,
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.text,
  },
  studentItem: {
      backgroundColor: COLORS.background,
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
  },
  studentName: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
  },
  studentEmail: {
      fontSize: 14,
      color: COLORS.text,
      opacity: 0.7,
  },
  studentCount: {
      textAlign: 'center',
      fontWeight: '600',
      marginBottom: 10,
      color: COLORS.text,
  },
  emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  emptyStateText: {
      color: COLORS.text,
      opacity: 0.6,
  },
});

export default Section;
