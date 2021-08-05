import React from "react";
import { Text, View, TextInput } from "react-native";

const OrderDelivery = () => {
  const [results, setResults] = React.useState<any>([]);
  async function getResults(query: string) {
    const encodedQuery = encodeURI(query);
    const res = await fetch(
      `https://api.tomtom.com/search/2/search/${encodedQuery}.json?limit=5&key=XoCPZ4yP97o1aoGvWiUl5zKn2u23AAFg`
    ).then((r) => r.json());

    console.log(res);
    setResults(res.results);
  }

  return (
    <View>
      <Text>OrderDelivery</Text>
      <TextInput
        onChangeText={getResults}
        placeholder="type here"
        style={{ backgroundColor: "lightgray" }}
      />

      {results?.map((r: any) => (
        <Text>{r.address.country || "someything"}</Text>
      ))}
    </View>
  );
};

export default OrderDelivery;

// const styles = StyleSheet.create({});
