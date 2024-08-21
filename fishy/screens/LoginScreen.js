import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';

const themeColors = { bg: '#B6E6FC' };

const LoginScreen = () => {
  const navigation = useNavigation();
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
      // Handle successful authentication here
    }
  }, [response]);

  const handleLogin = () => {
    console.log('Login button clicked');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to the ForgotPassword screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ backgroundColor: themeColors.bg, paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'yellow', padding: 8, borderTopRightRadius: 16, borderBottomLeftRadius: 16, marginLeft: 16 }}
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Image 
            source={require('../assets/images/welcome.png')} 
            style={styles.image}
            resizeMode="contain" 
          />
        </View>
      </SafeAreaView>

      <View style={[styles.formContainer]}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="gray" style={styles.icon} />
            <TextInput 
              style={styles.input}
              placeholder="Enter Email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="gray" style={styles.icon} />
            <TextInput 
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => promptAsync()} // Trigger Google login
            style={styles.googleButton}
            disabled={!request} // Disable button if request is not ready
          >
            <Image 
              source={require('../assets/icons/google.png')} // Replace with your path to google.png
              style={styles.googleImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    flex: 1,
    justifyContent: 'center', // Center the form
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8, // Reduced margin to fit all inputs on the screen
  },
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'gray',
  },
  loginButton: {
    padding: 12,
    backgroundColor: '#4CAF50', // Login button color (Green)
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8, // Reduced margin
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginBottom: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#4CAF50', // Match the login button color
    fontSize: 16,
  },
  googleButton: {
    padding: 12,
    backgroundColor: '#fffff', // Google blue color
    borderRadius: 8,
    alignItems: 'center',
  },
  googleImage: {
    width: 20,
    height: 20, // Adjust the size to fit your design
  },
  image: {
    width: width * 0.8,  // Set the image width to 80% of the screen width
    height: height * 0.4, // Set the image height to 40% of the screen height
  },
});

export default LoginScreen;
