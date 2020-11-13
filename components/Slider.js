import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import data from '../assets/data';
const {width, height} = Dimensions.get('window');

export default function Slider() {
  const [xIndex, setXIndex] = useState(0);

  const ImageSlider = ({item}) => {
    return (
      <View
        style={{
          width,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 40,
          marginTop: height / 5,
        }}>
        <item.image />
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#333',
            fontSize: 16,
            marginBottom: 10,
            marginTop: 40,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
            color: '#4F4F4F',
            fontSize: 13,
          }}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.sliderWrapper}>
        <View>
          <FlatList
            data={data}
            renderItem={({item}, index) => (
              <ImageSlider item={item} index={index} />
            )}
            keyExtractor={(data) => data.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={(e) => {
              let offset = e.nativeEvent.contentOffset.x;
              let index = parseInt(offset / width); // your cell height
              setXIndex(index);
            }}
            scrollEventThrottle={16}
          />
        </View>
      </View>
      <View style={styles.dotsWrapper}>
        {data.map((data, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dots,
                {
                  backgroundColor: index === xIndex ? '#24292E' : '#CFD0D1',
                  width: index === xIndex ? 30 : 10,
                },
              ]}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageSlider: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  sliderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  dots: {
    height: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});
