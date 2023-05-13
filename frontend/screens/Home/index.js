import {
  Avatar,
  Box,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { COLOR } from "../../constants";

import Tab from "../../components/Tab";
import { TouchableOpacity } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard";
import axiosInstance from "../../utils/axios";

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const load = useCallback(async () => {
    const response = await axiosInstance.get("categories?populate=*");
    if (response.status === 200) {
      setCategories(response.data.data);
      setActiveCategory(response.data.data[0]);
    }
  }, []);

  const loadFoods = useCallback(async () => {
    if (!activeCategory) return;
    const response = await axiosInstance.get(
      `restaurants?filters[category][id][$eq]=${activeCategory.id}&populate[0]=category&populate=image`
    );
    if (response.status === 200) {
      setFoods(response.data.data);
    }
  }, [activeCategory]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  return (
    <Box style={styles.container}>
      <HStack alignItems="center" justifyContent="space-between">
        <Text fontWeight={700} fontSize="xl">{`Hello, \nKristin👋`}</Text>
        <Avatar
          bg={COLOR.success}
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        >
          K
        </Avatar>
      </HStack>
      <HStack>
        <ScrollView
          style={styles.tabContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <HStack space={2}>
            {activeCategory &&
              categories.map((item, idx) => (
                <Tab
                  key={idx}
                  props={item}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              ))}
          </HStack>
        </ScrollView>
      </HStack>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom={4}
      >
        <Text fontWeight={700} fontSize="xl">
          {`${foods.length} ${
            activeCategory && activeCategory.attributes.Name
          }`}
        </Text>
        <TouchableOpacity>
          <Icon
            as={FontAwesome}
            name="sliders"
            color={COLOR.success}
            size={5}
          />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={2}>
          {foods.map((item, idx) => (
            <FoodCard key={idx} props={item} navigation={navigation} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundColor,
    padding: normalize(16),
  },
  tabContainer: {
    marginVertical: normalize(16),
  },
});
