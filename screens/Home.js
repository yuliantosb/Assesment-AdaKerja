import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getRepositories} from '../redux/actions/repositories';
import {getToken} from '../redux/actions/token';

const {height, width} = Dimensions.get('window');

export default function Home({route, navigation}) {
  const {code} = route.params;
  const [q, setQ] = useState('react native');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repositories.repositories);
  const loading = useSelector((state) => state.repositories.loading);
  const user = useSelector((state) => state.token.user);
  const fetching = useSelector((state) => state.token.fetching);

  const nextPage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(
      getToken({
        code,
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getRepositories({
        per_page: 5,
        page,
        q,
      }),
    );
  }, [page]);

  const handleChangeKeyword = (value) => {
    setQ(value);
  };

  const handleNextPage = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= 161.5) {
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

  const handleSearch = () => {
    dispatch(
      getRepositories({
        per_page: 5,
        page: 1,
        q,
        repositories,
      }),
    );
  };

  const handleLogout = () => {
    navigation.navigate('Splash');
  };

  const Repositories = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            url: item.url,
          })
        }
        style={{marginBottom: 40}}>
        <View style={styles.repositoryWrapper}>
          <View
            style={{
              width: width / 1.5,
            }}>
            <Text style={styles.title2}>{item.full_name}</Text>
            <Text style={styles.subtitle}>{item.description}</Text>
          </View>
          <View>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
              }}
              source={{
                uri: item.owner.avatar_url,
              }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Ionicons
              name="star"
              size={18}
              style={{color: '#F2C94C', marginRight: 10}}
            />
            <Text style={styles.subtitle}>
              {(item.stargazers_count / 1000).toFixed(2)}K
            </Text>
          </View>
          <View style={styles.footerContent}>
            <Ionicons
              name="eye"
              size={18}
              style={{color: '#828282', marginRight: 10}}
            />
            <Text style={styles.subtitle}>
              {(item.watchers_count / 1000).toFixed(2)}K
            </Text>
          </View>
          <View style={styles.footerContent}>
            <Ionicons
              name="git-branch"
              size={18}
              style={{color: '#828282', marginRight: 10}}
            />
            <Text style={styles.subtitle}>
              {(item.forks_count / 1000).toFixed(2)}K
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const NextPage = ({nextPage}) => {
    const appearNextPage = nextPage.interpolate({
      inputRange: [180, 200],
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
          top: height / 3.25,
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {fetching ? (
        <ActivityIndicator
          style={{position: 'absolute', top: height / 2, left: width / 2}}
          size="large"
        />
      ) : (
        <>
          <SafeAreaView>
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Hello {user && user.name}</Text>
                <Text style={styles.subtitle}>@{user && user.login}</Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {user && (
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                      }}
                      source={{
                        uri: user.avatar_url,
                      }}
                    />
                  )}
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
            </View>
          </SafeAreaView>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Search Repository</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={q}
                  onChangeText={handleChangeKeyword}
                  onEndEditing={handleSearch}
                  style={styles.input}
                  placeholderTextColor="#BDBDBD"
                  placeholder="Search..."
                />
                <TouchableOpacity onPress={handleSearch}>
                  <Feather style={{color: '#828282'}} name="search" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 30,
              marginTop: 40,
              flex: 1,
              paddingBottom: 20,
            }}>
            {loading ? (
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
                data={repositories}
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) => data.id.toString()}
                renderItem={Repositories}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: nextPage}}}],
                  {useNativeDriver: true},
                )}
                onMomentumScrollEnd={handleNextPage}
                scrollEventThrottle={16}
              />
            )}
          </View>
          {!loading && <NextPage nextPage={nextPage} />}
          {!loading && <PrevPage nextPage={nextPage} />}
        </>
      )}
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
