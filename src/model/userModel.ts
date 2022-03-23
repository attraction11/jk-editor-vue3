
// {
//     "code": 0,
//     "msg": "success",
//     "data": {
//         "id": 0,
//         "username": "admin",
//         "password": "any",
//         "name": "Super Admin",
//         "avatar": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//         "introduction": "I am a super administrator",
//         "email": "admin@test.com",
//         "phone": "1234567890",
//         "roles": [
//             "admin"
//         ]
//     }
// }

export interface UserInfoModel {
  id: number
  username: string
  password: string
  name: string
  avatar: string
  introduction: string
  email: string
  phone: string
  roles: string[]
}

export interface Users {
  items: any
}
