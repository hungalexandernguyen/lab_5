import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import CustomerInfor from './CustomerInfor';

const CustomerDetail = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const [customer, setCustomer] = useState(null);

  const handleSubmit = async () => {
    try {
      const respone = await axios.get(
        `https://kami-backend-5rs0.onrender.com/Customers/${id}`
      );
      const data = respone.data;
      setCustomer(data);
    } catch (error) {
      console.error('error:', error);
      alert.alert('error!');
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleDelete = () => {
    Alert.alert('Alert', 'are you sure wanting to delele this user?', [
      { text: 'cancel' },
      {
        text: 'delete',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            await axios.delete(
              `https://kami-backend-5rs0.onrender.com/Customers/${id}`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            Alert.alert('Delete User!'),
              navigation.nagivate('MainTabs', { screen: 'CustomerInfor' });
          } catch (error) {
            Alert.alert('error', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons
              color="white"
              name="arrow-back"
              size={24}
              fontWeight="Bold"
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, { marginBottom: 15 }]}>
            Customer Detail
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={[styles.button, { marginLeft: 30 }]}
            onPress={() =>
              navigation.navigate('EditCustomer', { customer: customer })
            }>
            <Text style={[styles.headerText, {}]}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <MaterialIcons color="white" name="more-vert" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.highlightedText}>General Information</Text>
        <Text style={styles.text}> Name:{customer?.name}</Text>
        <Text style={styles.text}> Phone:{customer?.phone}</Text>
        <Text style={styles.text}>Total Spent:{customer?.totalSpent}</Text>
        <Text style={styles.text}>Time :{customer?.createdAt}</Text>
        <Text style={styles.text}>Last Update :{customer?.updatedAt}</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.highlightedText}>Transaction History</Text>
        {customer?.transactions?.map((transactions) => (
          <View key={transactions._id}>
            <Text style={styles.text}> ID:{transactions?._id}</Text>
            {customer?.transactions?.services?.map((services) => (
              <View key={services._id}>
                <Text style={styles.text}> ID:{services?._id}</Text>
                <Text style={styles.text}> Name:{services?.phone}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
export default CustomerDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  headerContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#EF506B',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  servicesContainer: {
    flex: 1,
    padding: 20,
  },

  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#EF506B',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },
  highlightedText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EF506B',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
