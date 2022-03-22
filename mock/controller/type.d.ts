


export interface UserBean {
    id: number
    username: string
    password: string
    name: string
    email: string
    phone: string
    avatar: string
    introduction: string
    roles: string[]
}
export interface RoleBean {
    key: string
    name: string
    description: string
    routes: any
  }
