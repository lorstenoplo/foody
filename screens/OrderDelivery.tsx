import React from "react";
import { Text, View,TextInput } from "react-native";
// import TomtomMaps from 'react-native-tomtom-maps';

const OrderDelivery = () => {
  const [results, setResults] = React.useState<any>([]);
  async function getResults(query:string){
    const encodedQuery = encodeURI(query)
    const res = await fetch(`https://api.tomtom.com/search/2/search/${encodedQuery}.json?limit=5&key=XoCPZ4yP97o1aoGvWiUl5zKn2u23AAFg`).then(r=>r.json());

    console.log(res);
    setResults(res.results)
  }

  return (
    <View>
      <Text>OrderDelivery</Text>
      {/* <TomtomMaps
    markers={[{ lat: 40.9175, lng: 38.3927, label: 'Giresun' }, { lat: 40.9862, lng: 37.8797, label: 'Ordu' }]}
    mapZoom={15}
    mapCenter={{ lat: 40.9175, lng: 38.3927 }}
    mapOptions={{
        tilesType: 'VECTOR',
        lang: 'en-US',
        perspective: '2D'
    }}
    style={{flex:1}}
/> */}

      <TextInput onChangeText={getResults} placeholder="type here" style={{ backgroundColor: "lightgray" }} />
      
      {results?.map((r:any) => (
        <Text>{r.address.country||"someything"}</Text>
      ))}
    </View>
  );
};

export default OrderDelivery;

// const styles = StyleSheet.create({});
