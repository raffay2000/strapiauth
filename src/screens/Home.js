import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { fetchApiSource } from '../Redux/actions/DataAction';
import { useDispatch,useSelector } from 'react-redux';

const Home = ({navigation}) => {
  // const dispatch = useDispatch();
  // const {items} = useSelector(state => state.dataReducer);
  const [items, setitems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nameUpdate, setnameUpdate] = useState();
  const [descriptionUpdate, setdescriptionUpdate] = useState();
  const [UID, setUID] = useState();

  const getData = () => {
    var requestOptions = {
      method: 'GET',
      headers: 'Content-Type: application/json',
    };
    fetch('http://192.168.88.98:8082/api/products', requestOptions )
      .then(response => response.json())
      .then(result => setitems(result.data))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    getData();
  },[]);
  const EditData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 9ba1c077d2d120444cc8d3cb59362d6a71e9bb134afbde30b84f21492922f12bb4385d5510a6fa87554b7e02971639c0b5e938e10398d14b5b035b6d913310de5f806a016aeddfb06770ca97c70fc2e3ac62f43d9002b4a61614b567461cb0b3f3a2d3f30663bb91a2e66f80f9fa879d615df1ca12a2e800277112130cecb836',
    );
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      data: {
        name: nameUpdate,
        description: descriptionUpdate,
      },
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`http://192.168.88.98:8082/api/products/${UID}`, requestOptions)
      .then(response => {
        response.json();
      })
      .then(() => {
        getData();
      })
      .catch(error => console.log('error', error));
  };
  const openModal = item => {
    setModalVisible(true);
    // setnameUpdate(item.name)
    // setdescriptionUpdate(item.description)
    setUID(item.id);
  };
  const deleteItem = item => {
    // setDelUID(item.id)
    // alert(item.id)
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 9ba1c077d2d120444cc8d3cb59362d6a71e9bb134afbde30b84f21492922f12bb4385d5510a6fa87554b7e02971639c0b5e938e10398d14b5b035b6d913310de5f806a016aeddfb06770ca97c70fc2e3ac62f43d9002b4a61614b567461cb0b3f3a2d3f30663bb91a2e66f80f9fa879d615df1ca12a2e800277112130cecb836',
    );
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`http://192.168.88.98:8082/api/products/${item.id}`, requestOptions)
      .then(response => {
        response.json();
      })
      .then(() => {
        getData();
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{marginTop: 22}}>
          <Text>Name</Text>
          <TextInput
            style={styles.textInputStyle}
            value={nameUpdate}
            onChangeText={e => {
              setnameUpdate(e);
            }}
          />
          <Text>description</Text>
          <TextInput
            style={styles.textInputStyle}
            value={descriptionUpdate}
            onChangeText={e => {
              setdescriptionUpdate(e);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
              EditData();
            }}>
            <View style={styles.btn}>
              <Text style={styles.text}>Close</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              EditData();
            }}>
            <View style={styles.btn}>
              <Text style={styles.text}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddProducts');
        }}>
        <View style={styles.btn}>
          <Text style={[styles.textStyle, {marginTop: 0}]}>
            Add more products
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.titleStyle, {fontSize: 30, color: 'blue'}]}>
        Your store Products:
      </Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
            <Text style={styles.titleStyle}>{item.attributes.name}</Text>
            <Text style={styles.textStyle}>{item.attributes.description}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={[styles.btn, {height: 40, width: 100}]}>
                  <Text style={[styles.textStyle, {marginTop: 0}]}>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item)}>
                <View
                  style={[
                    styles.btn,
                    {height: 40, width: 100, backgroundColor: 'red'},
                  ]}>
                  <Text
                    style={[styles.textStyle, {marginTop: 0, color: 'white'}]}>
                    delete
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 4,
  },
  textStyle: {
    fontSize: 15,
    color: 'blue',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#00ff00',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    marginBottom: 10,
    marginLeft: 10,
  },
  textInputStyle: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
  },
});
