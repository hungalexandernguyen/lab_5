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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddService from './AddService';
import AddCustomer from './AddCustomer';

import CustomerDetail from './CustomerDetail';

const CustomerInfor = ({ navigation }) => {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const respone = await fetch(
        'https://kami-backend-5rs0.onrender.com/customers'
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
      onPress={() => {
        navigation.navigate('CustomerDetail', { id: item._id });
      }}>
      <View>
        <Text style={styles.text}>Customer {item.name}</Text>
        <Text style={styles.text}>Phone {item.phone}</Text>
        <Text style={styles.text}>
          Total Pay
          <Text style={styles.highlightedText}> {item.totalSpent} đ</Text>
        </Text>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={[styles.highlightedText, { marginRight: 50 }]}>
          <MaterialCommunityIcons name="crown" size={30} color="#EF506B" />
        </Text>

        <Text style={[styles.highlightedText, { marginRight: 50 }]}>
          {item.loyalty}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Customer</Text>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="account-circle" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.servicesContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        <TouchableOpacity
          style={[styles.button, { marginBottom: 50, marginLeft: '85%' }]}
          onPress={() => {
            navigation.navigate('AddCustomer');
          }}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomerInfor;

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
    height: 100,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 50,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlightedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF506B',
  },
});
