import { useMutation } from "@apollo/client"
import CustomerLoginGraphql from '@/queries/Customer/login.graphql'

export const useLogin = () => {

    const [login, {data, loading, error}] = useMutation(CustomerLoginGraphql)

    const handleSubmit = async ({values}) => {
        
        const variables = {
            ...values
        }

        const loginData = await login({ variables })

        console.log(loginData)

        return {

        }
    }

    return {
        handleSubmit
    }
}