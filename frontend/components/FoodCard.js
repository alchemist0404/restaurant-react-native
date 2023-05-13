import { HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLOR, STRAPI } from "../constants";
import normalize from "react-native-normalize";

export default function FoodCard({ props, navigation }) {
  const data = props.attributes;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Detail", {
          foodId: props.id,
        })
      }
    >
      <HStack alignItems="center">
        <Image
          shadow="9"
          source={{
            uri: STRAPI.host + data.image.data.attributes.url,
          }}
          alt={data.Name}
          style={styles.image}
        />
        <VStack alignItems="flex-start" flex={1}>
          <HStack space={4}>
            <Text fontSize="xs" color={COLOR.secondary}>{`${data.gram}g`}</Text>
            <Text fontSize="xs" color={COLOR.secondary}>
              {data.calorie}cal
            </Text>
          </HStack>
          <Text fontSize="xl" fontWeight={400}>
            {data.Name}
          </Text>
          <Text fontSize="xs" color={COLOR.darkGray} flexWrap="wrap">
            {data.Description}
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.cardBG,
    padding: normalize(16),
    borderRadius: normalize(16),
  },
  image: {
    width: normalize(100),
    height: normalize(100),
    marginRight: normalize(16),
    borderRadius: normalize(50),
  },
});
