import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, Modal, ScrollView } from 'react-native';
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(''); // 'contact' or 'email'
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
    setModalVisible(true);
  };

  const handleVerificationMethod = (method) => {
    setVerificationMethod(method);
    setModalVisible(false);
    setOtpModalVisible(true);
  };

  const handleSendOtp = () => {
    if (contactNumber.length === 10) {
      // Implement OTP sending logic here
      console.log('Sending OTP to:', contactNumber);
    } else {
      alert('Please enter a valid 10-digit contact number.');
    }
  };

  const handleSendResetLink = () => {
    if (email) {
      // Implement reset link sending logic here
      console.log('Sending reset link to:', email);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const handleSubmitOtp = () => {
    if (otp.length === 6) {
      // Implement OTP verification logic here
      console.log('Verifying OTP:', otp);
      setOtpModalVisible(false);
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  const handleResetPassword = () => {
    if (newPassword) {
      // Implement password reset logic here
      console.log('Resetting password:', newPassword);
    } else {
      alert('Please enter a new password.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setVerificationMethod(''); // Reset verification method
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

      {/* Password Reset Selection Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TouchableOpacity
              onPress={() => handleVerificationMethod('contact')}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Verify via Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleVerificationMethod('email')}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Verify via Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeModal}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* OTP / Reset Password Modal */}
      <Modal
        transparent={true}
        visible={isOtpModalVisible}
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            {verificationMethod === 'contact' ? (
              <>
                <Text style={styles.modalTitle}>Verify via Contact</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Contact Number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={contactNumber}
                  onChangeText={setContactNumber}
                />
                <TouchableOpacity
                  onPress={handleSendOtp}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Send OTP</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity
                  onPress={handleSubmitOtp}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Submit OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Verify via Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity
                  onPress={handleSendResetLink}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Send Reset Link</Text>
                </TouchableOpacity>
              </>
            )}
            {verificationMethod === 'email' && (
              <>
                {/* <TextInput
                  style={styles.input}
                  placeholder="Enter New Password"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                /> */}
                {/* <TouchableOpacity
                  onPress={handleResetPassword}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Reset Password</Text>
                </TouchableOpacity> */}
              </>
            )}
            <TouchableOpacity
              onPress={() => setOtpModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
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
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'blue',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  googleImage: {
    width: 24,
    height: 24,
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'red',
    fontSize: 16,
  },
});

export default LoginScreen;
