import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send
} from 'react-native-gifted-chat'
import { MainWrapper, TextDefault } from '../../components'
import { alignment } from '../../utilities/alignment'
import colors from '../../utilities/colors'
import { scale } from '../../utilities/scaling'
import useStyle from './styles'

const UserInfo = {
  _id: 1,
  name: 'Jason',
  active: true
}

function Chat() {
  const styles = useStyle()
  const navigation = useNavigation()
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [])

  const _keyboardDidShow = () => setIsTyping(true)
  const _keyboardDidHide = () => setIsTyping(false)

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat'
    })
    setMessages([
      {
        _id: 1,
        text: 'How can I help you?',
        sent: true,
        received: true,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      }
    ])
  }, [navigation])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: colors.fontMainColor
          },
          left: {
            color: colors.fontMainColor
          }
        }}
        bottomContainerStyle={{
          right: {
            ...alignment.PTxSmall
          },
          left: {
            ...alignment.PTxSmall
          }
        }}
        wrapperStyle={{
          right: {
            minWidth: 150,
            backgroundColor: colors.yellowishOrange,
            borderTopRightRadius: scale(15),
            borderTopLeftRadius: scale(15),
            borderBottomLeftRadius: scale(15),
            borderBottomRightRadius: 0,
            ...alignment.MVxSmall,
            ...alignment.PVxSmall,
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3
          },
          left: {
            minWidth: 150,
            backgroundColor: colors.lightBackground,
            borderTopRightRadius: scale(15),
            borderTopLeftRadius: scale(15),
            borderBottomRightRadius: scale(15),
            borderBottomLeftRadius: 0,
            ...alignment.MVxSmall,
            ...alignment.PVxSmall,
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3
          }
        }}
      />
    )
  }

  const renderSend = props => (
    <Send {...props} containerStyle={styles.sendBtn}>
      <View style={styles.rightBtn}>
        <Feather
          name={'send'}
          color={colors.buttonText}
          size={scale(17)}
          style={{
            transform: [
              { rotateZ: '45deg' },
              { translateY: 2 },
              { translateX: -1 }
            ]
          }}
        />
      </View>
    </Send>
  )
  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
        renderSend={renderSend}
        render
      />
    )
  }

  return (
    <MainWrapper>
      <View style={[styles.flex, styles.mainContainer]}>
        <View style={styles.header}>
          <FontAwesome
            name="circle"
            color={UserInfo.active ? colors.iconPink : colors.fontSecondColor}
          />
          <TextDefault medium H5 style={alignment.PLsmall}>
            {UserInfo.active ? UserInfo.name : 'Offline'}
          </TextDefault>
        </View>
        <GiftedChat
          inverted
          alwaysShowSend
          user={UserInfo}
          isTyping={isTyping}
          messages={messages}
          onSend={messages => onSend(messages)}
          renderAvatar={() => null}
          renderBubble={renderBubble}
          renderInputToolbar={customtInputToolbar}
          textInputStyle={styles.inputStyle}
          minInputToolbarHeight={60}
          // renderFooter={() =>
          //   isTyping ? (
          //     <TextDefault
          //       textColor={colors.selected}
          //       style={[alignment.PLlarge, alignment.MBsmall]}>
          //       User is typing...
          //     </TextDefault>
          //   ) : null
          // }
          timeTextStyle={{
            left: {
              width: '100%',
              color: colors.fontMainColor,
              fontSize: 11,
              textAlign: 'right'
            },
            right: {
              color: colors.fontMainColor,
              fontSize: 11
            }
          }}
        />
      </View>
    </MainWrapper>
  )
}

export default Chat
