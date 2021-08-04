import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Header } from "../components/Home/Header";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from "../constants/dummyData";

const Home = () => {
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const navigation = useNavigation();

  function onSelectCategory(item: any) {
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(item.id)
    );

    setRestaurants(restaurantList);
    setSelectedCategory(item);
  }

  function getCategoryNameById(id: number) {
    let category = categories.filter((a) => a.id === id);

    if (category.length > 0) {
      return category[0].name;
    }
    return "";
  }

  function MainCategories() {
    function renderCategory({
      item,
    }: {
      item: {
        id: number;
        name: string;
        icon: any;
      };
    }) {
      return (
        <TouchableOpacity
          onPress={() => onSelectCategory(item)}
          style={[
            styles.category,
            styles.shadow,
            {
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.primary
                  : COLORS.white,
            },
          ]}
        >
          <View
            style={tw`w-14 h-14 rounded-full items-center justify-center bg-white`}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={tw`w-8 h-8`}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1 }}>Main</Text>
        <Text style={{ ...FONTS.h1 }}>Categories</Text>

        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => `${i.id}`}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
            paddingLeft: 10,
          }}
          renderItem={renderCategory}
        />
      </View>
    );
  }

  function RestaurantList() {
    const renderItem = ({ item }: any) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Restaurant", {
            item,
            initialCurrentLocation,
          })
        }
        style={{ marginBottom: SIZES.padding * 2 }}
      >
        <View style={{ marginBottom: SIZES.padding }}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{ width: "100%", height: 200, borderRadius: SIZES.radius }}
          />

          <View style={[styles.restaurantDetails, styles.shadow]}>
            <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
          </View>
        </View>

        {/* info */}
        <Text style={{ ...FONTS.body2, marginLeft: 10 }}>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          {/* rating */}
          <Image source={icons.star} style={styles.star} />
          <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

          {/* catergory data */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
            }}
          >
            {item.categories.map((catergoryId: number) => (
              <View
                style={{
                  flexDirection: "row",
                }}
                key={catergoryId}
              >
                <Text style={{ ...FONTS.body3 }}>
                  {getCategoryNameById(catergoryId)}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
              </View>
            ))}

            {/* price */}
            {[1, 2, 3].map((priceRating: number) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkgray,
                }}
              >
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={restaurants}
        keyExtractor={(i) => `${i.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 65,
        }}
        renderItem={renderItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainCategories />
      <RestaurantList />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  category: {
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    borderRadius: SIZES.radius + 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.padding,
  },
  restaurantDetails: {
    position: "absolute",
    bottom: 0,
    height: 50,
    width: SIZES.width * 0.3,
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
    marginRight: 10,
  },
});
