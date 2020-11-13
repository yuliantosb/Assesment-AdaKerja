import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import {WebView} from 'react-native-webview';

const {height, width} = Dimensions.get('window');

export default function Login({navigation}) {
  const [loading, setLoading] = useState(true);

  const parseUrl = (url) => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };

  const handleNavigationChange = (state) => {
    const {url} = state;
    if (url.includes('?code')) {
      const urlParams = parseUrl(url);
      navigation.navigate('Home', {
        code: urlParams.code,
      });
    }
  };

  const handleLoad = (syntheticEvent) => {
    const {nativeEvent} = syntheticEvent;
    const url = nativeEvent.url;

    if (url.includes('?code')) {
      const urlParams = parseUrl(url);
      navigation.navigate('Home', {
        code: urlParams.code,
      });
    }

    setLoading(false);
  };

  return (
    <View style={{flex: 1, paddingTop: 20, backgroundColor: '#fff'}}>
      <WebView
        onLoad={handleLoad}
        source={{
          uri:
            'https://github.com/login/oauth/authorize?scope=user:email&client_id=756ad06360d0419a6ad5',
        }}
        handleWebViewNavigationStateChange={handleNavigationChange}
      />
      {loading && (
        <ActivityIndicator
          style={{position: 'absolute', top: height / 2, left: width / 2}}
          size="large"
        />
      )}
    </View>
  );
}
