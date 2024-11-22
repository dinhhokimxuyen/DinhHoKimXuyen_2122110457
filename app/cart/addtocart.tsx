import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity,clearCart } from '@/redux/CartSlice';

type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  price_sale?: number;
  sale?: boolean;
  quantity: number;
  total?: number;
};

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + (item.total || item.price * item.quantity), 0);
  };

  const handleDeleteItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementQuantity(id));
  };
  const handleClose = () => {
    router.push('/home'); // Navigate back to the home page
  };
  const handleCheckout = () => {
    dispatch(clearCart()); // Clear the cart
    router.push('/success'); // Điều hướng đến màn hình "Thanh toán thành công"

  };
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>{(item.total || item.price).toLocaleString()}đ</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrementQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncrementQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Giỏ Hàng</Text>
      <FlatList data={cartItems} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng Cộng:</Text>
        <Text style={styles.totalAmount}>{calculateTotal().toLocaleString()} VND</Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.buttonText}>Đóng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  backButton: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FAF7F0',
    paddingVertical: 2, // Adjust padding to make the button more square
    paddingHorizontal: 2,
    borderRadius: 4,
    width: 20, // Set a fixed width and height for a square shape
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 9,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 4,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#FF3300',
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginRight: 10,
  },
  checkoutButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
