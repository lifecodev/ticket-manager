import React from 'react';
import { backend } from "wailsjs/go/models";
import { TicketStatus } from '../types/ticket';

interface TicketCardProps {
    ticket: backend.Ticket;
    onStatusChange: (id: number, status: TicketStatus,) => void;
    disabled?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({
    ticket,
    onStatusChange,
    disabled,
}) => {
    const formattedDate = ticket.created_at
        ? new Date(ticket.created_at).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        })
        : '';
    
    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <span style={styles.ticketId}>#{ticket.id}</span>
                <select 
                    value={ticket.status}
                    disabled={disabled}
                    onChange={(e) =>
                        onStatusChange(ticket.id, e.target.value as TicketStatus)
                    }
                    style={styles.selectStatus}
                >
                    <option value="open">Открыта</option>
                    <option value="in_progress">В работе</option>
                    <option value="closed">Выполнена</option>
                </select>
            </div>

            <h3 style={styles.title}>{ticket.title}</h3>
            <p style={styles.description}>{ticket.description}</p>

            <div style={styles.footer}>
                <div style={styles.userInfo}>
                    <span style={styles.userName}>
                        {ticket.user ? ticket.user.login : `User ID: ${ticket.user_id}`}
                    </span>
                </div>
                <span style={styles.date}>{formattedDate}</span>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    card: {
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        border: '1px solid #334155',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ticketId: {
        fontSize: '12px',
        color: '#64748b',
        fontWeight: 'bold',
    },
    selectStatus: {
        backgroundColor: '#0f172a',
        color: '#38bdf8',
        border: '1px solid #334155',
        borderRadius: '4px',
        padding: '4px 8px', 
        fontSize: '12px',
    },
    title: {
        margin: 0,
        fontSize: '16px',
        color: '#f8fafc',
    },
    description: {
        margin: 0,
        fontSize: '14px',
        color: '#94a3b8',
        lineHeight: '1.4',
    },
    footer: { 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '8px',
        borderTop: '1px solid #334155',
        fontSize: '12px',
    },
    userInfo: {
        color: '#cbd5e1',
    },
    userName: {
        fontWeight: '500', 
    },
    date: {
        color: '#64748b', 
    }, 
}; 
