/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
// reactstrap components
import { Badge, Card, Container, Row, Modal } from 'reactstrap'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Header from '../components/Headers/Header'
import CustomLoader from '../components/Loader/CustomLoader'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import RiderComponent from '../components/Rider/Rider'
import {
  getRiders,
  deleteRider,
  toggleAvailablity,
  getAvailableRiders
} from '../apollo/server'
import Loader from 'react-loader-spinner'
import Alert from '../components/Alert'

const GET_RIDERS = gql`
  ${getRiders}
`
const DELETE_RIDER = gql`
  ${deleteRider}
`
const TOGGLE_RIDER = gql`
  ${toggleAvailablity}
`
const GET_AVAILABLE_RIDERS = gql`
  ${getAvailableRiders}
`

function Riders(props) {
  const [editModal, setEditModal] = useState(false)
  const [rider, setRider] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = rider => {
    setEditModal(!editModal)
    setRider(rider)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (row[field]) {
        return row[field].toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const { t } = props

  const columns = [
    {
      name: t('Name'),
      sortable: true,
      selector: 'name'
    },
    {
      name: t('Username'),
      sortable: true,
      selector: 'username'
    },
    {
      name: t('Password'),
      sortable: true,
      selector: 'password'
    },
    {
      name: t('Phone'),
      sortable: true,
      selector: 'phone'
    },
    {
      name: t('Available'),
      cell: row => <>{availableStatus(row)}</>
    },
    {
      name: 'Action',
      cell: row => <>{actionButtons(row)}</>
    }
  ]

  const availableStatus = row => {
    return (
      <>
        {row.available}
        <label className="custom-toggle">
          <Mutation
            mutation={TOGGLE_RIDER}
            refetchQueries={[
              { query: GET_RIDERS },
              { query: GET_AVAILABLE_RIDERS }
            ]}>
            {toggleRider => {
              return (
                <input
                  defaultChecked={row.available}
                  type="checkbox"
                  onChange={event => {
                    toggleRider({ variables: { id: row._id } })
                  }}
                />
              )
            }}
          </Mutation>
          <span className="custom-toggle-slider rounded-circle" />
        </label>
      </>
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
          mutation={DELETE_RIDER}
          refetchQueries={[{ query: GET_RIDERS }]}>
          {(deleteRider, { loading: deleteLoading }) => {
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
                  // deleteRider({ variables: { id: row._id } })
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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <RiderComponent />
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
              <Query
                query={GET_RIDERS}
                onError={error => {
                  console.log(error)
                }}>
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
                      title={t('Riders')}
                      columns={columns}
                      data={data.riders}
                      pagination
                      progressPending={loading}
                      progressComponent={<CustomLoader />}
                      onSort={handleSort}
                      sortFunction={customSort}
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
            toggleModal()
          }}>
          <RiderComponent rider={rider} />
        </Modal>
      </Container>
    </>
  )
}

export default withTranslation()(Riders)
