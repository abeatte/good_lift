import { useQuery as useTanstackQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api';

export const useQuery = <T>(key: string[], endpoint: string) => {
  return useTanstackQuery({
    queryKey: key,
    queryFn: () => apiClient.get<T>(endpoint),
  });
};

export const useMutate = <TData, TVariables>(endpoint: string, onSuccessKey?: string[]) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TVariables) => apiClient.post<TData>(endpoint, data),
    onSuccess: () => {
      if (onSuccessKey) {
        queryClient.invalidateQueries({ queryKey: onSuccessKey });
      }
    },
  });
};
