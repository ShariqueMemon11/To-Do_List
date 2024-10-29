import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}

export default function AuthScreen({ navigation }: AuthScreenProps) {
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      alert('This device does not have the required hardware for authentication');
      return;
    }

    const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (!supportedAuthTypes.length) {
      alert('No supported authentication methods available');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate'
    });

    if (result.success) {
      navigation.replace('Main');
    } else {
      alert('Authentication failed');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/images/auth.webp')} />
      <Text style={styles.text}>Please Authenticate to continue</Text>
      <Pressable android_ripple={{ color: '#210644' }} onPress={authenticate} style={({ pressed }) => [styles.button]}>
        <Text style={styles.buttontext}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e0858',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#5e0acc',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
  },
  
  img: {
    width: 180,
    height: 180,
    margin: 20,
  },

});
