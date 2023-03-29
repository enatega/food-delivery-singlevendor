export const riderLogin = `mutation RiderLogin($username:String,$password:String,$notificationToken:String){
    riderLogin(username:$username,password:$password,notificationToken:$notificationToken){
      userId
      token
    }
  }`

export const updateOrderStatusRider = `mutation UpdateOrderStatusRider($id:String!,$status:String!){
    updateOrderStatusRider(id:$id,status:$status){
      _id
      order_status
    }
  }
  `

export const assignOrder = `mutation AssignOrder($id:String!){
    assignOrder(id:$id){
      _id
      rider{
        _id
      }
    }
}`

export const updateLocation = `mutation UpdateRiderLocation($latitude:String!,$longitude:String!){
  updateRiderLocation(latitude:$latitude,longitude:$longitude){
    _id
  }
}`
