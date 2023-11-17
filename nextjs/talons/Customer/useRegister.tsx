import { useMutation } from "@apollo/client"
import { useToast } from "@/talons/Toast/useToast"
import RegisterQuery from '@/queries/Customer/register.graphql'

export const useRegister = () => {

    const [register, {data, loading, error}] = useMutation(RegisterQuery)

    const { addToast } = useToast()

    const handleSubmit = async ({values}) => {

        console.log('run 12')



        addToast({
            type: 'success',
            message: "Wow so easy!"
        })
        
        
        const variables = {
            ...values
        }

        // const data = await register({ variables })

        // console.log(loginData)

        return {

        }
    }

    return {
        handleSubmit
    }
}