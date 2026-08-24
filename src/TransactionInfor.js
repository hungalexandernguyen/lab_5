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
import TransactionDetail from './TransactionDetail';
import AddCustomer from './AddCustomer';
import Setting from './Setting';

import ServiceDetail from './ServiceDetail';

const TransactionInfor = ({ navigation }) => {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const respone = await fetch(
        'https://kami-backend-5rs0.onrender.com/transactions'
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
        navigation.navigate('TransactionDetail', { id: item._id });
      }}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, { fontSize: 16 }]}>
          {item.id} {'-'} {formatDate(item.createdAt)}
          {'-'}
          <Text style={[styles.text, { color: 'red', fontSize: 16 }]}>
            {item.status}
          </Text>
        </Text>
        <Text style={styles.text}>
          {item.services.map((services) => `-${services.name}`).join('\n')}
        </Text>
        <Text style={[styles.text, { color: '#848484' }]}>
          Customer: {item.customer.name}
        </Text>
      </View>
      <Text style={[styles.highlightedText, { paddingRight: 15 }]}>
        {item.customer.totalSpent} đ
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Setting')}>
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
          onPress={() => navigation.navigate('AddTransaction')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
export default TransactionInfor;

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
