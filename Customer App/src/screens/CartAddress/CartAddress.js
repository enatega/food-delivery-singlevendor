import { useMutation } from '@apollo/react-hooks'
import { useNavigation, useTheme } from '@react-navigation/native'
import gql from 'graphql-tag'
import React, { useContext, useLayoutEffect } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import i18n from '../../../i18n'
import { selectAddress } from '../../apollo/server'
import {
  CustomIcon,
  RightButton,
  TextDefault,
  WrapperView
} from '../../components'
import RadioButton from '../../components/FdRadioBtn/RadioBtn'
import UserContext from '../../context/User'
import { alignment } from '../../utils/alignment'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../../utils/constant'
import { scale } from '../../utils/scaling'
import useStyle from './styles'

const SELECT_ADDRESS = gql`
  ${selectAddress}
`

function CartAddresses() {
  const { colors } = useTheme()
  const styles = useStyle()
  const navigation = useNavigation()
  const { profile } = useContext(UserContext)

  const [mutate] = useMutation(SELECT_ADDRESS, { onError })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('myAddresses'),
      headerRight: () => (
        <RightButton
          icon={ICONS_NAME.Plus}
          iconSize={scale(18)}
          onPress={() => navigation.navigate(NAVIGATION_SCREEN.NewAddress)}
        />
      )
    })
  }, [navigation])

  function onError(error) {
    console.log(error)
  }

  const onSelectAddress = address => {
    mutate({ variables: { id: address._id } })
    navigation.goBack()
  }

  return (
    <WrapperView>
      <View style={styles.containerInfo}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flex}
          data={profile.addresses}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListHeaderComponent={() => <View style={{ ...alignment.MTmedium }} />}
          renderItem={({ item: address }) => (
            <View style={styles.width100}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.width100}
                onPress={() => {
                  onSelectAddress(address)
                }}>
                <View style={styles.width100}>
                  <View style={[styles.titleAddress, styles.width100]}>
                    <View style={[styles.homeIcon]}>
                      <RadioButton
                        size={10}
                        outerColor={colors.radioOuterColor}
                        innerColor={colors.radioColor}
                        animation={'bounceIn'}
                        isSelected={address.selected}
                        onPress={() => {
                          onSelectAddress(address)
                        }}
                      />
                    </View>
                    <TextDefault style={{ width: '70%' }} H5 bold>
                      {address.label}
                    </TextDefault>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.editButton}
                      onPress={() =>
                        navigation.navigate(NAVIGATION_SCREEN.EditAddress, {
                          ...address
                        })
                      }>
                      <CustomIcon
                        name={ICONS_NAME.Pencil}
                        size={scale(20)}
                        color={colors.tagColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...alignment.MTxSmall }}></View>
                  <View style={styles.addressDetail}>
                    <TextDefault
                      line={4}
                      textColor={colors.fontSecondColor}
                      bold>
                      {address.delivery_address}
                    </TextDefault>
                    <TextDefault
                      line={3}
                      textColor={colors.fontSecondColor}
                      bold>
                      {address.details}
                    </TextDefault>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </WrapperView>
  )
}

export default CartAddresses
