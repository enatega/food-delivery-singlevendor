import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview'
import { MainWrapper, Spinner } from '../../components'
import i18n from '../../../i18n'

function HelpBrowser() {
  const navigation = useNavigation()
  const route = useRoute()
  const { title, url } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: i18n.t(title)
    })
  }, [navigation])

  return (
    <MainWrapper>
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => <Spinner />}
      />
    </MainWrapper>
  )
}

export default HelpBrowser
