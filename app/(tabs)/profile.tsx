import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, Alert, TextInput, TouchableOpacity, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password?: string; // Giả định rằng mật khẩu có thể có trong dữ liệu người dùng
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Lấy userID từ AsyncStorage
        const userID = await AsyncStorage.getItem('id');
        if (!userID) {
          Alert.alert('Lỗi', 'Không tìm thấy ID người dùng');
          return;
        }

        // Gọi API để lấy thông tin người dùng
        const response = await fetch(`https://6686195583c983911b00cc8e.mockapi.io/kimxuyen/users/${userID}`);
        if (!response.ok) {
          throw new Error('Lỗi khi tải dữ liệu người dùng');
        }

        const userData = await response.json();
        setUser({
          id: userData.id,
          name: userData.usename || userData.username,
          email: userData.email,
          avatar: userData.avatar || 'https://th.bing.com/th/id/OIF.QSI9XMIagljqUh2e6jjgeg?w=200&h=201&c=7&r=0&o=5&dpr=1.5&pid=1.7',
          password: userData.password, // Giả định rằng mật khẩu hiện tại được tải về
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải dữ liệu người dùng');
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    if (!user) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
      return;
    }

    // Kiểm tra mật khẩu hiện tại
    if (currentPassword !== user.password) {
      Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng.');
      return;
    }

    try {
      const API_URL = `https://6686195583c983911b00cc8e.mockapi.io/kimxuyen/users/${user.id}`;
      
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        Alert.alert('Thành công', 'Đổi mật khẩu thành công!');
        setModalVisible(false); // Đóng modal sau khi đổi mật khẩu thành công
      } else {
        Alert.alert('Lỗi', 'Đổi mật khẩu thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "transparent", dark: "transparent" }} 
      headerImage={
        user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.headerImage} />
        ) : (
          <Ionicons size={310} name="person" style={styles.headerIcon} />
        )
      }
    >
      <ThemedView style={styles.profileContainer}>
        {user ? (
          <>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>

            {/* Nút mở modal đổi mật khẩu */}
            <TouchableOpacity style={styles.changePasswordButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Đổi Mật Khẩu</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Loading user information...</Text>
        )}
      </ThemedView>

      {/* Modal để nhập mật khẩu hiện tại và mật khẩu mới */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Đổi Mật Khẩu</Text>

            {/* Nhập mật khẩu hiện tại */}
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu hiện tại"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            {/* Nhập mật khẩu mới */}
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mới"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  headerIcon: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
  changePasswordButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
});
