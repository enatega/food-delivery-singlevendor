import { useMutation } from '@apollo/react-hooks'
import { useTheme } from '@react-navigation/native'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import Modal from 'react-native-modal'
import i18n from '../../../i18n'
import { changePassword } from '../../apollo/server'
import { FlashMessage } from '../../components/FlashMessage/FlashMessage'
import TextDefault from '../../components/Text/TextDefault/TextDefault'
import { alignment } from '../../utils/alignment'
import { scale } from '../../utils/scaling'
import useStyle from './styles'

const CHANGE_PASSWORD = gql`
  ${changePassword}
`

function ChangePassword(props) {
  const styles = useStyle()
  const { colors } = useTheme()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [oldPasswordError, setOldPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')

  const [mutate, { loading }] = useMutation(CHANGE_PASSWORD, {
    onError,
    onCompleted
  })

  function onError(error) {
    if (error.networkError) {
      FlashMessage({
        message: error.networkError.result.errors[0].message
      })
    } else if (error.graphQLErrors) {
      FlashMessage({
        message: error.graphQLErrors[0].message
      })
    }
  }
  function clearFields() {
    setOldPassword('')
    setNewPassword('')
    setOldPasswordError('')
    setNewPasswordError('')
  }

  function onCompleted(data) {
    if (data.changePassword) {
      clearFields()
      FlashMessage({
        message: i18n.t('passChange')
      })
      props.hideModal()
    } else {
      Alert.alert('Error', i18n.t('invalidPass'))
    }
  }

  return (
    <Modal
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}
      isVisible={props.modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <TextDefault bold H4>
              {i18n.t('changePass')}
            </TextDefault>
          </View>

          <View style={{ ...alignment.MTsmall }}>
            <TextField
              secureTextEntry
              error={oldPasswordError}
              label={i18n.t('currentPass')}
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.errorColor}
              tintColor={colors.tagColor}
              labelTextStyle={{ fontSize: scale(12) }}
              onChangeText={setOldPassword}
              onBlur={() => {
                setOldPasswordError(!oldPassword ? i18n.t('passReq') : '')
              }}
            />
          </View>
          <View style={{ ...alignment.MTmedium }}>
            <TextField
              secureTextEntry
              error={newPasswordError}
              label={i18n.t('newPass')}
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.errorColor}
              tintColor={colors.tagColor}
              labelTextStyle={{ fontSize: scale(12) }}
              onChangeText={setNewPassword}
              onBlur={() => {
                setNewPasswordError(!newPassword ? i18n.t('passReq') : '')
              }}
            />
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              const newPasswordError =
                newPassword === '' ? i18n.t('passReq') : ''
              const oldPasswordError =
                oldPassword === '' ? i18n.t('passReq') : ''
              setNewPasswordError(newPasswordError)
              setOldPasswordError(oldPasswordError)

              if (
                oldPasswordError.length === 0 &&
                newPasswordError.length === 0
              ) {
                mutate({ variables: { oldPassword, newPassword } })
              }
            }}
            style={[styles.btnContainer]}>
            <TextDefault textColor={colors.background} bold H5>
              {i18n.t('apply')}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

ChangePassword.propTypes = {
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool.isRequired
}
export default ChangePassword
