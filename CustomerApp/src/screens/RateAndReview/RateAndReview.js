import { useMutation } from '@apollo/react-hooks'
import { EvilIcons } from '@expo/vector-icons'
import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import gql from 'graphql-tag'
import React, { useLayoutEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import StarRating from 'react-native-star-rating'
import i18n from '../../../i18n'
import { reviewOrder } from '../../apollo/server'
import { FlashMessage } from '../../components/FlashMessage/FlashMessage'
import Spinner from '../../components/Spinner/Spinner'
import TextDefault from '../../components/Text/TextDefault/TextDefault'
import { scale } from '../../utils/scaling'
import useStyle from './styles'

// constants
const REVIEWORDER = gql`
  ${reviewOrder}
`

function RateAndReview() {
  const route = useRoute()
  const styles = useStyle()
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [id] = useState(route.params._id ?? null)
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const inset = useSafeAreaInsets()

  const [mutate, { loading: loadingMutation }] = useMutation(REVIEWORDER, {
    onError,
    onCompleted
  })
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('rateAndReview'),
      headerRight: null
    })
  }, [navigation])

  function onFinishRating(rating) {
    setRating(rating)
  }

  function onChangeText(description) {
    setDescription(description)
  }

  function onSubmit() {
    mutate({
      variables: {
        orderId: id,
        rating: rating,
        description: description
      }
    })
  }

  function onCompleted(data) {
    navigation.pop(2)
  }

  function onError(error) {
    FlashMessage({
      message: error.networkError.result.errors[0].message
    })
  }

  return (
    <>
      <View style={[styles.flex, { backgroundColor: colors.background }]}>
        <View style={styles.reviewTextContainer}>
          <View style={styles.reviewTextSubContainer}>
            <View style={styles.reviewTextContainerText}>
              <TextDefault H4 bold>
                {i18n.t('writeAReview')}
              </TextDefault>
            </View>
            <View style={styles.reviewTextContainerImage}>
              <EvilIcons
                name="pencil"
                size={scale(35)}
                color={colors.iconColorPrimary}
              />
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingSubContainer}>
            <StarRating
              emptyStarColor={colors.startColor}
              fullStarColor={colors.startOutlineColor}
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={onFinishRating}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <TextInput
              style={[styles.textinput, { color: colors.fontMainColor }]}
              placeholderTextColor={colors.fontSecondColor}
              onChangeText={onChangeText}
              placeholder={i18n.t('reviewPlaceholder')}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.btnSubContainer}>
            {loadingMutation && <Spinner />}
            {!loadingMutation && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onSubmit}
                style={styles.btnTouch}>
                <TextDefault textColor={colors.buttonText} H3 bold>
                  {i18n.t('submit')}
                </TextDefault>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          paddingBottom: inset.bottom,
          backgroundColor: colors.background
        }}
      />
    </>
  )
}
export default RateAndReview
