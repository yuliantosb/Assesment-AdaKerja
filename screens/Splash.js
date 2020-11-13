import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Slider from '../components/Slider';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

export default function Splash({navigation}) {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SafeAreaView>
        <Slider />
      </SafeAreaView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.buttonTextWrapper}>
            <Feather
              name="github"
              size={18}
              style={{color: '#fff', marginRight: 10}}
            />
            <Text style={styles.buttonText}>Login with Github</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: height / 7,
    width: width / 1.5,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#24292E',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});
