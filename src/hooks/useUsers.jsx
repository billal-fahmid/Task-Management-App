import { useQuery } from '@tanstack/react-query'


const useUsers = () => {

    const { isLoading, data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('https://tasks-manage-server-billal-fahmid.vercel.app/users')
            return response.json()
        },
    })

    return [users, isLoading, refetch]
}

export default useUsers