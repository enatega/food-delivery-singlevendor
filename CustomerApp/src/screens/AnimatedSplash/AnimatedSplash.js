/* eslint-disable react/prop-types */
import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect, useMemo, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), [])
  const [isAppReady, setAppReady] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }).start(() => setAnimationCompleted(true))
    }
  }, [isAppReady])

  const onImageLoaded = useMemo(() => async() => {
    try {
      await SplashScreen.hideAsync()
      // Load stuff
      await Promise.all([])
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true)
    }
  })

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!animationCompleted && (
        <Animated.View
          pointerEvents="none"
          // style={[
          //   StyleSheet.absoluteFill,
          //   {
          //     backgroundColor: Constants.manifest.splash.backgroundColor,
          //     opacity: animation
          //   }
          // ]}
          >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              // resizeMode: 'contain',
              transform: [
                {
                  scale: animation
                }
              ]
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  )
}

function AnimatedSplash({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false)

  const startAsync = useMemo(
    // Load splash image to show
    () => () => Asset.fromModule(image).downloadAsync(),
    [image]
  )

  const onFinish = useMemo(() => setSplashReady(true), [])

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    )
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
}

export default React.memo(AnimatedSplash)
