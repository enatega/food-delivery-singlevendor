/* eslint-disable camelcase */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { validateFunc } from '../../constraints/constraints'
import { withTranslation } from 'react-i18next'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Modal,
  Label
} from 'reactstrap'
// core components
import { cloudinary_upload_url, cloudinary_food } from '../../config/config'
import {
  createFood,
  editFood,
  categories,
  getAddons,
  getFoods
} from '../../apollo/server'
import AddonComponent from '../Addon/Addon'
import Loader from 'react-loader-spinner'

const CREATE_FOOD = gql`
  ${createFood}
`
const EDIT_FOOD = gql`
  ${editFood}
`
const GET_CATEGORIES = gql`
  ${categories}
`
const GET_ADDONS = gql`
  ${getAddons}
`
const GET_FOODS = gql`
  ${getFoods}
`

function Food(props) {
  const foodVariations = props.food
    ? props.food.variations.map(({ title, price, discounted, addons }) => {
      return {
        title,
        price,
        discounted,
        addons: addons.map(addon => addon._id),
        titleError: null,
        priceError: null
      }
    })
    : [
      {
        title: '',
        price: '',
        discounted: '',
        addons: [],
        titleError: null,
        priceError: null,
        discountedError: null
      }
    ]

  const mutation = useState(props.food ? EDIT_FOOD : CREATE_FOOD)
  const [title, titleSetter] = useState(props.food ? props.food.title : '')
  const [description, descriptionSetter] = useState(
    props.food ? props.food.description : ''
  )
  const [stock, stockSetter] = useState(props.food ? props.food.stock : '')
  const [imgMenu, imgMenuSetter] = useState(
    props.food ? props.food.img_url : ''
  )
  const [category, categorySetter] = useState(
    props.food ? props.food.category._id : ''
  )
  const [mainError, errorSetter] = useState('')
  const [success, successSetter] = useState('')
  const [titleError, titleErrorSetter] = useState(null)
  const [descriptionError, descriptionErrorSetter] = useState(null)
  const [categoryError, categoryErrorSetter] = useState(null)
  const [addonsModal, addonsModalSetter] = useState(false)
  const [varitionIndex, varitionIndexSetter] = useState(0)
  const [stockError, stockErrorSetter] = useState(null)
  const [variations, variationsSetter] = useState(foodVariations)

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }
  const handleChange = event => {
    categorySetter(event.target.value)
  }
  const filterImage = event => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i)
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    const message = `${images.length} valid image(s) selected`
    console.log(message)
    return images.length ? images[0] : undefined
  }
  const selectImage = (event, state) => {
    const result = filterImage(event)
    if (result) {
      imageToBase64(result)
    }
  }

  const onAdd = index => {
    const variation = variations
    if (index === variation.length - 1) {
      variation.push({
        title: '',
        price: '',
        discounted: '',
        addons: [],
        titleError: null,
        priceError: null,
        discountedError: ''
      })
    } else {
      variation.splice(index + 1, 0, {
        title: '',
        price: '',
        discounted: '',
        addons: [],
        titleError: null,
        priceError: null,
        discountedError: ''
      })
    }
    variationsSetter([...variation])
  }
  const onRemove = index => {
    if (variations.length === 1 && index === 0) {
      return
    }
    var variation = variations
    variation.splice(index, 1)
    variationsSetter([...variation])
  }
  const handleVariationChange = (event, index, type) => {
    const variation = variations

    if (type === 'title') {
      variation[index][type] =
        event.target.value.length === 1
          ? event.target.value.toUpperCase()
          : event.target.value
      variationsSetter([...variation])
    } else {
      variation[index][type] = event.target.value
      variationsSetter([...variation])
    }
  }
  const onSubmitValidaiton = () => {
    const titleError = !validateFunc({ title: title }, 'title')
    const descriptionError = !validateFunc(
      { description: description },
      'description'
    )
    const categoryError = !validateFunc({ category: category }, 'category')
    const stockError = !validateFunc({ stock: stock }, 'stock')
    const variation = variations
    variation.map(variationMap => {
      variationMap.priceError = !validateFunc(
        { price: variationMap.price },
        'price'
      )
      variationMap.discountedError =
        variationMap.price > variationMap.discounted
      let error = false
      const occ = variation.filter(v => v.title === variation.title)
      if (occ.length > 1) {
        error = true
      }
      variationMap.titleError = error
        ? !error
        : !validateFunc({ title: variationMap.title }, 'title')

      return variationMap
    })
    const variationsError = !variation.filter(
      variation =>
        !variation.priceError ||
        !variation.titleError ||
        !variation.discountedError
    ).length
    titleErrorSetter(titleError)
    descriptionErrorSetter(descriptionError)
    categoryErrorSetter(categoryError)
    variationsSetter([...variation])
    stockErrorSetter(stockError)
    return (
      titleError &&
      descriptionError &&
      categoryError &&
      variationsError &&
      stockError
    )
  }
  const clearFields = () => {
    titleSetter('')
    descriptionSetter('')
    imgMenuSetter('')
    variationsSetter([
      {
        title: '',
        price: '',
        discounted: '',
        addons: [],
        titleError: null,
        priceError: null,
        discountedError: null
      }
    ])
    stockSetter('')
    titleErrorSetter(null)
    descriptionErrorSetter(null)
    categoryErrorSetter(null)
    stockErrorSetter(null)
  }
  const onBlurVariation = (index, type) => {
    let error = false
    const variation = variations
    if (type === 'title') {
      const occ = variation.filter(v => v.title === variation[index][type])
      if (occ.length > 1) error = true
    } else if (
      type === 'discounted' &&
      variation[index].discounted.trim() !== ''
    ) {
      // variations[index][type + 'Error'] = variations[index].price > variations[index].discounted
    }
    if (type !== 'discounted') {
      variation[index][type + 'Error'] = error
        ? !error
        : !validateFunc({ [type]: variation[index][type] }, type)
    }
    variationsSetter([...variation])
  }
  const onCompleted = data => {
    if (!props.food) clearFields()
    const message = props.food
      ? 'Food updated successfully'
      : 'Food added successfully'
    errorSetter('')
    successSetter(message)
  }
  const updateAddonsList = ids => {
    const variation = variations
    variation[varitionIndex].addons = variation[varitionIndex].addons.concat(
      ids
    )
    variationsSetter([...variation])
  }
  const onError = () => {
    errorSetter('Failed.Please try again')
    successSetter('')
  }
  // show Create Addon modal
  const toggleModal = index => {
    varitionIndexSetter(index)
    addonsModalSetter(prev => !prev)
  }
  const onSelectAddon = (index, id) => {
    const variation = variations
    const addon = variation[index].addons.indexOf(id)
    if (addon < 0) {
      variation[index].addons.push(id)
    } else {
      variation[index].addons.splice(addon, 1)
    }
    variationsSetter([...variation])
  }
  const onDismiss = () => {
    successSetter('')
    errorSetter('')
  }
  const imageToBase64 = imgUrl => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      imgMenuSetter(fileReader.result)
    }
    fileReader.readAsDataURL(imgUrl)
  }
  const uploadImageToCloudinary = async() => {
    if (imgMenu === '') {
      return imgMenu
    }
    if (props.food && props.food.img_url === imgMenu) {
      return imgMenu
    }

    const apiUrl = cloudinary_upload_url
    const data = {
      file: imgMenu,
      upload_preset: cloudinary_food
    }
    try {
      const result = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      const imageData = await result.json()
      return imageData.secure_url
    } catch (e) {
      console.log(e)
    }
  }
  const { t } = props
  return (
    <>
      <Row>
        <Col className="order-xl-1">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">
                    {props.food ? t('Edit Food') : t('Add Food')}
                  </h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Mutation
                mutation={mutation[0]}
                onCompleted={onCompleted}
                onError={onError}
                refetchQueries={[{ query: GET_FOODS, variables: { page: 0 } }]}>
                {(mutate, { loading, error }) => {
                  if (loading) {
                    return (
                      <Loader
                        className="text-center"
                        type="TailSpin"
                        color="#fb6340"
                        height={100}
                        width={100}
                        visible={loading}
                      />
                    )
                  }
                  return (
                    <Form>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-title">
                                  {t('Title')}
                                </label>
                                <br />
                                <FormGroup
                                  className={
                                    titleError === null
                                      ? ''
                                      : titleError
                                        ? 'has-success'
                                        : 'has-danger'
                                  }>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-title"
                                    placeholder="e.g Breakfast"
                                    type="text"
                                    value={title}
                                    onChange={event => {
                                      titleSetter(event.target.value)
                                    }}
                                    onBlur={event => {
                                      onBlur(titleErrorSetter, 'title', title)
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-description">
                                  {t('Description')}
                                </label>
                                <br />
                                <FormGroup
                                  className={
                                    descriptionError === null
                                      ? ''
                                      : descriptionError
                                        ? 'has-success'
                                        : 'has-danger'
                                  }>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-description"
                                    placeholder="e.g All happiness depends on leisurely breakfast."
                                    minLength="20"
                                    type="textarea"
                                    value={description}
                                    onChange={event => {
                                      descriptionSetter(event.target.value)
                                    }}
                                    onBlur={event => {
                                      onBlur(
                                        descriptionErrorSetter,
                                        'description',
                                        description
                                      )
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-category">
                                  {t('Category')}
                                </label>
                                <Query query={GET_CATEGORIES}>
                                  {({ data, loading, error }) => {
                                    if (loading) return t('Loading')
                                    if (error) return t('Error')
                                    return (
                                      <FormGroup
                                        className={
                                          categoryError === null
                                            ? ''
                                            : categoryError
                                              ? 'has-success'
                                              : 'has-danger'
                                        }>
                                        <Input
                                          type="select"
                                          name="select"
                                          id="exampleSelect"
                                          value={category}
                                          onChange={handleChange}
                                          onBlur={event => {
                                            onBlur(
                                              categoryErrorSetter,
                                              'category',
                                              category
                                            )
                                          }}>
                                          {!category && (
                                            <option value={''}>
                                              {t('Select')}
                                            </option>
                                          )}
                                          {data.categories.map(category => (
                                            <option
                                              value={category._id}
                                              key={category._id}>
                                              {category.title}
                                            </option>
                                          ))}
                                        </Input>
                                      </FormGroup>
                                    )
                                  }}
                                </Query>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-stock">
                                  {t('Stock')}
                                </label>
                                <FormGroup
                                  className={
                                    stockError === null
                                      ? ''
                                      : stockError
                                        ? 'has-success'
                                        : 'has-danger'
                                  }>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-stock"
                                    placeholder="e.g 9"
                                    type="number"
                                    value={stock}
                                    onChange={event => {
                                      stockSetter(event.target.value)
                                    }}
                                    onBlur={event => {
                                      onBlur(stockErrorSetter, 'stock', stock)
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h3 className="mb-0"> {t('Food Image')}</h3>
                                <FormGroup>
                                  <div className="card-title-image">
                                    {imgMenu && typeof imgMenu === 'string' && (
                                      <a
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}>
                                        <img
                                          alt="..."
                                          className="rounded-rectangle"
                                          src={imgMenu}
                                        />
                                      </a>
                                    )}
                                    <input
                                      className="mt-4"
                                      type="file"
                                      onChange={event => {
                                        selectImage(event, 'imgMenu')
                                      }}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg="6">
                            <h3 className="mb-0">{t('Variations')}</h3>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-type">
                                    {t('Title')}
                                  </label>
                                  <br />
                                  <small style={{ color: 'blue' }}>
                                    Title must be unqiue
                                  </small>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-price">
                                    {t('Price')}
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-price">
                                    {t('Discounted')}
                                  </label>
                                </FormGroup>
                              </Col>
                            </Row>

                            {variations.map((variation, index) => (
                              <div key={index}>
                                <Row>
                                  <Col lg="4">
                                    <FormGroup
                                      className={
                                        variation.titleError === false
                                          ? 'has-danger'
                                          : variation.titleError === true
                                            ? 'has-success'
                                            : ''
                                      }>
                                      <Input
                                        className="form-control-alternative"
                                        value={variation.title}
                                        id="input-type"
                                        placeholder="e.g Small"
                                        type="text"
                                        autoComplete="off"
                                        onChange={event => {
                                          handleVariationChange(
                                            event,
                                            index,
                                            'title',
                                            'variations'
                                          )
                                        }}
                                        onBlur={event => {
                                          onBlurVariation(index, 'title')
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="4">
                                    <FormGroup
                                      className={
                                        variation.priceError === false
                                          ? 'has-danger'
                                          : variation.priceError === true
                                            ? 'has-success'
                                            : ''
                                      }>
                                      <Input
                                        className="form-control-alternative"
                                        value={variation.price}
                                        id="input-price"
                                        placeholder="e.g 9.99"
                                        type="number"
                                        onChange={event => {
                                          handleVariationChange(
                                            event,
                                            index,
                                            'price',
                                            'variations'
                                          )
                                        }}
                                        onBlur={event => {
                                          onBlurVariation(index, 'price')
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="4">
                                    <FormGroup
                                      className={
                                        variation.discountedError === false
                                          ? 'has-danger'
                                          : variation.discountedError === true
                                            ? 'has-success'
                                            : ''
                                      }>
                                      <Input
                                        className="form-control-alternative"
                                        value={variation.discounted}
                                        id="input-discounted"
                                        placeholder="e.g 9.99"
                                        type="number"
                                        onChange={event => {
                                          handleVariationChange(
                                            event,
                                            index,
                                            'discounted',
                                            'variations'
                                          )
                                        }}
                                        onBlur={event => {
                                          onBlurVariation(index, 'discounted')
                                        }}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row className="mb-2">
                                  <Col lg="6">
                                    <Button
                                      onClick={() => toggleModal(index)}
                                      color="warning">
                                      New Addon
                                    </Button>
                                  </Col>
                                </Row>
                                <Row
                                  style={{
                                    maxHeight: '67vh',
                                    overflowY: 'scroll'
                                  }}>
                                  <Col lg="12">
                                    <Query query={GET_ADDONS}>
                                      {({ loading, error, data }) => {
                                        if (loading) return 'Loading ...'
                                        if (error) return 'Error ...'
                                        return data.addons.map(
                                          (addon, indexAddon) => (
                                            <FormGroup
                                              key={indexAddon}
                                              check
                                              className="mb-2">
                                              <Label check>
                                                <Input
                                                  value={addon._id}
                                                  type="checkbox"
                                                  checked={variations[
                                                    index
                                                  ].addons.includes(addon._id)}
                                                  onChange={() =>
                                                    onSelectAddon(
                                                      index,
                                                      addon._id
                                                    )
                                                  }
                                                />
                                                {`${addon.title} (Description: ${addon.description})(Min: ${addon.quantity_minimum})(Max: ${addon.quantity_maximum})`}
                                              </Label>
                                            </FormGroup>
                                          )
                                        )
                                      }}
                                    </Query>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col lg="6">
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
                              </div>
                            ))}
                          </Col>
                        </Row>
                        <hr />
                        <Row className="mt-2 justify-content-center">
                          <Col xs="4">
                            <Button
                              color="primary"
                              href="#pablo"
                              className="btn-block"
                              onClick={async e => {
                                e.preventDefault()
                                if (onSubmitValidaiton()) {
                                  mutate({
                                    variables: {
                                      foodInput: {
                                        _id: props.food ? props.food._id : '',
                                        title: title,
                                        description: description,
                                        img_url: await uploadImageToCloudinary(),
                                        category: category,
                                        variations: variations.map(
                                          ({
                                            title,
                                            price,
                                            discounted,
                                            addons
                                          }) => {
                                            return {
                                              title,
                                              price: +price,
                                              discounted: +discounted,
                                              addons
                                            }
                                          }
                                        ),
                                        stock: +stock
                                      }
                                    }
                                  })
                                }
                                errorSetter('')
                                successSetter('')
                              }}
                              size="lg">
                              {t('Save')}
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <Alert
                              color="success"
                              isOpen={!!success}
                              toggle={onDismiss}>
                              <span className="alert-inner--icon">
                                <i className="ni ni-like-2" />
                              </span>{' '}
                              <span className="alert-inner--text">
                                <strong>{t('Success')}!</strong> {success}
                              </span>
                            </Alert>
                            <Alert
                              color="danger"
                              isOpen={!!mainError}
                              toggle={onDismiss}>
                              <span className="alert-inner--icon">
                                <i className="ni ni-like-2" />
                              </span>{' '}
                              <span className="alert-inner--text">
                                <strong>{t('Danger')}!</strong> {mainError}
                              </span>
                            </Alert>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  )
                }}
              </Mutation>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={addonsModal}
        toggle={() => {
          toggleModal()
        }}>
        <AddonComponent updateAddonsList={updateAddonsList} />
      </Modal>
    </>
  )
}
export default withTranslation()(Food)
