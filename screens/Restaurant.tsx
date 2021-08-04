import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";

import { COLORS, FONTS, icons, SIZES } from "../constants";

const Restaurant = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = React.useState<any>(null);
  const [currentLocation, setCurrentLocation] = React.useState<any>(null);

  React.useEffect(() => {
    const { item, currentLocation } = route.params as any;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);

  const Header = () => (
    <View style={tw`flex-row`}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.backBtn}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      {/* restaurant name sec */}
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={styles.restaurantNameCont}>
          <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 3,
          justifyContent: "center",
        }}
      >
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );

  const FoodInfo = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
    >
      {restaurant?.menu.map((item: any, index: number) => (
        <View key={`menu-${index}`} style={tw`items-center`}>
          <View style={{ height: SIZES.height * 0.35 }}>
            {/* food image */}
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{ width: SIZES.width, height: "100%" }}
            />

            {/* quantity */}
            <View
              style={[
                tw`absolute justify-center flex-row`,
                { bottom: -20, width: SIZES.width, height: 50 },
              ]}
            >
              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
              >
                <Text style={{ ...FONTS.body1, color: COLORS.darkgray }}>
                  -
                </Text>
              </TouchableOpacity>

              {/* quantity */}
              <View
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>1</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FoodInfo />
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  backBtn: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: "center",
  },
  restaurantNameCont: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding * 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray3,
  },
});
