import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SIZES, icons, COLORS, FONTS } from "../../constants";
import tw from "tailwind-react-native-classnames";
import { initialCurrentLocation } from "../../constants/dummyData";

export const Header = React.memo(() => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
      }}
    >
      <TouchableOpacity
        style={[tw`justify-center`, { paddingLeft: SIZES.padding * 2 }]}
      >
        <Image
          source={icons.nearby}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <View style={tw`flex-1 items-center justify-center`}>
        <View
          style={[
            tw`h-full items-center justify-center`,
            {
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
              width: "70%",
            },
          ]}
        >
          <Text style={{ ...FONTS.h3 }}>
            {initialCurrentLocation.streetName}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          tw`justify-center`,
          { paddingRight: SIZES.padding * 2, width: 50 },
        ]}
      >
        <Image
          source={icons.basket}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
});
