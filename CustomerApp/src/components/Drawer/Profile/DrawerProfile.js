import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import UserContext from '../../../context/User'
import { alignment } from '../../../utils/alignment'
import { NAVIGATION_SCREEN } from '../../../utils/constant'
import { TextDefault } from '../../Text'
import useStyle from './styles'
import i18n from '../../../../i18n'

function DrawerProfile() {
  const styles = useStyle()
  const navigation = useNavigation()
  const { isLoggedIn, loadingProfile, profile } = useContext(UserContext)

  if (loadingProfile) return <TextDefault>Loading...</TextDefault>
  return (
    <View style={styles.mainContainer}>
      {!isLoggedIn && (
        <View style={styles.logInContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION_SCREEN.CreateAccount)
            }}>
            <TextDefault textColor={styles.whiteFont.color} bold H4>
              {i18n.t('loginOrCreateAcc')}
            </TextDefault>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.loggedInContainer}>
        {isLoggedIn && profile && (
          <>
            <View style={styles.imgContainer}>
              <TextDefault bolder H1>
                {profile.name.substr(0, 1).toUpperCase()}
              </TextDefault>
            </View>
            <TextDefault
              textColor={styles.whiteFont.color}
              medium
              H5
              style={alignment.PLxSmall}>
              {i18n.t('welcome')}
            </TextDefault>
            <TextDefault
              textColor={styles.whiteFont.color}
              bold
              H4
              style={alignment.PLxSmall}>
              {profile.name}
            </TextDefault>
          </>
        )}
      </View>
    </View>
  )
}
export default DrawerProfile
