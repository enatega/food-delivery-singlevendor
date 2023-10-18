import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import i18n from '../../../i18n'
import { TextDefault, WrapperView } from '../../components'
import { NAVIGATION_SCREEN } from '../../utils/constant'
import useStyle from './styles'
import { useTheme } from '@react-navigation/native'

const links = [
  {
    title: 'Product Page',
    url: 'https://enatega.com/enatega-single-vendor/'
  },
  { title: 'Docs', url: 'https://enatega.com/docs/enatega-singlevendor-introduction/' },
  {
    title: 'Blog',
    url: 'https://enatega.com/blog/'
  },
  { title: 'About Us', url: 'https://ninjascode.com/our-team' }
]
function Help() {
  const styles = useStyle()
  const navigation = useNavigation()
  const { colors } = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('titleHelp'),
      headerRight: null
    })
  }, [navigation])

  return (
    <WrapperView>
      <View style={styles.flex}>
        {links.map(({ title, url }, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_SCREEN.HelpBrowser, { title, url })
            }
            style={styles.itemContainer}
            key={index}>
            <TextDefault H4>{title}</TextDefault>
            <TouchableOpacity>
              <AntDesign name="arrowright" size={22} color={colors.fontMainColor} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </WrapperView>
  )
}

export default Help
