import { prisma } from './generated/prisma-client'

// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  // const newUser = await prisma.createUser({ name: 'Alice' })
  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

  // Read all users from the database and print them to the console


  // const user = await prisma.user({ id: 'cjv25snto001207038baa6o32' });
  // console.log(user);

  // const usersCalledAlice = await prisma.users({
  //   where: {
  //     name: 'alice',
  //   },
  // })
  // console.log(usersCalledAlice);

  // await prisma.updateUser({
  //   where: { id: 'cjv25snto001207038baa6o32' },
  //   data: { name: 'Bob' },
  // })

  // await prisma.deleteUser({ id: 'cjv25snto001207038baa6o32' })

  // const allUsers = await prisma.users()
  // console.log(allUsers)

  // const newUser = await prisma.createUser({
  //   name: 'Chalice',
  //   email: 'Chalice@prisma.io',
  //   posts: {
  //     create: [
  //       {
  //         title: 'Join us for GraphQL Conf in 2019',
  //       },
  //       {
  //         title: 'Subscribe to GraphQL Weekly for GraphQL news',
  //       }
  //     ]
  //   }
  // });
  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

  // const allUsers = await prisma.users();
  // console.log(allUsers);

  // const allPosts = await prisma.posts();
  // console.log(allPosts);
}

main().catch(e => console.error(e))