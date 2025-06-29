import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootNativeStackParamList} from '.';
import {SCREEN_SIZE} from '../../utils/screen_size';

export type TPost = {
  id: number;
  name: string;
  avatar: string;
  images: {id: number; image: string}[];
};

type PostScreenNavigationProp = NativeStackNavigationProp<
  RootNativeStackParamList,
  'Post'
>;

type PostScreenRouteProp = RouteProp<RootNativeStackParamList, 'Post'>;

const Post = () => {
  const router = useRoute<PostScreenRouteProp>();
  const navigation = useNavigation<PostScreenNavigationProp>();
  const {data} = router.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data.name,
      headerTitleStyle: {
        color: '#000000',
      },
      headerBackTitle: '',
      headerTintColor: '#000000',
    });
  }, [navigation, data]);
  return (
    <View style={styles.container}>
      <Image src={data.avatar} style={styles.avatar} resizeMode={'center'} />
      <View style={styles.content}>
        <FlatList
          numColumns={3}
          data={data.images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log('clicckkk');
                  navigation.navigate('Detail', {
                    data: item,
                  });
                }}
                activeOpacity={0.9}>
                <Image src={item.image} style={styles.image} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    width: SCREEN_SIZE.WIDTH_SCREEN / 3,
    height: (SCREEN_SIZE.WIDTH_SCREEN / 3) * 1.5,
  },
});

export default Post;
