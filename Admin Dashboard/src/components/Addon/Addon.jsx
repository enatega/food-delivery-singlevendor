/* eslint-disable camelcase */
import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Modal,
  Alert
} from 'reactstrap'
import { withTranslation } from 'react-i18next'
import { Query, Mutation, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import {
  getOptions,
  createAddons,
  getAddons,
  editAddon
} from '../../apollo/server'
import OptionsComponent from '../Option/Option'
import { validateFunc } from '../../constraints/constraints'
import Loader from 'react-loader-spinner'

const GET_OPTIONS = gql`
  ${getOptions}
`
const CREATE_ADDONS = gql`
  ${createAddons}
`
const GET_ADDONS = gql`
  ${getAddons}
`
const EDIT_ADDON = gql`
  ${editAddon}
`

function Addon(props) {
  const addon = props.addon
    ? [
      {
        ...props.addon,
        options: props.addon.options.map(({ _id }) => _id),
        titleError: false,
        descriptionError: false,
        optionsError: false,
        quantity_minimumError: false,
        quantity_maximumError: false
      }
    ]
    : null

  const [addons, addonsSetter] = useState(
    addon || [
      {
        title: '',
        description: '',
        quantity_minimum: 0,
        quantity_maximum: 1,
        options: [],
        titleError: false,
        descriptionError: false,
        optionsError: false,
        quantity_minimumError: false,
        quantity_maximumError: false
      }
    ]
  )

  const [optionsModal, optionsModalSetter] = useState(false)
  const [success, successSetter] = useState('')
  const [error, errorSetter] = useState('')
  const [addonIndex, addonIndexSetter] = useState(0)

  const onChangeOption = event => {
    // added this because on clear after saving was not clearing selected options in the list.
    // console.log(event)
  }
  const onChange = (event, index, state) => {
    console.log(addons)
    const addon = addons
    addon[index][state] = event.target.value
    addonsSetter([...addon])
  }
  const onBlur = (index, state) => {
    const addon = addons
    if (state === 'title') {
      addon[index].titleError = !!validateFunc(
        { addonTitle: addon[index][state] },
        'addonTitle'
      )
    }
    if (state === 'description') {
      addon[index].descriptionError = !!validateFunc(
        { addonDescription: addon[index][state] },
        'addonDescription'
      )
    }
    if (state === 'quantity_minimum') {
      addon[index].quantity_minimumError = !!validateFunc(
        { addonQuantityMinimum: addon[index][state] },
        'addonQuantityMinimum'
      )
      addon[index].quantity_minimumError =
        addon[index].quantity_minimumError ||
        addon[index].quantity_minimum > addon[index].quantity_maximum
    }
    if (state === 'quantity_maximum') {
      addon[index].quantity_maximumError = !!validateFunc(
        { addonQuantityMaximum: addon[index][state] },
        'addonQuantityMaximum'
      )
      addon[index].quantity_maximumError =
        addon[index].quantity_maximumError ||
        addon[index].quantity_maximum < addon[index].quantity_minimum
    }
    if (state === 'options') {
      addon[index].optionsError = addon[index].options.length === 0
    }
    addonsSetter([...addon])
  }
  const onSelectOption = (index, id) => {
    const addon = addons
    const option = addon[index].options.indexOf(id)
    if (option < 0) addon[index].options.push(id)
    else addon[index].options.splice(option, 1)
    addonsSetter([...addon])
  }
  const updateOptions = ids => {
    console.log(addonIndex, ids)
    const addon = addons
    addon[addonIndex].options = addon[addonIndex].options.concat(ids)
    addonsSetter([...addon])
  }
  const onAdd = index => {
    const addon = addons
    if (index === addon.length - 1) {
      addon.push({
        title: '',
        description: '',
        quantity_minimum: 0,
        quantity_maximum: 1,
        options: []
      })
    } else {
      addon.splice(index + 1, 0, {
        title: '',
        description: '',
        quantity_minimum: 0,
        quantity_maximum: 1,
        options: []
      })
    }
    addonsSetter([...addon])
  }
  const onRemove = index => {
    if (addons.length === 1 && index === 0) {
      return
    }
    const addon = addons
    addon.splice(index, 1)
    addonsSetter([...addon])
  }
  const toggleModal = index => {
    console.log(index)
    optionsModalSetter(prev => !prev)
    addonIndexSetter(index)
  }
  const validate = () => {
    const addon = addons
    addon.map((addon, index) => {
      onBlur(index, 'title')
      onBlur(index, 'description')
      onBlur(index, 'quantity_minimum')
      onBlur(index, 'quantity_maximum')
      onBlur(index, 'options')
      return addon
    })
    const error = addon.filter(
      addon =>
        addon.titleError ||
        addon.descriptionError ||
        addon.quantity_minimumError ||
        addon.quantity_maximumError ||
        addon.optionsError
    )
    if (!error.length) return true
    return false
  }
  const onCompleted = ({ createAddons, editAddon }) => {
    if (createAddons) {
      addonsSetter([
        {
          title: '',
          description: '',
          quantity_minimum: 0,
          quantity_maximum: 1,
          options: [],
          titleError: false,
          descriptionError: false,
          optionsError: false,
          quantity_minimumError: false,
          quantity_maximumError: false
        }
      ])
      successSetter('Saved')
      errorSetter('')
    }
    if (editAddon) {
      successSetter('Saved')
      errorSetter('')
    }
  }
  const onError = () => {
    errorSetter('An error occured while saving,Try again')
    successSetter('')
  }
  const update = (proxy, { data: { createAddons } }) => {
    try {
      if (createAddons) {
        const data = proxy.readQuery({ query: GET_ADDONS })
        data.addons = data.addons.concat(createAddons)
        proxy.writeQuery({ query: GET_ADDONS, data })
        if (props.updateAddonsList) {
          props.updateAddonsList(createAddons.map(({ _id }) => _id))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onDismiss = () => {
    errorSetter('')
    successSetter('')
  }
  const { t } = props
  return (
    <Card>
      <CardHeader>Addons</CardHeader>
      <CardBody>
        <Form>
          <div>
            {addons.map((addon, index) => (
              <div key={index}>
                <Row>
                  <Col lg="6">
                    <Row>
                      <Col lg="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-title">
                          {t('Title')}
                        </label>
                        <br />
                        <FormGroup
                          className={
                            addon.titleError === true ? 'has-danger' : ''
                          }>
                          <Input
                            className="form-control-alternative"
                            id="input-title"
                            placeholder="e.g Pepsi"
                            type="text"
                            value={addon.title}
                            onChange={event => {
                              onChange(event, index, 'title')
                            }}
                            onBlur={event => {
                              onBlur(index, 'title')
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-description">
                          {t('Description')}
                        </label>
                        <br />
                        <FormGroup
                          className={
                            addon.descriptionError === true ? 'has-danger' : ''
                          }>
                          <Input
                            className="form-control-alternative"
                            id="input-description"
                            placeholder="e.g Optional"
                            type="text"
                            value={addon.description || ''}
                            onChange={event => {
                              onChange(event, index, 'description')
                            }}
                            onBlur={event => {
                              onBlur(index, 'description')
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-minimum">
                          {t('Quantity Minimum')}
                        </label>
                        <br />
                        <small>
                          {t('Must be a less than or equal to Maximum')}
                        </small>
                        <FormGroup
                          className={
                            addon.quantity_minimumError === true
                              ? 'has-danger'
                              : ''
                          }>
                          <Input
                            className="form-control-alternative"
                            id="input-minimum"
                            placeholder="e.g 90.25"
                            type="number"
                            min={'0'}
                            value={addon.quantity_minimum}
                            onChange={event => {
                              onChange(event, index, 'quantity_minimum')
                            }}
                            onBlur={event => {
                              onBlur(index, 'quantity_minimum')
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-maximum">
                          {t('Quantity Maximum')}
                        </label>
                        <br />
                        <small>
                          {t('Must be a greater than or equal to Minimum')}
                        </small>
                        <FormGroup
                          className={
                            addon.quantity_maximumError === true
                              ? 'has-danger'
                              : ''
                          }>
                          <Input
                            className="form-control-alternative"
                            id="input-maximum"
                            placeholder="e.g 90.25"
                            type="number"
                            min={'1'}
                            value={addon.quantity_maximum}
                            onChange={event => {
                              onChange(event, index, 'quantity_maximum')
                            }}
                            onBlur={event => {
                              onBlur(index, 'quantity_maximum')
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="6">
                    <Row className="mb-2">
                      <Col>
                        <label className="form-control-label">
                          {t('Options')}
                        </label>
                        <br />
                        {!addons[index].options.length && (
                          <small className="text-red">
                            {t('Select atleast one Option')}
                          </small>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Button
                            color="warning"
                            onClick={toggleModal.bind(this, index)}>
                            New
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{ maxHeight: '67vh', overflowY: 'scroll' }}>
                      <Col>
                        <Query query={GET_OPTIONS}>
                          {({ loading, error, data }) => {
                            if (loading) return 'Loading ...'
                            if (error) return 'Error ...'
                            return data.options.map(option => (
                              <FormGroup
                                key={option._id}
                                check
                                style={{ width: '100%', marginTop: '10px' }}>
                                <Label check>
                                  <Input
                                    checked={addons[index].options.includes(
                                      option._id
                                    )}
                                    onChange={onChangeOption}
                                    value={option._id}
                                    type="checkbox"
                                    onClick={onSelectOption.bind(
                                      this,
                                      index,
                                      option._id
                                    )}
                                  />
                                  {`${option.title} (Description: ${option.description})(Price: ${option.price})`}
                                </Label>
                              </FormGroup>
                            ))
                          }}
                        </Query>
                      </Col>
                    </Row>
                    {!props.addon && (
                      <Row className="mt-2">
                        <Col>
                          <label className="form-control-label">
                            {t('Add/Remove Addons')}
                          </label>
                          <FormGroup>
                            <Button
                              color="danger"
                              onClick={() => {
                                onRemove(index)
                              }}>
                              -
                            </Button>
                            <Button
                              onClick={() => {
                                onAdd(index)
                              }}
                              color="primary">
                              +
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
            <Row>
              <Col lg={{ offset: 4, size: 4 }}>
                <Mutation
                  mutation={props.addon ? EDIT_ADDON : CREATE_ADDONS}
                  onCompleted={onCompleted}
                  onError={onError}
                  update={update}>
                  {(mutate, { loading }) => {
                    if (loading) {
                      return (
                        <Button
                          color="primary"
                          size="lg"
                          block
                          onClick={() => null}>
                          <Loader
                            type="TailSpin"
                            color="#FFF"
                            height={25}
                            width={30}
                            visible={loading}
                          />
                        </Button>
                      )
                    }
                    return (
                      <Button
                        color="primary"
                        size="lg"
                        block
                        onClick={() => {
                          if (validate()) {
                            props.addon
                              ? mutate({
                                variables: {
                                  addonInput: {
                                    _id: props.addon._id,
                                    title: addons[0].title,
                                    description: addons[0].description,
                                    options: addons[0].options,
                                    quantity_minimum: +addons[0]
                                      .quantity_minimum,
                                    quantity_maximum: +addons[0]
                                      .quantity_maximum
                                  }
                                }
                              })
                              : mutate({
                                variables: {
                                  addonInput: addons.map(
                                    ({
                                      title,
                                      description,
                                      options,
                                      quantity_minimum,
                                      quantity_maximum
                                    }) => ({
                                      title,
                                      description,
                                      options,
                                      quantity_minimum: +quantity_minimum,
                                      quantity_maximum: +quantity_maximum
                                    })
                                  )
                                }
                              })
                          }
                        }}>
                        {' '}
                        Save
                      </Button>
                    )
                  }}
                </Mutation>
              </Col>
              <Alert color="success" isOpen={!!success} toggle={onDismiss}>
                {success}
              </Alert>
              <Alert color="danger" isOpen={!!error} toggle={onDismiss}>
                {error}
              </Alert>
            </Row>
          </div>
        </Form>
        {/* <OptionsList /> */}
      </CardBody>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={optionsModal}
        toggle={() => {
          toggleModal()
        }}>
        <OptionsComponent updateOptions={updateOptions} />
      </Modal>
    </Card>
  )
}

export default compose(withApollo, withTranslation())(Addon)
