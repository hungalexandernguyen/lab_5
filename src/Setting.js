import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

const Setting = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    Alert.alert('Confirm', 'Logout?', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('userToken');

            navigation.replace('LoginScreen');
          } catch (error) {
            console.error(error);
            Alert.alert('error');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons
            color="white"
            name="arrow-back"
            size={24}
            fontWeight="Bold"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Setting</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSubmit()}>
          LogOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#EF506B',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EF506B',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#646464',
    borderRadius: 12,
    marginTop: 10,
    paddingLeft: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
