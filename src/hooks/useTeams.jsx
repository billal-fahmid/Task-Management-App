
import { useQuery } from '@tanstack/react-query'

const useTeams=()=>{
   
    const { isLoading, data: teams=[], refetch } = useQuery({
        queryKey: ['teams'],
        queryFn: async()=>{
            const response = await fetch('https://tasks-manage-server-billal-fahmid.vercel.app/teams')
            return response.json()
        },
      })


    return [teams,isLoading, refetch]
}

export default useTeams;