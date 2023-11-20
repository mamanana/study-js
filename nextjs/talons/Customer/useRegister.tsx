import { useMutation } from "@apollo/client"
import { useToast } from "@/talons/Toast/useToast"
import RegisterQuery from '@/queries/Customer/register.graphql'
import { useEffect } from "react"

export const useRegister = () => {

    const [register, { loading, error }] = useMutation(RegisterQuery)

    const { addToast } = useToast()

    const handleSubmit = async ({values}) => {
        
        const variables = {
            ...values
        }

        try {
            const { data } = await register({ variables })
        
        } catch (e) {
            return;
        }


        // console.log(error)

        // console.log(loginData)

        return {

        }
    }

    return {
        handleSubmit
    }
}