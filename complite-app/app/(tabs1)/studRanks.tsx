import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Platform, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Rankings() {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Rankings</Text>
      <ScrollView>
        <View style={styles.Card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.Position}>1</Text>
            <Image source={require('../assets/avatar.png')} alt='avatar' style={styles.Avatar}/>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFEFA'}}>
            <Ionicons name="star" size={24} color="#F27B12" />
            <Text style={styles.userPoint}>500 </Text>
          </View>
        </View>
        <View style={styles.Card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.Position}>2</Text>
            <Image source={require('../assets/avatar.png')} alt='avatar' style={styles.Avatar}/>
            <Text style={styles.userName}>Bobby Brown</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFEFA'}}>
            <Ionicons name="star" size={24} color="#F27B12" />
            <Text style={styles.userPoint}>500 </Text>
          </View>
        </View>
        <View style={styles.Card}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.Position}>3</Text>
            <Image source={require('../assets/avatar.png')} alt='avatar' style={styles.Avatar}/>
            <Text style={styles.userName}>Elliot Marx</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFEFA'}}>
            <Ionicons name="star" size={24} color="#F27B12" />
            <Text style={styles.userPoint}>500 </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFEFA',
  },
  headText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D4DD6',
    textAlign:'center'
  },
  Card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFAFA',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
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
  Avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0D4DD6',
  },
  userPoint: {
    color: '#F27B12',
    fontSize: 16,
    marginLeft: 5,
  },
  Position: {
    color: '#F27B12',
    fontSize: 32,
    fontWeight: '700',
    marginRight: 10,
  }
});