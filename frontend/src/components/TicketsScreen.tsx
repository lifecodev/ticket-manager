import React, { useState } from 'react';
import { useTickets } from '../api/useTickets';
import { TicketCard } from '../components/TicketCard';
import { useAuth } from '../context/AuthContext';

export const TicketsScreen: React.FC = () => {
  const { user } = useAuth();
  const { tickets, isLoading, createTicket, updateStatus, isUpdating } = useTickets();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Защита от дублей

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user?.id) return; // Проверяем наличие личного ID

    try {
      setIsSubmitting(true);
      await createTicket({
        title,
        description,
        userId: user.id, 
      });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error("Ошибка создания заявки:", error);
      alert("Не удалось создать заявку. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div style={styles.centered}>Загрузка заявок...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Форма создания */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Тема заявки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          disabled={isSubmitting}
          required
        />
        <textarea
          placeholder="Описание проблемы"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          style={{ ...styles.button, opacity: isSubmitting || !user?.id ? 0.7 : 1 }}
          disabled={isSubmitting || !user?.id}
        >
          {isSubmitting ? 'Создание...' : 'Создать заявку'}
        </button>
      </form>

      {/* Список карточек */}
      <div style={styles.grid}>
        {tickets?.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onStatusChange={(id, status) => updateStatus({ id, status })}
              disabled={isUpdating}
            />
          ))
        ) : (
          <div style={styles.empty}>Нет активных заявок</div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { 
    padding: '24px', 
    backgroundColor: '#0f172a', // Тёмный фон под стиль инпутов
    minHeight: '100vh' 
  },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', maxWidth: '500px' },
  input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff' },
  textarea: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', minHeight: '80px' },
  button: { padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#0284c7', color: '#fff', cursor: 'pointer', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  centered: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' },
  empty: { color: '#94a3b8', gridColumn: '1 / -1' }
};

