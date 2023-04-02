import {StyleSheet, View} from 'react-native';
import React, {FC, useContext} from 'react';
import {Box, Button, Text} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import MapView, {Marker} from 'react-native-maps';
import ProductContext from '../../../Navigation/ProductContext';

export interface ProductionLocationProps {
  navigation: NativeStackNavigationHelpers;
}

const ProductionLocation: FC<ProductionLocationProps> = ({navigation}) => {
  const {product} = useContext(ProductContext);
  return (
    <View>
      <Box style={styles.detailsContainer} bgColor={'blueGray.200'}>
        <Text bold fontSize="4xl" marginTop={'3.5'} textAlign={'center'}>
          Location
        </Text>
        <Box
          style={styles.Box}
          borderRadius={'lg'}
          bgColor={'blueGray.300'}
          paddingY={2}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: product.location.lat,
              longitude: product.location.lng,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}>
            <Marker
              coordinate={{
                latitude: product.location.lat,
                longitude: product.location.lng,
              }}
            />
          </MapView>
        </Box>
        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}
          onPress={() => navigation.navigate('AllProducts')}>
          Back
        </Button>
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 30,
    marginTop: 15,
  },
  detailsContainer: {
    borderWidth: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 25,
    height: '110%',
    borderColor: 'skyblue',
  },
  Button: {
    marginHorizontal: '15%',
    marginVertical: '3%',
  },
  Box: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: '4%',
    justifyContent: 'center',
    height: '40%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default ProductionLocation;
// change text color of react native button?
