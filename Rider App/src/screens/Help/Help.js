import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import i18n from '../../../i18n'
import { MainWrapper, TextDefault } from '../../components'
import colors from '../../utilities/colors'
import { scale, verticalScale } from '../../utilities/scaling'
import styles from './styles'

const links = [
  {
    title: 'Product Page',
    url:
      'https://market.nativebase.io/view/react-native-food-delivery-backend-app'
  },
  { title: 'Docs', url: 'https://enatega.gitbook.io/enatega-full-app/' },
  {
    title: 'Blog',
    url:
      'https://blog.nativebase.io/enatega-full-food-delivery-app-is-finally-here-a6039de4a09d'
  },
  { title: 'About Us', url: 'https://ninjascode.com/pages/ourteam.html' }
]
function Help() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: i18n.t('titleHelp')
    })
  }, [navigation])

  return (
    <MainWrapper>
      <View style={{ marginTop: verticalScale(20) }} />
      {links.map(({ title, url }, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HelpBrowser', { title, url })}
          style={styles.itemContainer}
          key={index}>
          <TextDefault textColor={colors.fontMainColor} H4>
            {title}
          </TextDefault>
          <AntDesign name="arrowright" size={scale(20)} />
        </TouchableOpacity>
      ))}
    </MainWrapper>
  )
}

export default Help
