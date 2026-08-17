import {useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { backend } from 'wailsjs/go/models';
import { TicketStatus } from '../types/ticket';
import {
    GetAllTickets,
    CreateTicket,
    UpdateTicketStatus,
} from '../../wailsjs/go/backend/App';

export interface CreateTicketParams {
    title: string;
    description: string;
    userId: number;
}

export function useTickets() {
    const queryClient = useQueryClient();

    const ticketsQuery = useQuery<backend.Ticket[], Error>({
        queryKey: ['tickets'],
        queryFn: () => GetAllTickets(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateTicketParams) => CreateTicket(data.title, data.description, data.userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: TicketStatus }) => UpdateTicketStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        },
    });

    return {
        tickets: ticketsQuery.data || [],
        isLoading: ticketsQuery.isLoading,
        isError: ticketsQuery.isError,
        createTicket: createMutation.mutate,
        isCreating: createMutation.isPending,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
}
