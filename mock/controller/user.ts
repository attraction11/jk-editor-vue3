

import { post, prefix ,get} from "../requestDecorator";
import userList from "../mockdb/userList";
import * as Koa from 'koa';
@prefix('/user')
export default class User {

 @post('/login')
 async login(ctx:any) {
   const {username} = ctx.request.body
   for (const user of userList) {
    if (user.username === username) {
      return {
        accessToken: username + '-token'
      }
    }
  }
  return ctx.throw(401);
 }

 @get('/userInfo')
 async getUserInfo(ctx:Koa.Context){
    let token = ctx.request.header.token
    let userInfo;
    switch (token) {
      case 'admin-token':
        userInfo = userList[0];
        break;
      case 'editor-token':
        userInfo = userList[1];
        break;
      default:
        userInfo = userList[2]
    }
    return userInfo
 }

 @get('/getUsers')
 async getUsers(ctx:any){
  const { name } = ctx.query
  const users = userList.filter(user => {
    const lowerCaseName = user.name.toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return{
    code: 20000,
    data: {
      items: users
    }
  }
 }
}
