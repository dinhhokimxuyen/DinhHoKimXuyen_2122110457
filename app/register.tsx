import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { Colors } from "../constants/Colors";
import { Link, useRouter } from "expo-router"; // Import useRouter để điều hướng

export default function SignupScreen({ onToggleScreen }: any) {
  const [username, setUsername] = useState(""); // Thêm state cho username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addresss, setAddress] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [isSignupComplete, setIsSignupComplete] = useState(false); // State để kiểm tra đăng ký thành công
  const router = useRouter(); // Khởi tạo router để điều hướng

  const handleSignup = () => {
    // Kiểm tra các trường đã điền đầy đủ chưa
    if (username && email && password && addresss && comfirmPassword) {
      if (password !== comfirmPassword) {
        Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
        return;
      }

      // Hiển thị thông báo thành công
      Alert.alert("Thành công", "Đăng kí thành công!");
      setIsSignupComplete(true); // Cập nhật trạng thái đăng ký thành công

      // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
      setTimeout(() => {
        router.push("/login");
      }, 1000); // Đợi một giây để người dùng thấy thông báo đăng ký thành công
    } else {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
    }
  };

  return (
    <View style={styles.container}>
      {isSignupComplete ? (
        // Nội dung hiển thị sau khi đăng ký thành công
        <Text style={styles.successMessage}>Cảm ơn bạn đã đăng ký thành công!</Text>
      ) : (
        // Form đăng ký
        <>
          <View>
            <Image
              source={require("../assets/images/logosingup.gif")}
              style={{
                width: 90,
                height: 90,
                marginBottom: 30,
                borderRadius: 75,
                resizeMode: "cover",
              }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
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
            placeholder="Địa chỉ"
            value={addresss}
            onChangeText={setAddress}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={comfirmPassword}
            onChangeText={setComfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.buttonLogin} onPress={handleSignup}>
            <Text style={styles.buttonText}>Đăng kí</Text>
          </TouchableOpacity>

          <View style={styles.signupText}>
            <Text>Bạn đã có tài khoản? </Text>
            <Link href="/login">
              <Text style={styles.signupButton}>Đăng nhập</Text>
            </Link>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5E2C4',
    padding: 20,
    width: '80%',
    maxWidth: 400,
    minHeight: 500,
    margin: 'auto',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
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
    width: '80%',
    maxWidth: 300,
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
