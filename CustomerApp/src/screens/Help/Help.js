import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import i18n from '../../../i18n'
import { TextDefault, WrapperView } from '../../components'
import { NAVIGATION_SCREEN } from '../../utils/constant'
import useStyle from './styles'

const links = [
  {
    title: 'Product Page',
    url: 'https://market.nativebase.io/view/react-native-food-delivery-backend-app'
  },
  { title: 'Docs', url: 'https://enatega.gitbook.io/enatega-full-app/' },
  {
    title: 'Blog',
    url: 'https://blog.nativebase.io/enatega-full-food-delivery-app-is-finally-here-a6039de4a09d'
  },
  { title: 'About Us', url: 'https://ninjascode.com/pages/ourteam.html' }
]
function Help() {
  const styles = useStyle()
  const navigation = useNavigation()

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
              <AntDesign name="arrowright" size={22} color="black" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </WrapperView>
  )
}

export default Help
