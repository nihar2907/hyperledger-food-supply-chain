/* eslint-disable prettier/prettier */
import {View, StyleSheet} from 'react-native';
import React, {FC, useState} from 'react';
import {Input, Button, Heading} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

// TODO - Add type for navigation
export interface ILoginProps {
  navigation: any;
}

const Login: FC<ILoginProps> = ({navigation}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <View style={styles.login}>
        <View style={styles.header}>
          <Heading variant="h3">Login to your account</Heading>
        </View>
        <View>
          <View style={styles.input}>
            <Input
              type={'text'}
              placeholder="Enter your registered mobile number"
            />
          </View>
          <View style={styles.input}>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              InputRightElement={
                <Icon
                  name={show ? 'eye-slash' : 'eye'}
                  onPress={() => setShow(!show)}
                  size={30}
                />
              }
            />
          </View>
        </View>
        <View>
          <Button variant="unstyled">Forgot your password?</Button>
        </View>
        <View>
          <Button variant="solid">Login</Button>
        </View>
        <View>
          <Button
            variant="unstyled"
            onPress={() => navigation.navigate('Register')}>
            Don't have an account? Sign up
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  login: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    margin: 5,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default Login;