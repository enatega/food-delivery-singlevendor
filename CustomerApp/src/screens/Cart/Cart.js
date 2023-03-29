import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { AntDesign } from '@expo/vector-icons'
import {
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme
} from '@react-navigation/native'
import gql from 'graphql-tag'
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { Modalize } from 'react-native-modalize'
import i18n from '../../../i18n'
import { foodByIds, getCoupon, myOrders, placeOrder } from '../../apollo/server'
import EmptyCart from '../../assets/images/SVG/imageComponents/EmptyCart'
import {
  CartItem,
  CustomIcon,
  FlashMessage,
  Spinner,
  TextDefault,
  Triangle,
  WrapperView
} from '../../components'
import PaymentModal from '../../components/Modals/PaymentModal/PaymentModal'
import ConfigurationContext from '../../context/Configuration'
import UserContext from '../../context/User'
import { alignment } from '../../utils/alignment'
import Analytics from '../../utils/analytics'
import { ICONS_NAME, NAVIGATION_SCREEN } from '../../utils/constant'
import { paypalCurrencies, stripeCurrencies } from '../../utils/currencies'
import { scale } from '../../utils/scaling'
import useStyle from './styles'

const FOOD_BY_IDS = gql`
  ${foodByIds}
`
const GET_COUPON = gql`
  ${getCoupon}
`
const PLACEORDER = gql`
  ${placeOrder}
`

const ORDERS = gql`
  ${myOrders}
`

function Cart() {
  const route = useRoute()
  const styles = useStyle()
  const { colors } = useTheme()
  const client = useApolloClient()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const configuration = useContext(ConfigurationContext)
  const {
    isLoggedIn,
    profile,
    cart,
    addQuantity: addQuantityContext,
    removeQuantity,
    updateCart
  } = useContext(UserContext)

  const [foods, setFoods] = useState([])
  const [coupon, setCoupon] = useState('')
  const [discountPercent, setDiscountPercent] = useState(null)
  const [validCoupon, setValidCoupon] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const modalizeRef = useRef(null)

  // const closeModal = () => {
  //   modalizeRef.current.close()
  // }

  const [mutate] = useMutation(GET_COUPON, {
    onCompleted,
    onError
  })
  const [mutateOrder, { loading: loadingOrderMutation }] = useMutation(
    PLACEORDER,
    {
      update,
      onCompleted: placeOrderCompleted,
      errorPlaceOrder
    }
  )

  const COD_PAYMENT = {
    payment: 'COD',
    label: i18n.t('cod'),
    index: 2,
    icon: ICONS_NAME.Cash,
    iconSize: scale(25)
  }
  const payObj = route.params ? route.params.PayObject : null
  const coupanObj = route.params ? route.params.CoupanObject : null

  const address =
    isLoggedIn && profile.addresses
      ? profile.addresses.filter(a => a.selected)[0]
      : null

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('titleCart'),
      headerRight: null
    })
  }, [navigation])

  useEffect(() => {
    didFocus()
  }, [])

  useEffect(() => {
    if (coupanObj !== null && typeof coupanObj !== 'undefined') {
      mutate({ variables: { coupon: coupanObj } })
      setCoupon(coupanObj)
      setValidCoupon(null)
      setDiscountPercent(null)
    }
  }, [coupanObj])

  useEffect(() => {
    setPaymentMethod(payObj || COD_PAYMENT)
  }, [payObj])

  const paymentChange = payObj => {
    setPaymentMethod(payObj || COD_PAYMENT)
  }

  function update(cache, { data: { placeOrder } }) {
    if (placeOrder && placeOrder.payment_method === 'COD') {
      const data = cache.readQuery({ query: ORDERS })
      // console.log('placeorder', placeOrder)
      if (data) {
        cache.writeQuery({
          query: ORDERS,
          data: { orders: [placeOrder, ...data.orders] }
        })
      }
    }
  }

  function placeOrderCompleted(data) {
    const trackingOpts = {
      id: data.placeOrder.user._id,
      usernameOrEmail: data.placeOrder.user.email,
      orderId: data.placeOrder.order_id
    }
    Analytics.identify(data.placeOrder.user._id, trackingOpts)
    Analytics.track(Analytics.events.USER_PLACED_ORDER, trackingOpts)
    if (paymentMethod.payment === 'COD') {
      navigation.reset({
        routes: [
          { name: 'Menu' },
          {
            name: 'OrderDetail',
            params: { _id: data.placeOrder._id, clearCart: true }
          }
        ]
      })
    } else if (paymentMethod.payment === 'PAYPAL') {
      navigation.replace('Paypal', {
        _id: data.placeOrder.order_id,
        currency: configuration.currency
      })
    } else if (paymentMethod.payment === 'STRIPE') {
      navigation.replace('StripeCheckout', {
        _id: data.placeOrder.order_id,
        amount: data.placeOrder.order_amount,
        email: data.placeOrder.user.email,
        currency: configuration.currency
      })
    }
  }
  function errorPlaceOrder(error) {
    FlashMessage({
      message: error.networkError.result.errors[0].message
    })
  }

  function onCompleted({ coupon }) {
    if (coupon) {
      if (coupon.enabled) {
        setDiscountPercent(coupon.discount)
        setValidCoupon(coupon.code)

        FlashMessage({
          message: i18n.t('coupanApply')
        })
      } else {
        FlashMessage({
          message: i18n.t('coupanFailed')
        })
      }
    }
  }

  function onError(error) {
    showMessage({
      message: `${error}`,
      type: 'none',
      style: { width: '80%' }
    })
  }

  async function addQuantity(key) {
    const cartIndex = cart.findIndex(c => c.key === key)
    const food = foods.find(f => f._id === cart[cartIndex]._id)
    if (food.stock > cart[cartIndex].quantity) {
      await addQuantityContext(key)
    } else {
      FlashMessage({
        message: 'No more items in stock'
      })
    }
  }

  function calculatePrice(deliveryCharges = 0, withDiscount) {
    let itemTotal = 0
    cart.forEach(cartItem => {
      if (!cartItem.price) {
        return
      }
      itemTotal += cartItem.price * cartItem.quantity
    })
    if (withDiscount && discountPercent) {
      itemTotal = itemTotal - (discountPercent / 100) * itemTotal
    }
    return (itemTotal + deliveryCharges).toFixed(2)
  }

  const onClose = () => {
    modalizeRef.current?.close()
  }

  function validateOrder() {
    if (!cart.length) {
      FlashMessage({
        message: i18n.t('validateItems')
      })
      return false
    }
    if (!address) {
      FlashMessage({
        message: i18n.t('validateDelivery')
      })
      return false
    }
    if (!paymentMethod) {
      FlashMessage({
        message: 'Set payment method before checkout'
      })
      return false
    }
    if (profile.phone.length < 1) {
      navigation.navigate(NAVIGATION_SCREEN.Profile, { backScreen: 'Cart' })
      return false
    }
    return true
  }

  function checkPaymentMethod(currency) {
    if (paymentMethod.payment === 'STRIPE') {
      return stripeCurrencies.find(val => val.currency === currency)
    }
    if (paymentMethod.payment === 'PAYPAL') {
      return paypalCurrencies.find(val => val.currency === currency)
    }
    return true
  }

  function transformOrder(cartData) {
    return cartData.map(food => {
      return {
        food: food._id,
        quantity: food.quantity,
        variation: food.variation._id,
        addons: food.addons
          ? food.addons.map(({ _id, options }) => ({
            _id,
            options: options.map(({ _id }) => _id)
          }))
          : []
      }
    })
  }

  async function onPayment() {
    if (checkPaymentMethod(configuration.currency)) {
      const items = transformOrder(cart)
      mutateOrder({
        variables: {
          orderInput: items,
          paymentMethod: paymentMethod.payment,
          couponCode: coupon,
          address: {
            label: address.label,
            delivery_address: address.delivery_address,
            details: address.details,
            longitude: address.longitude,
            latitude: address.latitude
          }
        }
      })
    } else {
      FlashMessage({
        message: i18n.t('paymentNotSupported')
      })
    }
  }

  async function didFocus() {
    try {
      const validatedItems = []
      if (cart && cart.length) {
        const ids = cart.map(({ _id }) => _id)
        const {
          data: { foodByIds }
        } = await client.query({
          query: FOOD_BY_IDS,
          variables: { ids },
          fetchPolicy: 'network-only'
        })
        const transformCart = cart.map(cartItem => {
          const food = foodByIds.find(food => food._id === cartItem._id)
          if (!food) return null
          const variation = food.variations.find(
            variation => variation._id === cartItem.variation._id
          )
          if (!variation) return null
          if (!food.stock) return null
          if (food.stock < cartItem.quantity) {
            cartItem.quantity = food.stock
          }
          const title = `${food.title}(${variation.title})`
          let price = variation.price
          if (cartItem.addons) {
            cartItem.addons.forEach(addon => {
              const cartAddon = variation.addons.find(
                add => add._id === addon._id
              )
              addon.options.forEach(option => {
                const optionfound = cartAddon.options.find(
                  opt => opt._id === option._id
                )
                price += optionfound.price
              })
            })
          }
          validatedItems.push(cartItem)
          return {
            ...cartItem,
            img_url: food.img_url,
            title: title,
            price: price.toFixed(2)
          }
        })

        if (isFocused) {
          await updateCart(transformCart.filter(item => item))
          setFoods(foodByIds)
          setLoadingData(false)
        }
      } else {
        if (isFocused) {
          setLoadingData(false)
        }
      }
    } catch (e) {
      FlashMessage({
        message: e.message
      })
    }
  }

  function emptyCart() {
    if (loadingData) {
      return <Spinner />
    } else {
      return (
        <View style={styles.subContainerImage}>
          <View style={styles.imageContainer}>
            <EmptyCart width={scale(180)} height={scale(180)} />
          </View>
          <View style={styles.descriptionEmpty}>
            <TextDefault H4 style={{ ...alignment.MTlarge }} bold center>
              {i18n.t('emptyCart')}
            </TextDefault>
            <TextDefault
              style={{ ...alignment.MTlarge }}
              textColor={colors.fontSecondColor}
              bold
              center>
              {i18n.t('hungry')}?
            </TextDefault>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.emptyButton}
            onPress={() => navigation.navigate(NAVIGATION_SCREEN.Menu)}>
            <TextDefault textColor={colors.buttonText} bold H5 center>
              {i18n.t('emptyCartBtn')}
            </TextDefault>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <WrapperView>
      <View style={styles.mainContainer}>
        {!cart.length && emptyCart()}
        {!!cart.length && (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.flex}
              contentContainerStyle={[alignment.PLmedium, alignment.PRmedium]}>
              <View style={[styles.dealContainer, styles.pT10, styles.mB10]}>
                {cart.map(food => (
                  <View
                    key={food.key}
                    style={[styles.itemContainer, styles.pB5]}>
                    {food.price && food.title ? (
                      <CartItem
                        quantity={food.quantity}
                        dealName={food.title}
                        image={food.img_url}
                        dealPrice={(
                          parseFloat(food.price) * food.quantity
                        ).toFixed(2)}
                        addQuantity={() => {
                          addQuantity(food.key)
                        }}
                        removeQuantity={() => {
                          removeQuantity(food.key)
                        }}
                      />
                    ) : (
                      <Spinner backColor="transparent" />
                    )}
                  </View>
                ))}
              </View>
              <View style={[styles.priceContainer, styles.mB10]}>
                <View style={[styles.floatView, styles.pB10]}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.fontSecondColor}
                    style={{ width: '30%' }}
                    H5>
                    {i18n.t('subTotal')}
                  </TextDefault>
                  <TextDefault numberOfLines={1} medium H5>
                    {configuration.currency_symbol}
                    {calculatePrice(0, false)}
                  </TextDefault>
                </View>
                <View style={[styles.floatView, styles.pB10]}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.fontSecondColor}
                    H5>
                    {i18n.t('deliveryFee')}
                  </TextDefault>
                  <TextDefault numberOfLines={1} medium H5>
                    {configuration.currency_symbol}
                    {configuration.delivery_charges.toFixed(2)}
                  </TextDefault>
                </View>
                {!validCoupon ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.pB10, styles.width100]}
                    onPress={() => {
                      navigation.navigate(NAVIGATION_SCREEN.Coupon)
                      // alert('asd')
                    }}>
                    <TextDefault
                      H5
                      numberOfLines={1}
                      textColor={colors.buttonBackgroundBlue}
                      medium>
                      {i18n.t('haveVoucher')}?
                    </TextDefault>
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.floatView, styles.pB10]}>
                    <TextDefault numberOfLines={1} style={{ width: '30%' }}>
                      {validCoupon}
                    </TextDefault>
                    <View
                      numberOfLines={1}
                      style={[
                        styles.floatText,
                        styles.floatRight,
                        { flexDirection: 'row', justifyContent: 'flex-end' }
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          setCoupon('')
                          setValidCoupon(null)
                          setDiscountPercent(null)
                        }}>
                        <TextDefault textColor={colors.buttonBackground}>
                          {validCoupon}
                        </TextDefault>
                      </TouchableOpacity>
                      <TextDefault>
                        -{configuration.currency_symbol}
                        {parseFloat(
                          calculatePrice(0, false) - calculatePrice(0, true)
                        ).toFixed(2)}
                      </TextDefault>
                    </View>
                  </View>
                )}
                <View
                  style={[
                    styles.horizontalLine,
                    styles.pB10,
                    styles.width100,
                    styles.mB10
                  ]}
                />
                <View style={[styles.floatView, styles.pB10]}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.buttonBackgroundBlue}
                    style={{ width: '30%' }}
                    medium
                    H5>
                    Total
                  </TextDefault>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.buttonBackgroundBlue}
                    style={{ width: '70%' }}
                    medium
                    right
                    H5>
                    {configuration.currency_symbol}
                    {calculatePrice(configuration.delivery_charges, true)}{' '}
                  </TextDefault>
                </View>
                <View style={[styles.floatView, { marginBottom: -1 }]}>
                  {Array(20)
                    .fill(1)
                    .map((value, index) => (
                      <Triangle key={index} style={{ width: '5%' }} />
                    ))}
                </View>
              </View>

              {isLoggedIn && profile && (
                <>
                  <View
                    style={[styles.contactContainer, styles.pT10, styles.mB10]}>
                    <View style={[styles.floatView, styles.pB10]}>
                      <TextDefault numberOfLines={1} H5 bold>
                        {i18n.t('contactInfo')}
                      </TextDefault>
                    </View>
                    <View style={[styles.floatView, styles.pB10]}>
                      <TextDefault
                        numberOfLines={1}
                        textColor={colors.fontSecondColor}
                        H5>
                        {i18n.t('phone')}
                      </TextDefault>
                      <TextDefault numberOfLines={1} medium H5 right>
                        {profile.phone ? profile.phone : 'None'}
                      </TextDefault>
                    </View>
                    <View style={[styles.floatView, styles.pB10]}>
                      <TextDefault
                        numberOfLines={1}
                        textColor={colors.fontSecondColor}
                        H5>
                        {i18n.t('email')}
                      </TextDefault>
                      <TextDefault numberOfLines={1} medium H5 right>
                        {profile.email}
                      </TextDefault>
                    </View>
                  </View>
                  <View
                    style={[styles.contactContainer, styles.pT10, styles.mB10]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.pB10}
                      onPress={event => {
                        if (!profile.addresses.length) {
                          navigation.navigate(NAVIGATION_SCREEN.NewAddress, {
                            backScreen: 'Cart'
                          })
                        } else {
                          navigation.navigate(NAVIGATION_SCREEN.CartAddress, {
                            address
                          })
                        }
                      }}>
                      <View style={[styles.floatView, styles.pB10]}>
                        <TextDefault
                          numberOfLines={1}
                          style={{ width: '50%' }}
                          H5
                          bold>
                          {i18n.t('deliveryAddress')}
                        </TextDefault>
                        <TextDefault H5 textColor={colors.buttonBackgroundBlue}>
                          Change
                        </TextDefault>
                      </View>
                      {address ? (
                        <>
                          <TextDefault
                            textColor={colors.fontSecondColor}
                            H5>{`${address.delivery_address}`}</TextDefault>
                          <TextDefault textColor={colors.fontSecondColor} H5>
                            {address.details}
                          </TextDefault>
                        </>
                      ) : (
                        <TextDefault textColor={colors.fontSecondColor} H5>
                          {i18n.t('deliveryAddressmessage')}
                        </TextDefault>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[styles.contactContainer, styles.pT10, styles.mB10]}>
                    <View style={[styles.floatView, styles.mB10]}>
                      <TextDefault bold H5>
                        {i18n.t('paymentMethod')}
                      </TextDefault>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          // navigation.navigate(NAVIGATION_SCREEN.Payment, {
                          //   payment: paymentMethod
                          // })
                          modalizeRef.current.open()
                        }}>
                        <TextDefault textColor={colors.buttonBackgroundBlue} H5>
                          {i18n.t('change')}
                        </TextDefault>
                      </TouchableOpacity>
                    </View>
                    {paymentMethod === null ? (
                      <TouchableOpacity
                        style={[styles.floatView, styles.pB10, styles.pT10]}
                        onPress={() => {
                          navigation.navigate(NAVIGATION_SCREEN.Payment, {
                            payment: paymentMethod
                          })
                        }}>
                        <AntDesign
                          name="plus"
                          size={scale(20)}
                          color={colors.iconColorPrimary}
                        />
                        <TextDefault
                          textColor={colors.buttonBackground}
                          style={[alignment.PLsmall, { width: '70%' }]}
                          right>
                          {i18n.t('paymentMethod')}
                        </TextDefault>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[styles.floatView, styles.pB10, styles.pT10]}
                        onPress={() => {
                          navigation.navigate(NAVIGATION_SCREEN.Payment, {
                            payment: paymentMethod
                          })
                        }}>
                        <View style={alignment.MRxSmall}>
                          <CustomIcon
                            name={paymentMethod.icon}
                            size={paymentMethod.iconSize - scale(5)}
                            color={colors.iconColorPrimary}
                          />
                        </View>
                        <TextDefault
                          textColor={colors.placeHolderColor}
                          H5
                          style={styles.flex}>
                          {paymentMethod.label}
                        </TextDefault>
                        <TextDefault medium H5 right>
                          {configuration.currency_symbol}
                          {calculatePrice(configuration.delivery_charges, true)}
                        </TextDefault>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}
              <View style={[styles.termsContainer, styles.pT10, styles.mB10]}>
                <TextDefault
                  textColor={colors.fontSecondColor}
                  style={alignment.MBsmall}
                  H5>
                  {i18n.t('condition1')}
                </TextDefault>
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              {isLoggedIn && profile ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (validateOrder()) onPayment()
                  }}
                  style={styles.button}>
                  {loadingOrderMutation ? (
                    <ActivityIndicator
                      size="large"
                      style={{ flex: 1, justifyContent: 'center' }}
                      color={colors.buttonText}
                    />
                  ) : (
                    <TextDefault textColor={colors.buttonText} medium H5 center>
                      {i18n.t('orderBtn')}
                    </TextDefault>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate(NAVIGATION_SCREEN.CreateAccount)
                  }}
                  style={styles.button}>
                  <TextDefault
                    textColor={colors.buttonText}
                    style={{ width: '100%' }}
                    H5
                    medium
                    center
                    uppercase>
                    {i18n.t('loginOrCreateAccount')}
                  </TextDefault>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
      <Modalize
        ref={modalizeRef}
        // alwaysOpen={moderateScale(120)}
        adjustToContentHeight
        handlePosition="inside"
        // disableScrollIfPossible={true}
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: false
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height">
        <PaymentModal
          onClose={onClose}
          paymentChange={paymentChange}
          payment={paymentMethod}
        />
      </Modalize>
    </WrapperView>
  )
}

export default Cart
