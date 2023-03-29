import { MaterialIcons } from '@expo/vector-icons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { useTheme } from '@react-navigation/native'
import { get, keys } from 'lodash'
import PropTypes from 'prop-types'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Switch, TouchableOpacity, View } from 'react-native'
import ConfigurationContext from '../../../context/Configuration'
import { alignment } from '../../../utils/alignment'
import { SORT_DATA } from '../../../utils/constant'
import { moderateScale } from '../../../utils/scaling'
import RadioBtn from '../../FdRadioBtn/RadioBtn'
import TextDefault from '../../Text/TextDefault/TextDefault'
import useStyle from './styles'

const FilterModal = props => {
  const styles = useStyle()
  const { colors } = useTheme()
  const configuration = useContext(ConfigurationContext)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    setFilters({
      onSale: false,
      inStock: false,
      min: 0,
      max: 1000,
      sort: keys(SORT_DATA)[0],
      ...props.filterObj
    })
  }, [props.filterObj])

  const setSortValue = useCallback(sortKey => {
    setFilters(previousState => ({
      ...previousState,
      sort: sortKey
    }))
  }, [])

  const toggleSaleSwitch = useCallback(() => {
    setFilters(previousState => ({
      ...previousState,
      onSale: !previousState.onSale
    }))
  }, [])

  const toggleStockSwitch = useCallback(() => {
    setFilters(previousState => ({
      ...previousState,
      inStock: !previousState.inStock
    }))
  }, [])

  const clearItems = useCallback(() => {
    setFilters({
      onSale: false,
      inStock: false,
      min: 0,
      max: 1000,
      sort: keys(SORT_DATA)[0]
    })
  }, [])

  const priceSliderChange = useCallback(values => {
    setFilters(previousState => ({
      ...previousState,
      min: values[0],
      max: values[1]
    }))
  }, [])

  function applyFilters() {
    props.setFilters({ ...filters })
    props.closeFilterModal()
  }

  return (
    <View style={{ flex: 1, padding: moderateScale(15) }}>
      <View
        style={[
          { flexDirection: 'row', justifyContent: 'space-between' },
          alignment.PTsmall
        ]}>
        <TextDefault H5 bold>
          Filters
        </TextDefault>
        <TouchableOpacity
          onPress={clearItems}
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <TextDefault H5 bold textColor={colors.buttonBackgroundBlue}>
            Reset
          </TextDefault>
          <MaterialIcons
            name="refresh"
            size={22}
            color={colors.buttonBackgroundBlue}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={[alignment.PLlarge, alignment.PRlarge]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <TextDefault H5 bold textColor={colors.placeHolderColor}>
            Show sale items only
          </TextDefault>
          <Switch
            trackColor={{ false: '#767577', true: colors.tagColor }}
            thumbColor={get(filters, 'onSale') ? 'f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSaleSwitch}
            value={get(filters, 'onSale')}
          />
        </View>
        <View style={styles.line} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <TextDefault H5 bold textColor={colors.placeHolderColor}>
            Show stock items only
          </TextDefault>
          <Switch
            trackColor={{ false: '#767577', true: colors.tagColor }}
            thumbColor={get(filters, 'inStock') ? 'f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleStockSwitch}
            value={get(filters, 'inStock')}
          />
        </View>
        <View style={styles.line} />
      </View>

      <View style={styles.priceRangeRow}>
        <TextDefault bold H5>
          Price Range
        </TextDefault>
        <View>
          <TextDefault bold H5 center>
            {configuration.currency_symbol} {get(filters, 'min')} -{' '}
            {configuration.currency_symbol} {get(filters, 'max')}
          </TextDefault>
        </View>
      </View>
      <View
        style={[
          { alignItems: 'center' },
          alignment.MTlarge,
          alignment.PLlarge,
          alignment.PRlarge
        ]}>
        <MultiSlider
          sliderLength={310}
          trackStyle={styles.trackStyle}
          selectedStyle={{ backgroundColor: colors.tagColor }}
          markerStyle={styles.markerStyle}
          pressedMarkerStyle={styles.selectedMarker}
          values={[get(filters, 'min'), get(filters, 'max')]}
          onValuesChange={priceSliderChange}
          min={0}
          max={1000}
          step={10}
          allowOverlap
          snapped
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <TextDefault textColor={colors.fontSecondColor} H5 center>
            {configuration.currency_symbol} 0
          </TextDefault>
          <TextDefault textColor={colors.fontSecondColor} H5 center>
            {configuration.currency_symbol} 1000
          </TextDefault>
        </View>
      </View>
      <TextDefault bold H5 style={alignment.MTlarge}>
        Sorting
      </TextDefault>
      <View style={[alignment.PLlarge, alignment.PRlarge, alignment.MTmedium]}>
        {keys(SORT_DATA).map(item => {
          const isSelected = get(filters, 'sort') === item
          return (
            <TouchableOpacity
              key={`SORT_${item}`}
              style={styles.sotRow}
              onPress={() => setSortValue(item)}>
              <TextDefault
                H5
                bold
                textColor={
                  isSelected
                    ? colors.fonfontMainColort
                    : colors.placeHolderColor
                }>
                {get(SORT_DATA, item)}
              </TextDefault>
              <RadioBtn
                size={10}
                animation={'bounceIn'}
                isSelected={isSelected}
                innerColor={colors.radioColor}
                outerColor={colors.radioOuterColor}
                onPress={() => setSortValue(item)}
              />
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={[alignment.PLlarge, alignment.PRlarge]}>
        <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
          <TextDefault H5 bold textColor={colors.lightBackground}>
            Apply Filter
          </TextDefault>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.closeFilterModal()}
          style={[styles.width100, alignment.PBlarge, alignment.PTlarge]}>
          <TextDefault center>Close</TextDefault>
        </TouchableOpacity>
      </View>
    </View>
  )
}
FilterModal.propTypes = {
  filterObj: PropTypes.object,
  closeFilterModal: PropTypes.func,
  setFilters: PropTypes.func
}

export default FilterModal
