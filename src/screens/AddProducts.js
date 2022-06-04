import {StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';

const AddProducts = ({navigation}) => {
    const [name, setname] = useState()
    const [description, setdescription] = useState()

  const AddProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 9ba1c077d2d120444cc8d3cb59362d6a71e9bb134afbde30b84f21492922f12bb4385d5510a6fa87554b7e02971639c0b5e938e10398d14b5b035b6d913310de5f806a016aeddfb06770ca97c70fc2e3ac62f43d9002b4a61614b567461cb0b3f3a2d3f30663bb91a2e66f80f9fa879d615df1ca12a2e800277112130cecb836',
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      data: {
        name: name,
        description: description,
      },
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://192.168.88.98:8082/api/products', requestOptions)
      .then(response => response.json())
      .then(() =>{navigation.navigate("Home",{name,description})})
      .catch(error => console.log('error', error));
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.heading} >AddProducts</Text>
      <Text style={{alignSelf:'flex-start'}}>Name</Text>
      <TextInput style={styles.textInputStyle} value={name} onChangeText={(e)=>{setname(e)}}/>
      <Text style={{alignSelf:'flex-start'}}>Description</Text>
      <TextInput style={styles.textInputStyle} value={description} onChangeText={(e)=>{setdescription(e)}}/>
      <TouchableOpacity onPress={AddProducts}>
          <View style={styles.btn}>
        <Text style={styles.text}>Add Products</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
    textInputStyle: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    },
    btn:{
        backgroundColor: '#00ff00',
        padding: 7,
        marginTop: 10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',

    },
    text:{
        fontSize:15,
        color:'#000',
    },
    }
    
    
);
