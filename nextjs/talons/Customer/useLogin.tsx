import { useMutation } from "@apollo/client"
import CustomerLoginGraphql from '@/queries/Customer/login.graphql'

export const useLogin = () => {

    const [login, {data, loading, error}] = useMutation(CustomerLoginGraphql)

}