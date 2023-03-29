/* eslint-disable react/display-name */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Query, Mutation, compose, withApollo } from 'react-apollo'
import { withTranslation } from 'react-i18next'
// reactstrap components
import { Badge, Card, Container, Row, Media, Modal } from 'reactstrap'
// core components
import Header from '../components/Headers/Header.jsx'
import { getFoods, deleteFood } from '../apollo/server'
import FoodComponent from '../components/Food/Food'
import CustomLoader from '../components/Loader/CustomLoader'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import { transformToNewline } from '../utils/stringManipulations'
import Loader from 'react-loader-spinner'
import Alert from '../components/Alert'

const GET_FOODS = gql`
  ${getFoods}
`
const DELETE_FOOD = gql`
  ${deleteFood}
`

const Food = props => {
  const [editModal, setEditModal] = useState(false)
  const [food, setFood] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = food => {
    setEditModal(!editModal)
    setFood(food)
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

  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      cell: row => (
        <>
          <Media>
            <span className="mb-0 text-sm">{row.title}</span>
          </Media>
        </>
      )
    },
    {
      name: 'Description',
      sortable: true,
      selector: 'description',
      cell: row => <>{transformToNewline(row.description, 3)}</>
    },
    {
      name: 'Category',
      sortable: true,
      selector: 'category.title',
      cell: row => <>{row.category.title}</>
    },
    {
      name: 'Image',
      cell: row => (
        <>
          {!!row.img_url && (
            <img className="img-responsive" src={row.img_url} alt="img menu" />
          )}
          {!row.img_url && 'No Image'}
        </>
      )
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
          mutation={DELETE_FOOD}
          refetchQueries={[{ query: GET_FOODS, variables: { page: 0 } }]}>
          {(deleteFood, { loading: deleteLoading }) => {
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
                  // deleteFood({ variables: { id: row._id } })
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
        <FoodComponent />
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
              <Query query={GET_FOODS} variables={{ page: 0 }}>
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
                      title={t('Foods')}
                      columns={columns}
                      data={data.foods}
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
          <FoodComponent food={food} />
        </Modal>
      </Container>
    </>
  )
}

export default compose(withApollo, withTranslation())(Food)
