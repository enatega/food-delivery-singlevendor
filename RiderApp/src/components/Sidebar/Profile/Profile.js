import React from 'react'
import { View } from 'react-native'
import gql from 'graphql-tag'
import Spinner from '../../Spinner/Spinner'
import styles from './styles'
import { profile } from '../../../apollo/queries'
import { useQuery } from '@apollo/react-hooks'
import TextDefault from '../../Text/TextDefault/TextDefault'
import colors from '../../../utilities/colors'
import TextError from '../../Text/TextError/TextError'
import i18n from '../../../../i18n'

const PROFILE = gql`
  ${profile}
`

function Profile() {
  const { data, loading, error } = useQuery(PROFILE)
  if (loading) return <Spinner />
  if (error) return <TextError text="Something is worng" />
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {data.rider.name && (
          <View style={styles.imgContainer}>
            <TextDefault textColor={colors.themeBackground} bold H1>
              {data.rider.name.substr(0, 1).toUpperCase()}
            </TextDefault>
          </View>
        )}
      </View>
      <View style={styles.rightContainer}>
        <TextDefault H5 bold textColor={colors.fontSecondColor}>
          {i18n.t('welcome')}
        </TextDefault>
        <TextDefault H3 textColor={colors.fontSecondColor} bolder>
          {data.rider.username}
        </TextDefault>
      </View>
    </View>
  )
}

export default Profile
