import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import axios from 'axios';

// Kiểu dữ liệu cho sản phẩm
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;  
  image: string; 
  rating: any;    
};

type CarouselItem = {
  title: string;
  image: string;
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Error fetching categories');
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Lọc sản phẩm dựa trên `selectedCategory` và `search`
  const filteredProducts = products.filter(product => 
    (selectedCategory === '' || product.category === selectedCategory) &&
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const carouselItems: CarouselItem[] = [
    { title: 'Banner 1', image: 'https://inkythuatso.com/uploads/images/2022/01/banner-trang-suc-inkythuatso-13-11-30-05.jpg' },
    { title: 'Banner 2', image: 'https://inkythuatso.com/uploads/images/2022/01/banner-trang-suc-inkythuatso-13-11-30-05.jpg' },
    { title: 'Banner 3', image: 'https://inkythuatso.com/uploads/images/2022/01/banner-trang-suc-inkythuatso-13-11-30-05.jpg' },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)} style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text>{item.title}</Text>
      <Text style={styles.productPrice}>{String(item.price)} VND</Text> 
    </TouchableOpacity>
  );

  const renderCategory = (category: string) => (
    <TouchableOpacity 
      style={[
        styles.categoryContainer, 
        selectedCategory === category && styles.selectedCategory // Áp dụng style nếu category được chọn
      ]}
      onPress={() => handleCategorySelect(category)}
    >
      {category === 'electronics' ? (
        <Image source={require('../../assets/icons/electronics.png')} style={styles.categoryIcon} />
        ) : category === 'jewelery' ? (
        <Image source={require('../../assets/icons/jewelery.png')} style={styles.categoryIcon} />
        ) : category ==="men's clothing" ?(
          <Image source={require('../../assets/icons/men clothing.png')} style={styles.categoryIcon} />
        ):category==="women's clothing" ?(
          <Image source={require('../../assets/icons/women clothing.png')} style={styles.categoryIcon} />
        ):null}
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );

  const renderCarouselItem = (item: CarouselItem) => (
    <View style={styles.carouselItem} key={item.title}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} resizeMode="cover" />
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChangeText={setSearch} // Cập nhật giá trị tìm kiếm
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/cart/addtocart")} style={styles.cartIconContainer}>
            <Icon name="cart-outline" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Icon name="person-outline" size={25} color="#000" />
          </TouchableOpacity>
        </View>

        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          height={200}
        >
          {carouselItems.map(item => renderCarouselItem(item))}
        </Swiper>

        <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategory(item)}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        <FlatList
          data={filteredProducts} // Hiển thị các sản phẩm đã được lọc
          renderItem={renderProduct}
          keyExtractor={item => String(item.id)}
          numColumns={2}
          ListEmptyComponent={<Text>Không tìm thấy sản phẩm phù hợp.</Text>} // Thông báo nếu không có sản phẩm nào
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#B7B7B7',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '80%',
    height: 40,
    marginTop: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  cartIconContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  iconWrapper: {
    paddingHorizontal: 1,
    marginTop: 20,
  },
  wrapper: {
    height: 200,
    marginBottom: 20,
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: Dimensions.get('window').width - 20,
    height: 200,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  selectedCategory: {
    borderColor: '#ff6600',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
  },
  categoryIcon: {
    width: 40,
    height: 30,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productPrice: {
    color: '#ff6600',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
