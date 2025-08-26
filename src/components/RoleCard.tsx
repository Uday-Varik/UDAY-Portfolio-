import { useNavigate } from 'react-router-dom';

interface RoleCardProps {
  title: string;
  description: string;
  path: string;
}

// RoleCard renders a clickable card representing one of the professional
// identities (AI/ML, Data, Web). Clicking navigates to the appropriate page.
export default function RoleCard({ title, description, path }: RoleCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="role-card"
      onClick={() => navigate(path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(path);
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}