import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api';
import type { MeetData } from '../types/meetData';

interface UseGetMeetParams {
    meet_id: string;
    conflicts?: boolean;
    update_seq?: boolean;
    include_docs?: boolean;
}

export const useGetMeet = (params: UseGetMeetParams) => {
    const { meet_id, conflicts = true, update_seq = true, include_docs = true } = params;

    const queryParams = new URLSearchParams({
        conflicts: String(conflicts),
        update_seq: String(update_seq),
        include_docs: String(include_docs),
    });

    const endpoint = `/${meet_id}_readonly/_all_docs?${queryParams}`;

    return useQuery({
        queryKey: ['meet', params],
        queryFn: async () => {
            const response = await apiClient.couchGet<MeetData>(endpoint);
            return response;
        },
    });
};
