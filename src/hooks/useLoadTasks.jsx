
import { useQuery } from '@tanstack/react-query'

const useLoadTasks=()=>{
   
    const { isLoading, data: tasks=[], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async()=>{
            const response = await fetch('https://tasks-manage-server-billal-fahmid.vercel.app/all-tasks')
            return response.json()
        },
      })


    return [tasks,isLoading, refetch]
}

export default useLoadTasks