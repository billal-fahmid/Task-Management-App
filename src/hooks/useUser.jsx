import { useQuery } from '@tanstack/react-query'


const useUser = (email) => {

    const { isLoading, data: userInfo = [], refetch } = useQuery({
        queryKey: [`user`],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/userEmail/${email}`)
            return response.json()
        },
    })

    return [userInfo, isLoading, refetch]
}

export default useUser