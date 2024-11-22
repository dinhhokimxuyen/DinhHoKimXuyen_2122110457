// app/success.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Text Chúc Mừng */}
      <Text style={styles.successText}>Chúc mừng bạn đã thanh toán thành công!</Text>
      
      {/* Nút quay về trang chủ */}
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Quay về trang chủ</Text>
      </TouchableOpacity>

      {/* Hiệu ứng pháo hoa */}
      <ConfettiCannon
        count={100}
        origin={{ x: -10, y: 0 }}
        fadeOut={true}
        explosionSpeed={350}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#E0F7FA',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
    tintColor: '#4CAF50',
  },
  successText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 30,
  },
  homeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
