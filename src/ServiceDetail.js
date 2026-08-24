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
import EditService from './EditService';

const SeviceDetail = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const [service, setService] = useState(null);

  const handleSubmit = async () => {
    try {
      const respone = await fetch(
        `https://kami-backend-5rs0.onrender.com/services/${id}`
      );
      const data = await respone.json();

      if (respone.ok) {
        setService(data);
      }
    } catch (error) {
      console.error(Error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleDelete = () => {
    Alert.alert('Warning', 'are you sure to delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'DELETE',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');

            const respone = await fetch(
              `https://kami-backend-5rs0.onrender.com/services/${id}`,
              {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (respone.ok) {
              Alert.alert('delete success!');
            } else {
              Alert.alert('delete failed');
            }
          } catch (error) {
            console.error(Error);
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
          <Text style={[styles.headerText, { marginBottom: 15 }]}>Service</Text>
        </View>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EditService', { service: service })
            }>
            <Text style={[styles.headerText, { paddingTop: 10 }]}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <MaterialIcons color="white" name="more-vert" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.text}>Service name:{service?.name}</Text>
        <Text style={styles.text}>Service price:{service?.price}</Text>
        <Text style={styles.text}>Service author:{service?.createdBy}</Text>
        <Text style={styles.text}>Service update:{service?.updateAt}</Text>
      </View>
    </View>
  );
};
export default SeviceDetail;

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
    fontWeight: 'bold',
  },
});
