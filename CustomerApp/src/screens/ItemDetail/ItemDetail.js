import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { WrapperView } from '../../components'
import CartComponent from '../../components/CustomizeComponents/CartComponent/CartComponent'
import CheckComponent from '../../components/CustomizeComponents/CheckComponent/CheckComponent'
import HeadingComponent from '../../components/CustomizeComponents/HeadingComponent/HeadingComponent'
import ImageHeader from '../../components/CustomizeComponents/ImageHeader/ImageHeader'
import RadioComponent from '../../components/CustomizeComponents/RadioComponent/RadioComponent'
import TitleComponent from '../../components/CustomizeComponents/TitleComponent/TitleComponent'
import UserContext from '../../context/User'
import { alignment } from '../../utils/alignment'
import { NAVIGATION_SCREEN } from '../../utils/constant'
import useStyle from './styles'

function ItemDetail() {
  const route = useRoute()
  const styles = useStyle()
  const navigation = useNavigation()
  const [food] = useState(route.params.food ?? null)
  const [selectedVariation, setSelectedVariation] = useState(food.variations[0])
  const [selectedAddons, setSelectedAddons] = useState([])
  const { cart, addQuantity, addCartItem } = useContext(UserContext)

  useEffect(() => {
    navigation.setOptions({
      title: 'Customize',
      headerRight: () => null
    })
  }, [navigation])

  function validateButton() {
    if (!selectedVariation) return false
    const validatedAddons = []
    selectedVariation.addons.forEach(addon => {
      const selected = selectedAddons.find(ad => ad._id === addon._id)
      if (!selected && addon.quantity_minimum === 0) {
        validatedAddons.push(false)
      } else if (
        selected &&
        selected.options.length >= addon.quantity_minimum &&
        selected.options.length <= addon.quantity_maximum
      ) {
        validatedAddons.push(false)
      } else validatedAddons.push(true)
    })
    return validatedAddons.every(val => val === false)
  }

  async function onAddToCart(quantity) {
    if (validateOrderItem()) {
      const addons = selectedAddons.map(addon => ({
        ...addon,
        options: addon.options.map(({ _id }) => ({
          _id
        }))
      }))

      const cartItem = cart.find(cartItem => {
        if (
          cartItem._id === food._id &&
          cartItem.variation._id === selectedVariation._id
        ) {
          if (cartItem.addons.length === addons.length) {
            if (addons.length === 0) return true
            const addonsResult = addons.every(newAddon => {
              const cartAddon = cartItem.addons.find(
                ad => ad._id === newAddon._id
              )

              if (!cartAddon) return false
              const optionsResult = newAddon.options.every(newOption => {
                const cartOption = cartAddon.options.find(
                  op => op._id === newOption._id
                )

                if (!cartOption) return false
                return true
              })

              return optionsResult
            })

            return addonsResult
          }
        }
        return false
      })

      if (!cartItem) {
        await addCartItem(food._id, selectedVariation._id, quantity, addons)
      } else {
        await addQuantity(cartItem.key, quantity)
      }
      navigation.navigate(NAVIGATION_SCREEN.Cart)
    }
  }

  function onSelectVariation(variation) {
    setSelectedVariation(variation)
  }

  async function onSelectOption(addon, option) {
    const addons = selectedAddons
    const index = addons.findIndex(ad => ad._id === addon._id)
    if (index > -1) {
      if (addon.quantity_minimum === 1 && addon.quantity_maximum === 1) {
        addons[index].options = [option]
      } else {
        const optionIndex = addons[index].options.findIndex(
          opt => opt._id === option._id
        )
        if (optionIndex > -1) {
          addons[index].options = addons[index].options.filter(
            opt => opt._id !== option._id
          )
        } else {
          addons[index].options.push(option)
        }
        if (!addons[index].options.length) {
          addons.splice(index, 1)
        }
      }
    } else {
      addons.push({ _id: addon._id, options: [option] })
    }
    setSelectedAddons([...addons])
  }

  function calculatePrice() {
    const variation = selectedVariation.price
    let addons = 0
    selectedAddons.forEach(addon => {
      addons += addon.options.reduce((acc, option) => {
        return acc + option.price
      }, 0)
    })
    return (variation + addons).toFixed(2)
  }

  function validateOrderItem() {
    const validatedAddons = selectedVariation.addons.map(addon => {
      const selected = selectedAddons.find(ad => ad._id === addon._id)

      if (!selected && addon.quantity_minimum === 0) {
        addon.error = false
      } else if (
        selected &&
        selected.options.length >= addon.quantity_minimum &&
        selected.options.length <= addon.quantity_maximum
      ) {
        addon.error = false
      } else addon.error = true
      return addon
    })
    setSelectedVariation({ ...selectedVariation, addons: validatedAddons })
    return validatedAddons.every(addon => addon.error === false)
  }

  function renderOption(addon) {
    if (addon.quantity_minimum === 1 && addon.quantity_maximum === 1) {
      return (
        <RadioComponent
          options={addon.options}
          onPress={onSelectOption.bind(this, addon)}
        />
      )
    } else {
      return (
        <CheckComponent
          options={addon.options}
          onPress={onSelectOption.bind(this, addon)}
        />
      )
    }
  }

  return (
    <WrapperView>
      <View style={styles.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewContainer}>
          {!!food.img_url && <ImageHeader image={food.img_url} />}
          <View style={styles.subContainer}>
            <HeadingComponent
              title={food.title}
              price={calculatePrice()}
              desc={food.description}
            />
            <View style={styles.line}></View>
            {food.variations.length > 1 && (
              <>
                <TitleComponent
                  title="Select Variation"
                  subTitle="Select one"
                  status="Required"
                />
                <View style={[alignment.PLmedium, alignment.PRmedium]}>
                  <RadioComponent
                    options={food.variations}
                    selected={selectedVariation}
                    onPress={onSelectVariation}
                  />
                </View>
              </>
            )}
            {selectedVariation.addons.map(addon => (
              <View key={addon._id}>
                <TitleComponent
                  title={addon.title}
                  subTitle={addon.description}
                  error={addon.error}
                  status={
                    addon.quantity_minimum === 0
                      ? 'OPTIONAL'
                      : `${addon.quantity_minimum} REQUIRED`
                  }
                />
                {renderOption(addon)}
              </View>
            ))}
          </View>
        </ScrollView>
        <CartComponent
          stock={food.stock}
          onPress={onAddToCart}
          disabled={validateButton()}
        />
      </View>
    </WrapperView>
  )
}

export default ItemDetail
