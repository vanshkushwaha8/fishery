import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#B3E5FC', '#E3F2FD']}
      style={styles.container}
    >
      <StatusBar style="auto" />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          {/* Menu icon */}
          <View style={styles.menuLine}></View>
          <View style={styles.menuLine}></View>
          <View style={styles.menuLine}></View>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>User Name</Text>
          <Image
            source={{ uri: 'https://example.com/user-profile.jpg' }} // Replace with your user image URL or require local asset
            style={styles.userImage}
          />
        </View>
      </View>

      {/* Fish Image Carousel */}
      <Image
        source={require('../assets/images/cover.jpg')} // Replace with your fish image URL or require local asset
        style={styles.fishImage}
      />

      {/* Navigation Dots */}
      <View style={styles.dotsContainer}>
        <View style={styles.dot}></View>
        <View style={styles.dot}></View>
        <View style={styles.dot}></View>
      </View>

      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>POND</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>MARKET</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>INVENTORY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>GALLERY</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    padding: 10,
  },
  menuLine: {
    width: 30,
    height: 3,
    backgroundColor: '#1E88E5',
    marginVertical: 2,
    borderRadius: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bbdefb',
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 18,
    color: '#000',
    marginRight: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#42A5F5',
  },
  fishImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 20,
    height: 5,
    backgroundColor: '#42A5F5',
    borderRadius: 4,
    marginHorizontal: 3,
  },
  navButton: {
    width: '100%',
    backgroundColor: '#E3F2FD',
    paddingVertical: 40, // Increased from 20 to 40
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  navButtonText: {
    color: '#1E88E5',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
