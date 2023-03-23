import path from 'path'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

const rootDirectory = process.cwd();

const typesArray = loadFilesSync(path.join(rootDirectory, '/graphql/types'), { extensions: ['graphqls'] })

const typeDefs = mergeTypeDefs(typesArray)

export default typeDefs