import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api';
import { type Meet, MeetsResponseSchema } from '../types/meet';

export const useQueryMeets = () => {
  return useQuery<Meet[]>({
    queryKey: ['meets'],
    queryFn: async () => {
      const data = await apiClient.get('/meets');
      const response = MeetsResponseSchema.parse(data);
      return response.docs;
    },
  });
};
