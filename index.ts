import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { stringArg, idArg } from 'nexus'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['post'])
    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, ctx) =>
        ctx.prisma.posts({ where: { published: true } }),
    })
    t.list.field('postsByUser', {
      type: 'Post',
      args: {
        authorId: idArg({ nullable: true }),
      },
      resolve: (_, { authorId }, ctx) =>
        ctx.prisma.posts({ where: { author: { id: authorId } } }),
    })
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields(['createUser', 'deletePost'])
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        authorId: idArg({ nullable: true }),
      },
      resolve: (_, { title, authorId }, ctx) =>
        ctx.prisma.createPost({
          title,
          author: { connect: { id: authorId } },
        }),
    })
    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (_, { id }, ctx) =>
        ctx.prisma.updatePost({
          where: { id },
          data: { published: true },
        }),
    })
  },
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma },
})

server.start(() => console.log('Server is running on http://localhost:4000'))

// A `main` function so that we can use async/await
// async function main() {
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

  // const postsByUser = await prisma.user({ email: 'Chalice@prisma.io' }).posts()
  // console.log(`All posts by that user: ${JSON.stringify(postsByUser)}`)

// }

// main().catch(e => console.error(e))