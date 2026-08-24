import axios from 'axios';
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

const EditCustomer = ({ navigation, route }) => {
  const { customer } = route.params || {};
  const [name, setName] = useState(customer?.name || '');
  const [phone, setPhone] = useState(customer?.phone || '');

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(
        `https://kami-backend-5rs0.onrender.com/Customers/${customer._id}`,
        { name: name, phone: phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', 'Success!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error');
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
        <Text style={styles.headerText}>Edit Customer</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.text}>Customer Name* </Text>
        <TextInput
          style={styles.textInput}
          placeholder="enter customer name"
          value={name}
          onChangeText={setName}></TextInput>

        <Text style={styles.text}>Phone * </Text>
        <TextInput
          style={styles.textInput}
          placeholder="enter Phone numb "
          value={phone}
          onChangeText={setPhone}></TextInput>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditCustomer;

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
