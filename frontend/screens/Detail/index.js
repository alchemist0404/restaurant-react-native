import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import normalize from "react-native-normalize";
import StepIndicator from "react-native-step-indicator";

import { COLOR, STRAPI } from "../../constants";
import { Feather } from "@expo/vector-icons";
import axiosInstance from "../../utils/axios";

const stepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: COLOR.success,
  separatorFinishedColor: COLOR.success,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: COLOR.success,
  stepIndicatorUnFinishedColor: "#aaaaaa",
  stepIndicatorCurrentColor: COLOR.cardBG,
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: "transparent",
  stepIndicatorLabelFinishedColor: "transparent",
  stepIndicatorLabelUnFinishedColor: "transparent",
  labelColor: "#666666",
  labelSize: 15,
  currentStepLabelColor: COLOR.success,
};

export default function DetailScreen({ route, navigation }) {
  const { foodId } = route.params;

  const [currentPage, setCurrentPage] = useState(0);
  const [foodData, setFoodData] = useState({
    Name: "",
    Description: "",
    calorie: 0,
    gram: 0,
    image: "",
    min: 0,
    serve: 0,
    material: [],
    steps: [],
  });

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current;

  const renderPage = (rowData) => {
    const item = rowData.item;
    return (
      <VStack key={rowData.index} space={1} mt={2}>
        <Text fontWeight={400}>Step {rowData.index + 1}</Text>
        <Text color={COLOR.darkGray} fontSize="xs">
          {item}
        </Text>
      </VStack>
    );
  };

  const renderStepIndicator = ({ stepStatus }) =>
    stepStatus === "finished" ? (
      <Icon as={Feather} name="check" color={COLOR.cardBG} size={3} />
    ) : null;

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      setCurrentPage(viewableItems[visibleItemsCount - 1].index);
    }
  }, []);

  const load = useCallback(async () => {
    const response = await axiosInstance.get(
      `restaurants/${foodId}?populate=*`
    );
    if (response.status === 200) {
      const res_data = response.data.data.attributes;
      setFoodData({
        ...res_data,
        image: res_data.image.data.attributes.url,
        material: res_data.material.data,
      });
    }
  }, [foodId]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Box style={styles.container}>
      <HStack justifyContent={"space-between"}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            as={Feather}
            size={5}
            color={COLOR.whiteColor}
            name="chevron-left"
          />
        </TouchableOpacity>
        <Text color={COLOR.whiteColor} fontSize="lg" fontWeight={400}>
          {foodData.Name}
        </Text>
        <Icon as={Feather} size={5} color={COLOR.whiteColor} name="heart" />
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        {console.log(foodData.image)}
        <Center>
          <Image
            // shadow="9"
            source={{
              uri: STRAPI.host + foodData.image,
            }}
            onLoadEnd={() => console.log('----------------------------')}
            alt="Image"
            style={styles.image}
          />
        </Center>
        <HStack style={styles.dataContainer} space={10}>
          <VStack alignItems="center">
            <Text color={COLOR.warning} fontWeight={400}>
              {foodData.calorie}
            </Text>
            <Text fontSize="xs" color={COLOR.darkGray}>
              kcal
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text color={COLOR.warning} fontWeight={400}>
              {foodData.gram}
            </Text>
            <Text fontSize="xs" color={COLOR.darkGray}>
              grams
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text color={COLOR.warning} fontWeight={400}>
              {foodData.min}
            </Text>
            <Text fontSize="xs" color={COLOR.darkGray}>
              min
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text color={COLOR.warning} fontWeight={400}>
              {foodData.serve}
            </Text>
            <Text fontSize="xs" color={COLOR.darkGray}>
              serve
            </Text>
          </VStack>
        </HStack>
        <Box style={styles.stepBox}>
          <HStack style={styles.materialContainer} space={2}>
            {foodData.material.map((item, idx) => (
              <Box style={styles.materialBox} key={idx}>
                <Image
                  source={{
                    uri: STRAPI.host + item.attributes.url,
                  }}
                  alt="Alter"
                  style={styles.materialImage}
                />
              </Box>
            ))}
          </HStack>
          <Box flex={1} flexDirection="row">
            <Box paddingRight={4}>
              <StepIndicator
                customStyles={stepIndicatorStyles}
                renderStepIndicator={renderStepIndicator}
                stepCount={foodData.steps.length}
                direction="vertical"
                currentPosition={currentPage}
                labels={[]}
              />
            </Box>
            <FlatList
              flex={1}
              data={foodData.steps}
              renderItem={renderPage}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              keyExtractor={(item, index) => index.toString()}
            />
          </Box>
        </Box>
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
  image: {
    borderRadius: normalize(100),
    width: normalize(200),
    height: normalize(200),
    marginVertical: normalize(32),
  },
  dataContainer: {
    padding: normalize(16),
    justifyContent: "center",
    borderRadius: normalize(16),
    borderColor: COLOR.borderColor,
    borderWidth: normalize(3),
  },
  stepBox: {
    marginTop: normalize(16),
    borderRadius: normalize(24),
    padding: normalize(16),
    backgroundColor: COLOR.cardBG,
  },
  materialContainer: {
    justifyContent: "flex-start",
    marginVertical: normalize(16),
  },
  materialBox: {
    borderRadius: normalize(16),
    borderColor: COLOR.borderColor,
    borderWidth: normalize(3),
  },
  materialImage: {
    margin: normalize(8),
    width: normalize(30),
    height: normalize(30),
  },
});
