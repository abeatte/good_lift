import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api';
import { type Meet, type Meets, MeetsResponseSchema } from '../types/meet';

type queryType = 'past' | 'future' | 'all';

export const useQueryMeets = (query_type: queryType = 'all') => {
  return useQuery<Meet[]>({
    queryKey: ['meets', query_type],
    queryFn: async () => {
      const data = await apiClient.get<Meets>('/meets');
      const response = MeetsResponseSchema.parse(data);

      const now = new Date().getTime();

      const meets = response.docs;
      switch(query_type) {
        case 'past':
          return meets.filter(meet => meet.date.getTime() < now);
        case 'future':
          return meets.filter(meet => meet.date.getTime() > now);
        default:
          return meets;
      }
    },
  });
};
