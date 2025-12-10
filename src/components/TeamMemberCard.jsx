import { Mail } from "lucide-react";
import { Card } from "./Card";

/**
 * TeamMemberCard component untuk display team member
 * @param {Object} member - Team member object { name, email?, role?, avatar? }
 */
export function TeamMemberCard({ member }) {
  const { name, email, role, avatar } = member;
  
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-lg font-semibold text-[var(--primary)]">
            {name?.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--foreground)] truncate">
            {name || "Unknown"}
          </h3>
          
          {role && (
            <p className="text-sm text-[var(--foreground)]/60 mt-1">
              {role}
            </p>
          )}
          
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1 text-sm text-[var(--accent)] hover:underline mt-1"
            >
              <Mail className="h-3 w-3" />
              <span className="truncate">{email}</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

