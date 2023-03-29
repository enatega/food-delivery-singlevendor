export const order = `fragment orderItem on Order{
    _id
    order_id
    delivery_address{
      latitude
      longitude
      delivery_address
      details
      label
    }
    delivery_charges
    items {
      _id
      food {
        _id
        title
      }
      quantity
      variation{
        _id
        title
        price
      }
      addons{
        _id
        title
        options{
          _id
          title
          price
        }
      }
    }
    user {
      _id
      name
      phone
      email
    }
    order_status
    payment_status
    payment_method
    paid_amount
    order_amount
    createdAt
}`
