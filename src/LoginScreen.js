import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import TransactionInfor from './TransactionInfor';
import CustomerDetail from './CustomerDetail';

import HomeScreen from './HomeScreen';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('0373007856');
  const [pass, setPass] = useState('123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const respone = await fetch(
        'https://kami-backend-5rs0.onrender.com/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone,
            password: pass,
          }),
        }
      );

      const data = await respone.json();
      console.log(data);
      if (respone.ok) {
        const token = data.token || data.accessToken;

        if (token) {
          await AsyncStorage.setItem('userToken', token);
          Alert.alert('Sucess', 'login SuccessFully!', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('MainTabs', { scrren: 'HomeScreen' });
              },
            },
          ]);
        }
      } else {
        Alert.alert('login falied', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('connection error!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.text, styles.textInput]}
        value={phone}
        placeholder="Phone"
        onChangeText={setPhone}></TextInput>
      <TextInput
        style={[styles.text, styles.textInput]}
        value={pass}
        placeholder="Password"
        onChangeText={setPass}
        secureTextEntry={true}></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    fontSize: 40,
    color: '#EF506B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#EF506B',
    width: '100%',
    borderRadius: 12,
    height: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  textInput: {
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: '#646464',
    borderRadius: 12,
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: '#646464',
  },
});
