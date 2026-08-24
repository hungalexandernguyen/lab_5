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
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const EditService = ({ navigation }) => {
  const route = useRoute();
  const { service } = route.params || {};
  const [name, setName] = useState(service?.name || '');
  const [price, setPrice] = useState(
    service?.price ? String(service.price) : ''
  );

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const respone = await fetch(
        `https://kami-backend-5rs0.onrender.com/services.${service._id}`,
        {
          method: 'PUT',
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
        Alert.alert('Edit Success!');
      } else {
        Alert.alert('Edit failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons color="white" name="arrow-back" size={24} />
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
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#EF506B',
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
    paddingLeft: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EF506B',
    borderRadius: 10,
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
