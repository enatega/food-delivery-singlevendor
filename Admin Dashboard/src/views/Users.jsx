/* eslint-disable react/display-name */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { Container, Row, Card } from 'reactstrap'
import Header from '../components/Headers/Header.jsx'
import CustomLoader from '../components/Loader/CustomLoader'
import { Query, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { getUsers } from '../apollo/server'
import { transformToNewline } from '../utils/stringManipulations'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'

const GET_USERS = gql`
  ${getUsers}
`
const Users = props => {
  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: 'name'
    },
    {
      name: 'Email',
      sortable: true,
      selector: 'email',
      cell: row => hiddenData(row.email, 'EMAIL')
    },
    {
      name: 'Phone',
      sortable: true,
      selector: 'phone',
      cell: row => hiddenData(row.phone, 'PHONE')
    },
    {
      name: 'Address',
      cell: row => (
        <>
          {transformToNewline(
            row.addresses.length ? row.addresses[0].delivery_address : '',
            15
          )}
        </>
      )
    }
  ]

  const hiddenData = (cell, column) => {
    if (column === 'EMAIL') {
      if (cell != null) {
        const splitArray = cell.split('@')
        splitArray.splice(0, 1, '*'.repeat(splitArray[0].length))
        const star = splitArray.join('@')
        return star
      } else {
        return '*'
      }
    } else if (column === 'PHONE') {
      const star = '*'.repeat(cell.length)
      return star
    }
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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <Query
                query={GET_USERS}
                variables={{ page: 0 }}
                onError={error => {
                  console.log(error)
                }}>
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
                      title={t('Users')}
                      columns={columns}
                      data={data.users}
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
      </Container>
    </>
  )
}

export default compose(withApollo, withTranslation())(Users)
