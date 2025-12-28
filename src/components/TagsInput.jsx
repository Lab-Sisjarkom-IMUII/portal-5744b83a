import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./Input";

/**
 * TagsInput component untuk add/remove tags
 * @param {Array} tags - Array of tag strings
 * @param {Function} onChange - Change handler (tags) => void
 */
export function TagsInput({ tags = [], onChange }) {
  const [inputValue, setInputValue] = useState("");
  
  // Predefined popular tags
  const popularTags = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Backend",
    "Frontend",
    "Full Stack",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "API",
    "Database",
    "Machine Learning",
    "AI",
    "Blockchain",
    "E-commerce",
    "Portfolio",
  ];
  
  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
      setInputValue("");
    }
  };
  
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAddTag(inputValue);
      }
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };
  
  // Filter popular tags yang belum ditambahkan
  const availablePopularTags = popularTags.filter(tag => !tags.includes(tag));
  
  return (
    <div className="space-y-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder="Type tag and press Enter or comma to add"
      />
      
      {/* Popular Tags */}
      {availablePopularTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-[var(--foreground)]/60">Popular tags:</p>
          <div className="flex flex-wrap gap-2">
            {availablePopularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className="px-3 py-1 bg-[var(--muted)] hover:bg-[var(--primary)]/20 text-[var(--foreground)]/70 hover:text-[var(--primary)] rounded-full text-sm font-medium transition-colors border border-[var(--border)] hover:border-[var(--primary)]/50"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Selected Tags */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-[var(--foreground)]/60">Selected tags:</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-[var(--primary)]/30 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

