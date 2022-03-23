import { UserBean } from "controller/type";


import faker from 'faker'

const userList: UserBean[] = [
    {
      id: 0,
      username: 'admin',
      password: 'any',
      name: 'Super Admin',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      introduction: 'I am a super administrator',
      email: 'admin@test.com',
      phone: '1234567890',
      roles: ['admin'],
    },
    {
      id: 1,
      username: 'editor',
      password: 'any',
      name: 'Normal Editor',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      introduction: 'I am an editor',
      email: 'editor@test.com',
      phone: '1234567890',
      roles: ['editor'],
    },
    {
      id: 2,
      username: 'visitor',
      password: 'any',
      name: 'Normal Visitor',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      introduction: 'I am an visitor',
      email: 'visitor@test.com',
      phone: '1234567890',
      roles: ['visitor'],
    }
  ]

const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor']
  })
}

export default userList
