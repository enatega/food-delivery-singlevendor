/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { transformToNewline } from '../../utils/stringManipulations'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import CustomLoader from '../Loader/CustomLoader'
import { subscribePlaceOrder, orderCount } from '../../apollo/server'
import { Media, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap'
import { compose, Query } from 'react-apollo'
import gql from 'graphql-tag'

const ORDERCOUNT = gql`
  ${orderCount}
`
const ORDER_PLACED = gql`
  ${subscribePlaceOrder}
`

const OrdersData = props => {
  const { t, selected, updateSelected } = props
  const [search, setSearch] = useState('')
  const getItems = items => {
    return items
      .map(
        item => `${item.quantity}x${item.food.title}(${item.variation.title})`
      )
      .join('\n')
  }

  const propExists = (obj, path) => {
    return path.split('.').reduce((obj, prop) => {
      return obj && obj[prop] ? obj[prop] : ''
    }, obj)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (field && isNaN(propExists(row, field))) {
        return propExists(row, field).toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const clearSearch = () => {
    props.search('')
    setSearch('')
  }
  const subHeaderComponent = () => {
    return (
      <div>
        <InputGroup>
          <Input
            placeholder="Filter By Order Id"
            value={search}
            onChange={event => {
              props.search(event.target.value)
              setSearch(event.target.value)
            }}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={() => clearSearch()} color="primary">
              X
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }

  const handlePerRowsChange = async(perPage, page) => {
    props.page(page)
    props.rows(perPage)
  }

  const handlePageChange = async page => {
    props.page(page)
  }

  const columns = [
    {
      name: 'OrderID',
      sortable: true,
      selector: 'order_id',
      cell: row => (
        <Media>
          <span className="mb-0 text-sm">{row.order_id}</span>
        </Media>
      )
    },
    {
      name: 'User',
      sortable: true,
      selector: 'user.name',
      cell: row => (
        <>{`${row.user.name}\n${row.user.email}\n${row.user.phone}`}</>
      )
    },
    {
      name: 'Items',
      cell: row => <>{getItems(row.items)}</>
    },
    {
      name: 'Payment',
      selector: 'payment_status'
    },
    {
      name: 'Status',
      selector: 'order_status'
    },
    {
      name: 'Datetime',
      cell: row => (
        <>{new Date(row.createdAt).toLocaleString().replace(/ /g, '\n')}</>
      )
    },
    {
      name: 'Address',
      cell: row => (
        <>{transformToNewline(row.delivery_address.delivery_address, 3)}</>
      )
    }
  ]
  const conditionalRowStyles = [
    {
      when: row => row.order_status !== 'DELIVERED',
      style: {
        backgroundColor: 'rgba(240, 173, 78,0.2)'
      }
    }
  ]

  useEffect(() => {
    props.subscribeToMore({
      document: ORDER_PLACED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        if (subscriptionData.data.subscribePlaceOrder.origin === 'new') {
          return {
            allOrders: [
              subscriptionData.data.subscribePlaceOrder.order,
              ...prev.allOrders
            ]
          }
        } else {
          const orderIndex = prev.allOrders.findIndex(
            o => subscriptionData.data.subscribePlaceOrder.order._id === o._id
          )
          prev.allOrders[orderIndex] =
            subscriptionData.data.subscribePlaceOrder.order
          return { allOrders: [...prev.allOrders] }
        }
      },
      onError: error => {
        console.log('onError', error)
      }
    })
  }, [])

  useEffect(() => {
    if (selected) {
      const order = props.orders.find(o => o._id === selected._id)
      updateSelected(order)
    }
  }, [props.orders])

  return (
    <Query query={ORDERCOUNT}>
      {({ loading, error, data }) => {
        if (error) {
          return (
            <tr>
              <td>
                `${t('Error')}! ${error.message}`
              </td>
            </tr>
          )
        }
        return (
          <DataTable
            title={t('Orders')}
            columns={columns}
            data={props.orders}
            onRowClicked={props.toggleModal}
            progressPending={props.loading || loading}
            pointerOnHover
            progressComponent={<CustomLoader />}
            onSort={handleSort}
            sortFunction={customSort}
            subHeader
            subHeaderComponent={subHeaderComponent()}
            pagination
            paginationServer
            paginationTotalRows={data.orderCount}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            conditionalRowStyles={conditionalRowStyles}
          />
        )
      }}
    </Query>
  )
}
export default compose(withTranslation())(OrdersData)
