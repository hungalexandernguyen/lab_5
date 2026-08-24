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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { CreateNativeStackNavigator } from '@react-navigation/native-stack';
import AddService from './AddService';

import SeviceDetail from './ServiceDetail';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const respone = await fetch(
        'https://kami-backend-5rs0.onrender.com/services'
      );
      const data = await respone.json();
      if (respone.ok) {
        setData(data);
      } else {
        Alert.alert('loading error!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.services}
      onPress={() => navigation.navigate('SeviceDetail', { id: item._id })}>
      <Text style={styles.text}>{item.name}</Text>
      <Text>{item.price}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>HUYỀN TRINH</Text>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="account-circle" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.servicesContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Danh Sách dịch Vụ </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddService')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#EF506B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicesContainer: {
    flex: 1,
    padding: 20,
  },
  services: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 15,
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
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
