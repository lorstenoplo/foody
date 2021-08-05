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

interface Item {
  menuId: number;
  name: string;
  photo: string;
  description: string;
  calories: number;
  price: number;
}

const Restaurant = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = React.useState<any>(null);
  const [currentLocation, setCurrentLocation] = React.useState<any>(null);
  const [orderItems, setOrderItems] = React.useState<
    [{ menuId: number; qty: number; price: number; total: number }] | []
  >([]);

  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    const { item, currentLocation } = route.params as any;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);

  function editOrder(action: "+" | "-", menuId: number, price: number) {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId === menuId);

    if (action === "+") {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId,
          qty: 1,
          price,
          total: price,
        };

        orderList.push(newItem);
      }

      setOrderItems(orderList as any);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList as any);
    }
  }

  function getOderQty(menuId: number) {
    let orderItem = orderItems.filter((a) => a.menuId === menuId);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  }

  function getBasketItemCount() {
    let itemCount = (orderItems as any).reduce(
      (a: any, b: { qty: number }) => a + (b.qty || 0),
      0
    );

    return itemCount;
  }

  function sumOrder() {
    let total = (orderItems as any).reduce(
      (a: any, b: { total: number }) => a + (b.total || 0),
      0
    );

    return total.toFixed(2);
  }

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
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
    >
      {restaurant?.menu.map((item: Item, index: number) => (
        <View key={`menu-${index}`} style={tw`items-center`}>
          <View style={{ height: SIZES.height * 0.35 }}>
            {/* food image */}
            <Image
              source={item.photo as any}
              resizeMode="cover"
              style={{ width: SIZES.width, height: "100%" }}
            />

            {/* quantity */}
            <View
              style={[
                tw`absolute justify-center flex-row`,
                { bottom: -20, width: SIZES.width, height: 50, elevation: 2 },
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
                onPress={() => editOrder("-", item.menuId, item.price)}
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
                <Text style={{ ...FONTS.h2 }}>{getOderQty(item.menuId)}</Text>
              </View>

              <TouchableOpacity
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                }}
                onPress={() => editOrder("+", item.menuId, item.price)}
              >
                <Text style={{ ...FONTS.body1, color: COLORS.darkgray }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* name and desc */}
          <View
            style={{
              width: SIZES.width,
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}
            >
              {item.name} - {item.price.toFixed(2)}
            </Text>
            <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
          </View>

          {/* calories */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image
              source={icons.fire}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
              {item.calories.toFixed(2)} cal
            </Text>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: SIZES.padding,
          }}
        >
          {restaurant?.menu.map((item: any, index: number) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  opacity,
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const Order = () => (
    <View>
      <Dots />
      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            {getBasketItemCount()} items in cart
          </Text>
          <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              source={icons.pin}
              style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
            />
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
              {currentLocation?.streetName || "Licoln Pi"}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image
              resizeMode="contain"
              source={icons.master_card}
              style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
            />
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
          </View>
        </View>

        <View
          style={{
            padding: SIZES.padding * 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.orderBtn}
            onPress={() =>
              navigation.navigate("OrderDelivery", {
                currentLocation,
              })
            }
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FoodInfo />
      <Order />
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
  orderBtn: {
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: SIZES.radius,
  },
});
