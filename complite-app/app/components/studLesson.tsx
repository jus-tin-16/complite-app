import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Lessons() {
  return (
    <View style={styles.container}>
        <Text style={styles.lessonTitle}>Lesson</Text>
        <Text style={styles.lessonPara}>{'\t'}Lorem ipsum odor amet, consectetuer adipiscing elit. Venenatis volutpat porttitor laoreet viverra, mus etiam sem. Finibus vel dui class eu iaculis. Litora sem sapien magna phasellus ipsum turpis primis sem. Himenaeos per odio blandit; ullamcorper taciti finibus pharetra. Risus elit posuere rhoncus at quis cubilia praesent lacus id. Interdum ut accumsan; integer feugiat montes vehicula senectus vulputate.</Text>
        <Image width={'auto'} height={100} style={{backgroundColor: 'yellow', marginVertical: 20,}} />
        <Text style={styles.lessonPara}>{'\t'}Eu tempor magnis natoque est maecenas montes. Suscipit nascetur sodales mattis placerat non a integer eleifend! Accumsan in sollicitudin pharetra, mauris nisl gravida arcu nisl. Finibus consequat interdum fermentum fermentum augue. Netus torquent porttitor tempus, porta nec leo dignissim. Platea gravida fusce praesent rhoncus ac. Libero adipiscing egestas habitasse aliquam eros ad dictum.</Text>
        <View style={styles.buttonGroup}>  
            <TouchableOpacity style={styles.backButton}>
                <Link dismissTo style={{color: '#F27B12'}} href='./studSection'>Go back</Link> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.goButton}>
                <Link push style={{color: '#FFFAFA'}} href='./studActivity'>Take Activity</Link> 
            </TouchableOpacity>
        </View>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#F27B12',
    opacity: .85,
  },
  goButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0D4DD6',
  }
});