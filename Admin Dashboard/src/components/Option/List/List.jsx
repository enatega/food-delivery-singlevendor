import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Modal
} from 'reactstrap'
import { withTranslation } from 'react-i18next'
import { Query, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import OptionsComponent from '../Option'
import { getOptions } from '../../../apollo/server'

const GET_OPTIONS = gql`
  ${getOptions}
`

function List(props) {
  const [optionsModal, optionsModalSetter] = useState(false)
  const toggleModal = () => {
    optionsModalSetter(prev => !prev)
  }
  return (
    <Card>
      <CardHeader>Select</CardHeader>
      <CardBody>
        <Form>
          <Row className="text-right">
            <Col lg={{ offset: 10 }}>
              <FormGroup>
                <Button color="warning" onClick={toggleModal}>
                  New
                </Button>
              </FormGroup>
            </Col>
          </Row>
          <Query query={GET_OPTIONS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading ...'
              if (error) return 'Error ...'
              return data.options.map((option, index) => (
                <FormGroup key={index} check>
                  <Label check>
                    <Input value={option._id} type="checkbox" />
                    {`${option.title} (Description: ${option.description})(Price: ${option.price})`}
                  </Label>
                </FormGroup>
              ))
            }}
          </Query>

          <Row>
            <Col lg={{ offset: 10 }}>
              <FormGroup>
                <Button color="info" onClick={props.onClick}>
                  Save
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={optionsModal}
        toggle={() => {
          toggleModal()
        }}>
        <OptionsComponent />
      </Modal>
    </Card>
  )
}

export default compose(withApollo, withTranslation())(List)
