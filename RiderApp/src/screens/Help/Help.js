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
      'https://enatega.com/enatega-single-vendor/'
  },
  { title: 'Docs', url: 'https://enatega.com/docs/enatega-singlevendor-rider-app-introduction/' },
  {
    title: 'Blog',
    url:
      'https://enatega.com/blog/'
  },
  { title: 'About Us', url: 'https://ninjascode.com/our-team/' }
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
