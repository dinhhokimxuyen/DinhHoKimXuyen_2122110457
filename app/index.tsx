import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import Toast from "react-native-toast-message";

export default function Index() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Hiển thị thông báo Toast
    Toast.show({
      type: "info",
      text1: "Chào mừng bạn!",
      text2: "Vui lòng đăng nhập để tiếp tục.",
      visibilityTime: 3000, // Thời gian hiển thị là 3 giây
      autoHide: true,
    });

    // Chuyển hướng sau 3 giây
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000);

    return () => clearTimeout(timer); // Xóa bộ đếm thời gian khi component bị hủy
  }, []);

  return (
    <>
      <Toast />
      {redirect && <Redirect href="./login" />}
    </>
  );
}
