import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { TeamMemberInput } from "./TeamMemberInput";
import { TagsInput } from "./TagsInput";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { uploadThumbnail } from "../services/uploadService";

/**
 * EditForm component untuk edit project/portfolio metadata
 * @param {Object} item - Project atau Portfolio object
 * @param {string} type - 'project' atau 'portfolio'
 * @param {Function} onSubmit - Submit handler (formData) => Promise
 * @param {Function} onCancel - Cancel handler
 */
export function EditForm({ item, type, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isShowcased, setIsShowcased] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Pre-fill form dengan existing data
  useEffect(() => {
    if (item) {
      setTitle(item.showcase_title || item.name || "");
      setDescription(item.showcase_description || item.description || "");
      setTeamMembers(item.team_members || []);
      setYoutubeLink(item.youtube_link || "");
      setTags(item.tags || []);
      setThumbnailUrl(item.thumbnail_url || "");
      setThumbnailPreview(item.thumbnail_url || null);
      setThumbnailFile(null);
      // is_showcased default to true if not set
      setIsShowcased(item.is_showcased !== false);
    }
  }, [item]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }
    
    // YouTube URL validation
    if (youtubeLink && !isValidUrl(youtubeLink)) {
      newErrors.youtubeLink = "Please enter a valid URL";
    }
    
    // Thumbnail URL validation
    if (thumbnailUrl && !isValidUrl(thumbnailUrl)) {
      newErrors.thumbnailUrl = "Please enter a valid URL";
    }
    
    // Team members is optional - no validation needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({ thumbnail: `Invalid file type. Allowed: ${allowedTypes.join(", ")}` });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors({ thumbnail: "File size exceeds 5MB limit" });
      return;
    }

    setThumbnailFile(file);
    setErrors({ ...errors, thumbnail: null });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Keep existing URL if available
    if (item?.thumbnail_url) {
      setThumbnailPreview(item.thumbnail_url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setIsUploading(false);
    
    try {
      let finalThumbnailUrl = thumbnailUrl.trim() || null;

      // Upload file if selected
      if (thumbnailFile) {
        setIsUploading(true);
        console.log("📤 [EditForm] Uploading thumbnail...");
        
        const uploadResult = await uploadThumbnail(thumbnailFile, type, item?.id);
        
        if (uploadResult.success) {
          finalThumbnailUrl = uploadResult.url;
          console.log("✅ [EditForm] Upload successful:", finalThumbnailUrl);
        } else {
          throw new Error(uploadResult.error || "Failed to upload thumbnail");
        }
        
        setIsUploading(false);
      }

      const formData = {
        showcase_title: title.trim(),
        showcase_description: description.trim(),
        team_members: teamMembers.length > 0 ? teamMembers : [], // Allow empty array
        youtube_link: youtubeLink.trim() || null,
        tags: tags.length > 0 ? tags : [], // Allow empty array
        thumbnail_url: finalThumbnailUrl,
        is_showcased: isShowcased,
      };
      
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: error.message || "Failed to save changes" });
      setIsUploading(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    // Reset form to original values
    if (item) {
      setTitle(item.showcase_title || item.name || "");
      setDescription(item.showcase_description || item.description || "");
      setTeamMembers(item.team_members || []);
      setYoutubeLink(item.youtube_link || "");
      setTags(item.tags || []);
      setThumbnailUrl(item.thumbnail_url || "");
      setIsShowcased(item.is_showcased !== false);
    }
    setErrors({});
    onCancel();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        required
        maxLength={100}
      />
      
      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className={`w-full px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all duration-200 ${
            errors.description ? "border-red-500 focus:ring-red-500/50" : ""
          }`}
          placeholder="Enter description..."
          required
          maxLength={1000}
        />
        <div className="flex justify-between mt-1">
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
          <p className="text-sm text-[var(--foreground)]/50 ml-auto">
            {description.length}/1000
          </p>
        </div>
      </div>
      
      {/* Team Members */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
          Team Members (Optional)
        </label>
        <TeamMemberInput
          members={teamMembers}
          onChange={setTeamMembers}
        />
        {teamMembers.length === 0 && (
          <p className="text-sm text-[var(--foreground)]/60 mt-1">
            No team members added. You can add them later.
          </p>
        )}
      </div>
      
      {/* YouTube Link */}
      <Input
        label="YouTube Link (Optional)"
        type="url"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        placeholder="https://youtube.com/watch?v=..."
        error={errors.youtubeLink}
      />
      
      {/* Tags */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
          Tags (Optional)
        </label>
        <TagsInput tags={tags} onChange={setTags} />
      </div>
      
      {/* Thumbnail Upload */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
          Thumbnail (Optional)
        </label>
        
        {/* File Upload */}
        <div className="space-y-3">
          {/* File Input */}
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
              id="thumbnail-upload"
              disabled={loading || isUploading}
            />
            <label
              htmlFor="thumbnail-upload"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                errors.thumbnail
                  ? "border-red-500 bg-red-500/10"
                  : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
              } ${loading || isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-[var(--primary)] border-t-transparent"></div>
                  <span className="text-sm text-[var(--foreground)]">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={18} className="text-[var(--foreground)]/60" />
                  <span className="text-sm text-[var(--foreground)]">
                    {thumbnailFile ? "Change Image" : "Upload Image"}
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Or URL Input */}
          <div className="text-center text-xs text-[var(--foreground)]/60">or</div>
          
          <Input
            label="Or enter URL"
            type="url"
            value={thumbnailUrl}
            onChange={(e) => {
              setThumbnailUrl(e.target.value);
              if (e.target.value && isValidUrl(e.target.value)) {
                setThumbnailPreview(e.target.value);
              }
            }}
            placeholder="https://example.com/image.jpg"
            error={errors.thumbnailUrl || errors.thumbnail}
            disabled={!!thumbnailFile}
          />
        </div>

        {/* Preview */}
        {thumbnailPreview && (
          <div className="mt-4 relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--card)]">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {thumbnailFile && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-500/90 hover:bg-red-600 text-white transition-colors"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {thumbnailFile && (
              <p className="mt-2 text-xs text-[var(--foreground)]/60 text-center">
                {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Show in Showcase Toggle */}
      <div className="flex items-center justify-between p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Show in Showcase
          </label>
          <p className="text-xs text-[var(--foreground)]/60">
            {isShowcased 
              ? `This ${type} will be visible on the showcase page` 
              : `This ${type} will be hidden from the showcase page`}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          <input
            type="checkbox"
            checked={isShowcased}
            onChange={(e) => setIsShowcased(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[var(--border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--primary)]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
        </label>
      </div>
      
      {/* Submit Error */}
      {errors.submit && (
        <p className="text-sm text-red-500">{errors.submit}</p>
      )}
      
      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

