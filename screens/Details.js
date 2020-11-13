import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {getCommits} from '../redux/actions/commits';

const {height, width} = Dimensions.get('window');

export default function Details({route, navigation}) {
  const {url} = route.params;

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const commits = useSelector((state) => state.commits.commits);
  const fetching = useSelector((state) => state.commits.loading);

  const nextPage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(
      getCommits({
        per_page: 5,
        page,
        url,
      }),
    );
  }, [page]);

  const handleNextPage = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= 108) {
      setPage(page + 1);
    }

    if (offsetY <= 0) {
      if (page == 1) {
        setPage(1);
      } else {
        setPage(page - 1);
      }
    }
  };

  const handleLogout = () => {
    navigation.navigate('Splash');
  };

  const Repositories = ({item}) => {
    const avatar = item.author
      ? item.author.avatar_url
      : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp';
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        style={{
          marginBottom: 40,
          paddingBottom: 20,
          paddingHorizontal: 40,
          borderBottomColor: '#F2F2F2',
          borderBottomWidth: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.repositoryWrapper}>
            <View>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  marginRight: 20,
                }}
                source={{
                  uri: avatar,
                }}
              />
            </View>
            <View
              style={{
                width: width / 2,
              }}>
              <Text style={styles.title2}>{item.commit.author.name}</Text>
              <Text style={styles.subtitle}>
                @{item.author && item.author.login}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>
              {moment(item.commit.author.date).format('DD/M/Y')}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.subtitle}>
            {item.commit.message.substring(0, 100).replace(/\r?\n|\r/g, ' ')}...
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const NextPage = ({nextPage}) => {
    const appearNextPage = nextPage.interpolate({
      inputRange: [110, 130],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          alignItems: 'center',
          opacity: appearNextPage,
        }}>
        <Feather name="arrow-right" size={20} />
        <Text style={styles.subtitle}>Next</Text>
      </Animated.View>
    );
  };

  const PrevPage = ({nextPage}) => {
    const appearPrevPage = nextPage.interpolate({
      inputRange: [-40, -10],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: height / 6,
          alignSelf: 'center',
          alignItems: 'center',
          opacity: appearPrevPage,
        }}>
        <Feather name="arrow-left" size={20} />
        <Text style={styles.subtitle}>Prev</Text>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <SafeAreaView>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Commits</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} style={{color: '#333'}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Feather
                name="log-out"
                size={24}
                style={{
                  color: '#24292E',
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          marginTop: 40,
          flex: 1,
          paddingBottom: 20,
        }}>
        {fetching ? (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: width / 3,
              alignSelf: 'center',
            }}
            size="large"
          />
        ) : (
          <Animated.FlatList
            data={commits}
            showsVerticalScrollIndicator={false}
            keyExtractor={(data) => data.node_id}
            renderItem={Repositories}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: nextPage}}}],
              {useNativeDriver: true},
            )}
            onMomentumScrollEnd={handleNextPage}
          />
        )}
      </View>
      {!fetching && <NextPage nextPage={nextPage} />}
      {!fetching && <PrevPage nextPage={nextPage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333',
  },
  title2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#828282',
  },
  content: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 2,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#828282',
  },
  repositoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
});
