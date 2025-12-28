import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";

/**
 * TeamMemberInput component untuk add/remove team members
 * @param {Array} members - Array of team members [{ name, email?, role?, avatar? }]
 * @param {Function} onChange - Change handler (members) => void
 */
export function TeamMemberInput({ members = [], onChange }) {
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  });
  
  const handleAddMember = () => {
    if (!newMember.name.trim()) {
      return;
    }
    
    const member = {
      name: newMember.name.trim(),
      email: newMember.email.trim() || undefined,
      role: newMember.role.trim() || undefined,
    };
    
    onChange([...members, member]);
    setNewMember({ name: "", email: "", role: "" });
  };
  
  const handleRemoveMember = (index) => {
    const updated = members.filter((_, i) => i !== index);
    onChange(updated);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddMember();
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Add Member Form */}
      <Card className="p-4">
        <div className="space-y-3">
          <Input
            label="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="Team member name"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email (Optional)"
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              placeholder="email@example.com"
            />
            
            <Input
              label="Role (Optional)"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              placeholder="e.g., Developer, Designer"
            />
          </div>
          
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddMember}
            disabled={!newMember.name.trim()}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </div>
      </Card>
      
      {/* Members List */}
      {members.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--foreground)]">
            Team Members ({members.length})
          </p>
          <div className="space-y-2">
            {members.map((member, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">
                      {member.name}
                    </p>
                    <div className="flex gap-3 mt-1">
                      {member.email && (
                        <p className="text-sm text-[var(--foreground)]/60 truncate">
                          {member.email}
                        </p>
                      )}
                      {member.role && (
                        <p className="text-sm text-[var(--foreground)]/60 truncate">
                          • {member.role}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="p-1 hover:bg-[var(--muted)] rounded transition-colors ml-2"
                    aria-label="Remove member"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

