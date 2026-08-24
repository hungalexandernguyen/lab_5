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
import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import EditService from './EditService';
import TransactionInfor from './TransactionInfor';
import axios from 'axios';

const TransactionDetail = ({ navigation, route }) => {
  const { id } = route.params || {};
  const [transaction, setTransaction] = useState(null);

  const totalAmount = useMemo(() => {
    if (!transaction?.services) return 0;

    return transaction.services.reduce(
      (total, service) => total + service.price * service.quantity,
      0
    );
  }, [transaction]);
  const handleSubmit = async () => {
    try {
      const respone = await fetch(
        `https://kami-backend-5rs0.onrender.com/transactions/${id}`
      );
      const data = await respone.json();

      if (respone.ok) {
        setTransaction(data);
      }
    } catch (error) {
      console.error(Error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleDelete = () => {
    Alert.alert('Alert', 'Are you sure want to delete this transaction?', [
      {
        text: 'cancel',
      },
      {
        text: 'delete',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            await axios.delete(
              `https://kami-backend-5rs0.onrender.com/transactions/${id}`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            Alert.alert('delete successFully!');
          } catch (error) {
            Alert.alert('error while deleting transaction!');
          }
        },
      },
    ]);
  };

  const originMoney = transaction?.priceBeforePromotion || 0;
  const totalPayment = originMoney - transaction?.price || 0;
  const finalPayment = originMoney - totalPayment;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TransactionInfor')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons
              color="white"
              name="arrow-back"
              size={24}
              fontWeight="Bold"
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, { marginBottom: 15 }]}>
            Transaction Detail
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EditTransaction', {
                transaction: transaction,
              })
            }>
            <Text style={[styles.headerText, { paddingTop: 10 }]}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <MaterialIcons color="white" name="more-vert" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.highlightedText}>General Information</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Transaction Code:</Text>
          <Text style={styles.boldText}> {transaction?.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Customer:</Text>
          <Text style={styles.boldText}> {transaction?.customer.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Creation time</Text>
          <Text style={styles.boldText}>
            {' '}
            {formatDate(transaction?.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.highlightedText}>Service List</Text>
        <View style={styles.row}>
          <Text style={styles.text}>
            {transaction?.services?.map((services) => services.name).join('\n')}
          </Text>
          <Text style={styles.boldText}>
            {transaction?.services
              ?.map((services) => services.quantity)
              .join('\n')}
          </Text>
          <Text style={styles.boldText}>
            {transaction?.services
              ?.map((services) => services.price)
              .join('\n')}{' '}
            đ
          </Text>
        </View>
        <Text style={[styles.text, { paddingTop: 100 }]}>
          Total:
          <Text style={[styles.boldText, { color: 'black' }]}>
            {totalAmount} đ
          </Text>
        </Text>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.highlightedText}>Cost</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Amount of Money</Text>
          <Text style={styles.boldText}> {totalAmount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Dismount</Text>
          <Text style={styles.boldText}>${totalPayment}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.boldText}>Total Payment</Text>
          <Text style={styles.highlightedText}>${finalPayment}</Text>
        </View>
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
export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CECECE',
  },
  headerContainer: {
    width: '100%',
    height: 80,
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
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  row: { justifyContent: 'space-between', flexDirection: 'row' },

  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EF506B',
    borderRadius: 5,
    padding: 5,
    margin: 10,
  },

  text: {
    fontSize: 20,
    color: '#9D9D9D',
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlightedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF506B',
  },
});
