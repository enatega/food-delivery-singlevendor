export const getFoods = `query Foods($page:Int){
    foods(page:$page){
      _id
      title
      description
      stock
      tag
      img_url
      variations{
        _id
        title
        price
        discounted
        addons{
          _id
          title
          description
          quantity_minimum
          quantity_maximum
          options{
            _id
            title
            price
          }
        }
      }
      category{
          _id
          title
      }
    }
  }`

export const createFood = `
  mutation CreateFood($foodInput:FoodInput!){
      createFood(
          foodInput:$foodInput
      ){
        _id
        title
        img_url
        description
        stock
        variations{
          _id
          title
          price
          discounted
          addons{
            _id
            title
            description
            quantity_minimum
            quantity_maximum
            options{
              _id
              title
              price
            }
          }
        }
        category{
          _id
          title
      }
      }
    }`

export const editFood = `
    mutation EditFood($foodInput:FoodInput!){
        editFood(
            foodInput:$foodInput
        ){
          _id
          title
          img_url
          description
          stock
          tag
          variations{
            _id
            title
            price
            discounted
            addons{
              _id
              title
              description
              quantity_minimum
              quantity_maximum
              options{
                _id
                title
                price
              }
            }
          }
          category{
            _id
            title
        }
        }
      }`

export const deleteFood = `
      mutation DeleteFood($id:String!){
        deleteFood(id:$id){
          _id
        }
      }`

export const getCategories = `query AllCategories($page:Int)
    {
      allCategories(page:$page){
        _id
        title
        description
        img_menu
      }}`

export const categories = `query categories
    {
      categories{
          _id
          title
          description
          img_menu
    }}`

export const subscribePlaceOrder = `subscription SubscribePaceOrder{
  subscribePlaceOrder{
      order{
        _id
      delivery_address{
        latitude
        longitude
        delivery_address
        details
        label
      }
      delivery_charges
      order_amount
      paid_amount
      payment_method
      order_id
      user{
        _id
        name
        email
        phone
      }
      items{
        _id
        food{
          _id
          title
          description
          img_url
        }
        variation{
          _id
          title
          price
          discounted
        }
        addons{
          _id
          title
          description
          quantity_minimum
          quantity_maximum
          options{
            _id
            title
            price
          }
        }
        quantity
      }
      reason
      status
      payment_status
      order_status
      createdAt
      review{
        _id
        rating
        description
      }
      rider{
        _id
        name
      }
    }
    origin
  }
}`

export const createCategory = `
mutation CreateCategory($title:String!,$description:String!,$img_menu:String){
  createCategory(category:{title:$title,description:$description,img_menu:$img_menu}){_id}
}`

export const editCategory = `
      mutation EditCategory( $_id:String,$title:String!,$description:String!,$img_menu:String){
        editCategory(category:{_id:$_id,title:$title,description:$description,img_menu:$img_menu}){_id}
      }`

export const deleteCategory = `
      mutation DeleteCategory($id:String!){
        deleteCategory(id:$id){
          _id
        }
      }`
export const getOrders = `query Orders($page:Int,$rows:Int,$search:String){
  allOrders(page:$page,rows:$rows,search:$search){
    _id
    delivery_address{
      latitude
      longitude
      delivery_address
      details
      label
    }
    delivery_charges
    order_amount
    paid_amount
    payment_method
    order_id
    user{
      _id
      name
      email
      phone
    }
    items{
      _id
      food{
        _id
        title
        description
        img_url
      }
      variation{
        _id
        title
        price
        discounted
      }
      addons{
        
        title
        description
        quantity_minimum
        quantity_maximum
        options{
         
          title
          price
        }
      }
      quantity
    }
    reason
    status
    payment_status
    order_status
    createdAt
    review{
      _id
      rating
      description
    }
    rider{
      _id
      name
    }
  }
}`

export const getDashboardTotal = `query GetDashboardTotal($startingDate: String, $endingDate: String){
  getDashboardTotal(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
    total_ratings
    avg_ratings
  }
}`
export const getDashboardSales = `query GetDashboardSales($startingDate: String, $endingDate: String){
  getDashboardSales(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      amount
    }
  }
}`
export const getDashboardOrders = `query GetDashboardOrders($startingDate: String, $endingDate: String){
  getDashboardOrders(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      count
    }
  }
}`

export const getDashboardData = `query GetDashboardData($startingDate: String, $endingDate: String){
  getDashboardData(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
    orders{
      day
      count
      amount
    }
  }
}`

export const getConfiguration = `query GetConfiguration{
  configuration{
    _id
    order_id_prefix
    email
    password
    enable_email
    client_id
    client_secret
    sandbox
    publishable_key
    secret_key
    delivery_charges
    currency
    currency_symbol
  }
}`

export const saveOrderConfiguration = `mutation SaveOrderConfiguration($configurationInput:OrderConfigurationInput!){
  saveOrderConfiguration(configurationInput:$configurationInput){
    _id
    order_id_prefix
  }
}`
export const saveEmailConfiguration = `mutation SaveEmailConfiguration($configurationInput:EmailConfigurationInput!){
  saveEmailConfiguration(configurationInput:$configurationInput){
    _id
    email
    password
    enable_email
  }
}`
export const saveMongoConfiguration = `mutation SaveMongoConfiguration($configurationInput:MongoConfigurationInput!){
  saveMongoConfiguration(configurationInput:$configurationInput){
    _id
    mongodb_url
  }
}`

export const savePaypalConfiguration = `mutation SavePaypalConfiguration($configurationInput:PaypalConfigurationInput!){
  savePaypalConfiguration(configurationInput:$configurationInput){
    _id
    client_id
    client_secret
    sandbox
  }
}`

export const saveStripeConfiguration = `mutation SaveStripeConfiguration($configurationInput:StripeConfigurationInput!){
  saveStripeConfiguration(configurationInput:$configurationInput){
    _id
    publishable_key
    secret_key
  }
}`
export const saveDeliveryConfiguration = `mutation SaveDeliveryConfiguration($configurationInput:DeliveryConfigurationInput!){
  saveDeliveryConfiguration(configurationInput:$configurationInput){
    _id
    delivery_charges
  }
}`
export const saveCurrencyConfiguration = `mutation SaveCurrencyConfiguration($configurationInput:CurrencyConfigurationInput!){
  saveCurrencyConfiguration(configurationInput:$configurationInput){
    _id
    currency
    currency_symbol
  }
}`

export const adminLogin = `mutation AdminLogin($email:String!,$password:String!){
  adminLogin(email:$email,password:$password){
    userId
    token
    name
    email
  }
}`

export const updateOrderStatus = `mutation UpdateOrderStatus($id:String!,$status:String!,$reason:String){
  updateOrderStatus(id:$id,status:$status,reason:$reason){
    _id
    order_status
    payment_status
  }
}
`

export const sendNotificationUser = `mutation SendNotificationUser($notificationTitle:String, $notificationBody: String!){
  sendNotificationUser(notificationTitle:$notificationTitle,notificationBody:$notificationBody)
}
`

export const updateStatus = `mutation UpdateStatus($id:String!,$status:Boolean!,$reason:String){
  updateStatus(id:$id,status:$status,reason:$reason){
    _id
    status
    reason
  }
}
`

export const uploadToken = `mutation UploadToken($pushToken:String!){
  uploadToken(pushToken:$pushToken){
    _id
    push_token
  }
}`

export const getUsers = `query Users($page:Int){
  users(page:$page){
    _id
    name
    email
    phone
    addresses{
      _id
      latitude
      longitude
      delivery_address
      details
      label
    }
  }
}`

export const reviews = `query AllReviews($offset:Int){
  allReviews(offset:$offset){
    _id
    rating
    description
    createdAt
    updatedAt
    is_active
    order{
      user{
        name
        email
      }
      items{
        food{
          title
        }
      }
   }
  }
}`

export const resetPassword = `mutation ResetPassword($password:String!,$token:String!){
  resetPassword(password:$password,token:$token){
    result
  }
}`

export const createRider = `
mutation CreateRider($riderInput:RiderInput!){
    createRider(
        riderInput:$riderInput
    ){
    _id
    name
    username
    password
    phone
    available
    }
  }`

export const getRiders = `query{
  riders{
    _id
    name
    username
    password
    phone
    available
  }
}`

export const getAvailableRiders = `query{
  availableRiders{
    _id
    name
    username
    phone
    available
  }
}`

export const editRider = `
    mutation EditRider($riderInput:RiderInput!){
        editRider(
          riderInput:$riderInput
        ){
          _id
          name
          username
          phone
        }
      }`
export const deleteRider = `
      mutation DeleteRider($id:String!){
        deleteRider(id:$id){
          _id
        }
      }`

export const toggleAvailablity = `
      mutation ToggleRider($id:String){
        toggleAvailablity(id:$id){
          _id
        }
}`

export const orderCount = `
query{
  orderCount
}`

export const assignRider = ` mutation AssignRider($id:String!,$riderId:String!){
  assignRider(id:$id,riderId:$riderId){
    _id
    rider{
      _id
      name
    }
  }
}`

export const getOrderStatuses = `query{
  getOrderStatuses
}
`

export const getPaymentStatuses = `query{
  getPaymentStatuses
}`

export const updatePaymentStatus = `mutation UpdatePaymentStatus($id:String!,$status:String!){
  updatePaymentStatus(id:$id,status:$status){
    _id
    payment_status
    paid_amount
  }
}
`

export const createOptions = `mutation CreateOptions($optionInput:[OptionInput]){
  createOptions(optionInput:$optionInput){
    _id
    title
    description
    price
  }
}`

export const getOptions = `query Options{
  options {
    _id
    title
    description
    price
  }
}
`

export const options = `query AllOptions($page:Int){
  allOptions(page:$page) {
    _id
    title
    description
    price
  }
}
`

export const createAddons = `mutation CreateAddons($addonInput:[AddonInput]){
  createAddons(addonInput:$addonInput){
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantity_minimum
    quantity_maximum
  }
}`
export const editAddon = `mutation editAddon($addonInput:AddonInput){
  editAddon(addonInput:$addonInput){
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantity_minimum
    quantity_maximum
  }
}`

export const getAddons = `query Addons{
  addons{
  _id
  title
  description
  options{
    _id
    title
    description
    price
  }
  quantity_minimum
  quantity_maximum
}}`

export const addons = `query AllAddons($page:Int){
  allAddons(page:$page){
  _id
  title
  description
  options{
    _id
    title
    description
    price
  }
  quantity_minimum
  quantity_maximum
  is_active
}}`

export const deleteAddon = `
      mutation DeleteAddon($id:String!){
        deleteAddon(id:$id)
      }`

export const deleteOption = `
      mutation DeleteOption($id:String!){
        deleteOption(id:$id)
      }`
export const editOption = `mutation editOption($optionInput:OptionInput){
  editOption(optionInput:$optionInput){
          _id
          title
          description
          price
        }
      }`

export const createCoupon = `mutation CreateCoupon($couponInput:CouponInput!){
  createCoupon(couponInput:$couponInput){
    _id
    code
    discount
    enabled
  }
}`
export const editCoupon = `mutation editCoupon($couponInput:CouponInput!){
  editCoupon(couponInput:$couponInput){
    _id
    code
    discount
    enabled
        }
      }`
export const deleteCoupon = `mutation DeleteCoupon($id:String!){
        deleteCoupon(id:$id)
      }`

export const getCoupons = `query Coupons{
        coupons {
          _id
          code
          discount
          enabled
        }
      }`
