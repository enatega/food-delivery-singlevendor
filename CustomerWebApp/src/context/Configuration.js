import React from 'react'
import { gql, useQuery } from "@apollo/client";
import PropTypes from 'prop-types'

import { getConfiguration } from '../apollo/graphQL'

const GETCONFIGURATION = gql`
  ${getConfiguration}
`

const ConfigurationContext = React.createContext({})

export const ConfigurationProvider = props => {
  const { loading, data, error } = useQuery(GETCONFIGURATION)
  const configuration =
    loading || error || !data.configuration
      ? { currency: '', currency_symbol: '', delivery_charges: 0 }
      : data.configuration
  return (
    <ConfigurationContext.Provider value={configuration}>
      {props.children}
    </ConfigurationContext.Provider>
  )
}

ConfigurationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const ConfigurationConsumer = ConfigurationContext.Consumer
export default ConfigurationContext
