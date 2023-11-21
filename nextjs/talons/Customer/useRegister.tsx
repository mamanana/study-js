import { useMutation } from "@apollo/client"
import { useError } from "@/talons/Error/useError"
import RegisterQuery from '@/queries/Customer/register.graphql'

export const useRegister = () => {

    const [register, { loading, called, error }] = useMutation(RegisterQuery)

    console.log(error)
    console.log(called)

    useError({error})

    const handleSubmit = async ({values}) => {
        
        const variables = {
            ...values
        }

        try {
            const { data } = await register({ variables })
        
        } catch (e) {
            return;
        }
    }

    return {
        handleSubmit
    }
}