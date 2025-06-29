import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootNativeStackParamList} from '.';
import {FlashList} from '@shopify/flash-list';
import {HOME_DATA} from './data';
import {useCallback} from 'react';
import {SCREEN_SIZE} from '../../utils/screen_size';
import PostComponent, {IPost} from './components/post-component';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootNativeStackParamList,
  'Home'
>;

// ** HOME SCREEN
function HomeScreen() {
  const renderItem = useCallback(({item}: {item: IPost}) => {
    console.log({item});
    return <PostComponent {...item} />;
  }, []);

  const renderEmpty = () => <Text>Not found item</Text>;

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const getItemLayout = (data: IPost[] | null, index: number) => ({
    length: SCREEN_SIZE.HEIGHT_SCREEN * 0.7,
    offset: SCREEN_SIZE.HEIGHT_SCREEN * 0.7 * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlashList
        data={HOME_DATA as IPost[]}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        estimatedItemSize={200}
        ListEmptyComponent={renderEmpty}
        getItemType={getItemLayout}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  button: {
    padding: 24,
    marginTop: 20,
    backgroundColor: '#f5c1f5',
  },
  titleButton: {
    fontSize: 14,
    color: 'black',
  },
});
