import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const API_URL = "https://6686195583c983911b00cc8e.mockapi.io/kimxuyen/users";

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL);
      const users = await response.json();

      const user = users.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password
      );

      if (user) {
        Toast.show({
          type: "success",
          text1: "Đăng nhập thành công",
          text2: `Chào mừng, ${email}!`,
          visibilityTime: 1000,
          autoHide: true,
        });
        await AsyncStorage.setItem("id", user.id);

        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng nhập thất bại",
          text2: "Email hoặc mật khẩu không đúng.",
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi khi đăng nhập.",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>
      <Toast /> {/* Đảm bảo Toast nằm trong phần gốc của màn hình */}
        
      </Text>
      <View>
        <Image
          source={require("../assets/images/logologin3.jpg")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.signupText}>
        <Text>Bạn chưa có tài khoản? </Text>
        <Link href="/register">
          <Text style={styles.signupButton}>Đăng kí</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5E2C4',
    padding: 30,
    width: '90%',
    maxWidth: 400,
    margin: 'auto',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 30,
    borderRadius: 75,
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '90%',
    maxWidth: 350,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  signupText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonLogin: {
    backgroundColor: "#8B4513",
    width: '70%',
    maxWidth: 350,
    paddingVertical: 12,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButton: {
    color: "blue",
    fontWeight: "bold",
  },
});
