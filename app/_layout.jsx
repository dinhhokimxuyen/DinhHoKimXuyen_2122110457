import React, { useState } from "react";
import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import { ActivityIndicator, View, Text } from "react-native";
import LoginScreen from "./login";
import SignupScreen from "./register";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Ban đầu chưa đăng nhập
  const [isSignUp, setIsSignUp] = useState(false); // Ban đầu là màn hình đăng nhập
  // const [fontsLoaded] = useFonts({
  //   roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  //   "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
  //   "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
  // });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Cập nhật trạng thái khi đăng nhập thành công
  };

  const toggleScreen = () => {
    setIsSignUp((prev) => !prev); // Chuyển đổi giữa màn hình đăng nhập và đăng ký
  };

  // Kiểm tra nếu font chưa được load, hiển thị màn hình chờ
  // if (!fontsLoaded) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading fonts...</Text>
  //     </View>
  //   );
  // }

  // Hiển thị màn hình đăng nhập nếu chưa đăng nhập, nếu đăng nhập thành công thì chuyển sang home
  return (
    <Provider store={store}>
       {!isLoggedIn ? (
        isSignUp ? (
          <SignupScreen onToggleScreen={toggleScreen} /> // Hiển thị SignupScreen nếu người dùng ở màn hình đăng ký
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} onToggleScreen={toggleScreen} /> // Hiển thị LoginScreen nếu người dùng ở màn hình đăng nhập
        )
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" /> {/* Điều hướng tới màn hình home sau khi đăng nhập */}
        </Stack>
      )}
 
    </Provider>
     
  );
}