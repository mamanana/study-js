// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createYoga } from 'graphql-yoga'
import { schema } from '../../graphql/schema'
import cookies from '@/untils/cookie'
import context from '../../graphql/context'

const handler = createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  context,
  graphqlEndpoint: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default cookies(handler)