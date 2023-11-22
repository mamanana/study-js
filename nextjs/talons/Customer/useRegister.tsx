import { useMutation } from "@apollo/client"
import { useError } from "@/talons/Error/useError"
import { useUserContext } from '@/context/user'
import RegisterQuery from '@/queries/Customer/register.graphql'

export const useRegister = () => {

    const [register, { loading, error }] = useMutation(RegisterQuery)

    const [, { setUser }] = useUserContext()

    useError({error})

    const handleSubmit = async ({values}) => {
        
        const variables = {
            ...values
        }

        try {
            const { data } = await register({ variables })
            
            console.log(data)
        
        } catch (e) {
            return;
        }
    }

    return {
        handleSubmit,
        loading
    }
}