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

const AddService = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const respone = await fetch(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            price: Number(price),
          }),
        }
      );

      if (respone.ok) {
        Alert.alert('add Success!');
      } else {
        Alert.alert('add Failed');
      }
    } catch (error) {
      console.error(error);
    }
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
        <Text style={styles.headerText}>Service</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.text}>Service Name* </Text>
        <TextInput
          style={styles.textInput}
          placeholder="enter service name"
          value={name}
          onChangeText={setName}></TextInput>

        <Text style={styles.text}>Price * </Text>
        <TextInput
          style={styles.textInput}
          placeholder="enter Price "
          value={price}
          onChangeText={setPrice}></TextInput>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddService;

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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25,
  },
  textInput: {
    width: '100%',
    height: 35,
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
