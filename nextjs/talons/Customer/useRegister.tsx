import { useMutation } from "@apollo/client"
import RegisterQuery from '@/queries/Customer/register.graphql'

export const useLogin = () => {

    const [register, {data, loading, error}] = useMutation(RegisterQuery)

    const handleSubmit = async ({values}) => {
        
        const variables = {
            ...values
        }

        const loginData = await register({ variables })

        console.log(loginData)

        return {

        }
    }

    return {
        handleSubmit
    }
}