import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native';

type TItemData = {
  image: string;
  desc: string;
};

type SliderComponentProps = {
  data: TItemData[];
};

const SliderComponent = ({data}: SliderComponentProps) => {
  const [index, setIndex] = useState(0);
  const [dataSlider, setDataSlider] = useState([...data]);
  const refSlider = useRef<FlashList<TItemData>>(null);

  const renderItem: ListRenderItem<TItemData> = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: Dimensions.get('window').width,
        }}>
        <Image style={[styles.image]} source={{uri: item.image}} />
      </View>
    );
  };

  const onViewableItemsChanged = ({
    changed,
    viewableItems,
  }: {
    viewableItems: ViewToken<TItemData>[];
    changed: ViewToken<TItemData>[];
  }) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index as number;
      if (currentIndex % data.length === data.length - 1) {
        setIndex(currentIndex);
        // setDataSlider(prev => [...prev, ...data]);
        refSlider.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        setIndex(currentIndex);
      }
    }
  };

  // ** autoscroll
  const changeSliderListIndex = () => {
    console.log('changeSliderListIndex');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIndex(prev => {
      refSlider.current?.scrollToIndex({
        index: prev + 1,
        animated: true,
      });
      return prev + 1;
    });
  };

  useEffect(() => {
    const autoPlay = setInterval(changeSliderListIndex, 2000);

    return () => {
      clearInterval(autoPlay);
    };
  }, []);

  return (
    <View style={{height: 200, width: '100%'}}>
      <FlashList
        ref={refSlider}
        data={dataSlider}
        estimatedItemSize={300}
        renderItem={renderItem}
        horizontal
        key={item => item.img ?? ''}
        onViewableItemsChanged={onViewableItemsChanged}
        windowSize={1}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        extraData={dataSlider}
        pagingEnabled={true}
      />
    </View>
  );
};

export default SliderComponent;

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
    width: 300,
  },
});
