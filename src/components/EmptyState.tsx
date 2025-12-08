interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="empty-state text-preset-4" style={{
      textAlign: 'center',
      padding: 'var(--spacing-600)',
      color: 'var(--color-text-secondary)',
      opacity: 0.6
    }}>
      {message}
    </div>
  );
}
