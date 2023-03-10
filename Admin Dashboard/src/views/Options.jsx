/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { Badge, Container, Row, Card, Modal } from 'reactstrap'
import Header from '../components/Headers/Header.jsx'
import OptionComponent from '../components/Option/Option'
import CustomLoader from '../components/Loader/CustomLoader'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'

import { withTranslation } from 'react-i18next'
import { Query, Mutation, compose, withApollo } from 'react-apollo'
import { options, deleteOption } from '../apollo/server'
import gql from 'graphql-tag'
import Loader from 'react-loader-spinner'
import Alert from '../components/Alert'

const GET_OPTIONS = gql`
  ${options}
`
const DELETE_OPTION = gql`
  ${deleteOption}
`

const Option = props => {
  const [editModal, setEditModal] = useState(false)
  const [option, setOption] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = option => {
    setEditModal(!editModal)
    setOption(option)
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
      name: 'Title',
      sortable: true,
      selector: 'title'
    },
    {
      name: 'Description',
      sortable: true,
      selector: 'description'
    },
    {
      name: 'Price',
      sortable: true,
      selector: 'price'
    },
    {
      name: 'Action',
      cell: row => <>{actionButtons(row)}</>
    }
  ]
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
          mutation={DELETE_OPTION}
          refetchQueries={[{ query: GET_OPTIONS }]}
          update={update}>
          {(deleteOption, { loading: deleteLoading }) => {
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
                  // deleteOption({ variables: { id: row._id } })
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

  const update = (proxy, { data: { deleteOption } }) => {
    try {
      if (deleteOption) {
        const data = proxy.readQuery({ query: GET_OPTIONS })
        data.options = data.options.filter(
          option => option._id !== deleteOption
        )
        proxy.writeQuery({ query: GET_OPTIONS, data })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { t } = props
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <OptionComponent />
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              {isOpen && (
                <Alert
                  message="Delete feature will available after purchasing product"
                  severity="warning"
                />
              )}
              <Query query={GET_OPTIONS} variables={{ page: 0 }}>
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
                      title={t('Options')}
                      columns={columns}
                      data={data.allOptions}
                      pagination
                      progressPending={loading}
                      progressComponent={<CustomLoader />}
                      onSort={handleSort}
                      sortFunction={customSort}
                      defaultSortField="title"
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
          <OptionComponent option={option} />
        </Modal>
      </Container>
    </>
  )
}

export default compose(withApollo, withTranslation())(Option)
