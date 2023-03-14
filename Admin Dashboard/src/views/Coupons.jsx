/* eslint-disable react/display-name */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { withTranslation } from 'react-i18next'
import CouponComponent from '../components/Coupon/Coupon'
// reactstrap components
import { Badge, Card, Container, Row, Modal } from 'reactstrap'

// core components
import Header from '../components/Headers/Header.jsx'
import CustomLoader from '../components/Loader/CustomLoader'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import { getCoupons, deleteCoupon, editCoupon } from '../apollo/server'
import Loader from 'react-loader-spinner'
import Alert from '../components/Alert'

const GET_COUPONS = gql`
  ${getCoupons}
`
const EDIT_COUPON = gql`
  ${editCoupon}
`
const DELETE_COUPON = gql`
  ${deleteCoupon}
`

const Coupon = props => {
  const [editModal, setEditModal] = useState(false)
  const [coupon, setCoupon] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = coupon => {
    setEditModal(!editModal)
    setCoupon(coupon)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (row[field] && isNaN(row[field])) {
        return row[field].toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const columns = [
    {
      name: 'Code',
      sortable: true,
      selector: 'code'
    },
    {
      name: 'Discount %',
      sortable: true,
      selector: 'discount'
    },
    {
      name: 'Status',
      cell: row => <>{statusChanged(row)}</>
    },
    {
      name: 'Action',
      cell: row => <>{actionButtons(row)}</>
    }
  ]

  const statusChanged = row => {
    return (
      <Mutation mutation={EDIT_COUPON}>
        {(mutate, { loading, error }) => (
          <label className="custom-toggle">
            <input
              onClick={() => {
                mutate({
                  variables: {
                    couponInput: {
                      _id: row._id,
                      code: row.code,
                      discount: row.discount,
                      enabled: !row.enabled
                    }
                  }
                })
              }}
              defaultChecked={row.enabled}
              type="checkbox"
            />
            <span className="custom-toggle-slider rounded-circle" />
          </label>
        )}
      </Mutation>
    )
  }

  const actionButtons = row => {
    return (
      <>
        <Badge
          href="#pablo"
          onClick={e => {
            e.preventDefault()
            toggleModal(row)
          }}
          color="primary">
          Edit
        </Badge>
        &nbsp;&nbsp;
        <Mutation
          mutation={DELETE_COUPON}
          refetchQueries={[{ query: GET_COUPONS }]}>
          {(deleteCoupon, { loading: deleteLoading }) => {
            if (deleteLoading) {
              return (
                <Loader
                  type="ThreeDots"
                  color="#BB2124"
                  height={20}
                  width={40}
                  visible={deleteLoading}
                />
              )
            }
            return (
              <Badge
                href="#pablo"
                color="danger"
                onClick={e => {
                  e.preventDefault()
                  // deleteCoupon({ variables: { id: row._id } })
                  setIsOpen(true)
                  setTimeout(() => {
                    setIsOpen(false)
                  }, 2000)
                }}>
                {'Delete'}
              </Badge>
            )
          }}
        </Mutation>
      </>
    )
  }

  const { t } = props
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <CouponComponent />
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              {isOpen && (
                <Alert
                  message="Delete feature will available after purchasing product"
                  severity="warning"
                />
              )}
              <Query query={GET_COUPONS}>
                {({ loading, error, data }) => {
                  if (error) {
                    return (
                      <span>
                        `${t('Error')}! ${error.message}`
                      </span>
                    )
                  }
                  return (
                    <DataTable
                      title={t('Coupons')}
                      columns={columns}
                      data={data.coupons}
                      pagination
                      progressPending={loading}
                      progressComponent={<CustomLoader />}
                      onSort={handleSort}
                      sortFunction={customSort}
                      defaultSortField="code"
                    />
                  )
                }}
              </Query>
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={editModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <CouponComponent coupon={coupon} />
        </Modal>
      </Container>
    </>
  )
}

export default withTranslation()(Coupon)
