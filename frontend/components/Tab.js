import { Center, Flex, Image, Text } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { COLOR, STRAPI } from "../constants";

export default function Tab({ props, activeCategory, setActiveCategory }) {
  const data = props.attributes;

  return (
    <TouchableOpacity
      direction="row"
      style={[
        styles.button,
        {
          borderColor:
            activeCategory.id === props.id ? COLOR.warning : COLOR.borderColor,
        },
      ]}
      onPress={() => setActiveCategory(props)}
    >
      <Center flexDirection="row">
        <Image
          source={{
            uri: STRAPI.host + data.image.data.attributes.url,
          }}
          alt={data.Name}
          style={styles.image}
        />
        <Text
          color={
            activeCategory.id === props.id ? COLOR.warning : COLOR.whiteColor
          }
        >
          {data.Name}
        </Text>
      </Center>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: normalize(16),
    height: normalize(16),
    marginRight: normalize(4),
  },
  button: {
    padding: normalize(4),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(50),
    borderWidth: normalize(3),
  },
});
