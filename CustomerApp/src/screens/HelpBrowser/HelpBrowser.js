import React, { useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview'
import Spinner from '../../components/Spinner/Spinner'
import { useNavigation, useRoute } from '@react-navigation/native'
import { WrapperView } from '../../components'

function HelpBrowser() {
  const navigation = useNavigation()
  const route = useRoute()
  const { title, url } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: title
    })
  }, [navigation])

  return (
    <WrapperView>
      <WebView
        startInLoadingState={true}
        renderLoading={() => <Spinner />}
        source={{ uri: url }}
      />
    </WrapperView>
  )
}

export default HelpBrowser
