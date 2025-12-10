/**
 * Upload Service
 * Handle file uploads to Supabase Storage
 */

import { supabase } from "../lib/supabase";
import { SUPABASE_BUCKET_NAME } from "../config/config";

/**
 * Upload image file to Supabase Storage
 * @param {File} file - Image file to upload
 * @param {string} folderPath - Full folder path in bucket (e.g., "thumbnails/projects/123")
 * @param {string} fileName - Custom file name (optional, will use timestamp if not provided)
 * @returns {Promise<Object>} { success: boolean, url: string, error?: string }
 */
export async function uploadImage(file, folderPath = "thumbnails", fileName = null) {
  try {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File size exceeds 5MB limit");
    }

    // Generate file name if not provided
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 9);
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const generatedFileName = `${timestamp}-${randomString}.${fileExtension}`;
    
    // Construct full file path
    // Ensure folderPath doesn't have trailing slash
    const cleanFolderPath = folderPath.replace(/\/$/, "");
    const finalFileName = fileName 
      ? `${cleanFolderPath}/${fileName}` 
      : `${cleanFolderPath}/${generatedFileName}`;

    console.log("📤 [Upload] Uploading file:", {
      fileName: finalFileName,
      fileSize: file.size,
      fileType: file.type,
      bucket: SUPABASE_BUCKET_NAME,
      folderPath: cleanFolderPath,
    });

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .upload(finalFileName, file, {
        cacheControl: "3600",
        upsert: false, // Don't overwrite existing files
      });

    if (error) {
      console.error("❌ [Upload] Upload error:", error);
      throw new Error(error.message || "Failed to upload file");
    }

    console.log("✅ [Upload] Upload successful:", data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .getPublicUrl(finalFileName);

    const publicUrl = urlData?.publicUrl;

    if (!publicUrl) {
      throw new Error("Failed to get public URL");
    }

    console.log("🔗 [Upload] Public URL:", publicUrl);

    return {
      success: true,
      url: publicUrl,
      path: finalFileName,
    };
  } catch (error) {
    console.error("❌ [Upload] Error:", error);
    return {
      success: false,
      url: null,
      error: error.message || "Failed to upload file",
    };
  }
}

/**
 * Delete image from Supabase Storage
 * @param {string} filePath - Path to file in bucket
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
export async function deleteImage(filePath) {
  try {
    if (!filePath) {
      throw new Error("No file path provided");
    }

    console.log("🗑️ [Upload] Deleting file:", filePath);

    const { error } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("❌ [Upload] Delete error:", error);
      throw new Error(error.message || "Failed to delete file");
    }

    console.log("✅ [Upload] Delete successful");

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ [Upload] Delete error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete file",
    };
  }
}

/**
 * Upload thumbnail for project/portfolio
 * Creates organized folder structure: thumbnails/{type}s/{itemId}/
 * 
 * @param {File} file - Image file
 * @param {string} type - "project" or "portfolio"
 * @param {string|number} itemId - Project or Portfolio ID (optional, for better organization)
 * @returns {Promise<Object>} { success: boolean, url: string, path?: string, error?: string }
 * 
 * @example
 * // Upload for project with ID 123
 * uploadThumbnail(file, "project", "123")
 * // Result: thumbnails/projects/123/{timestamp}-{random}.jpg
 * 
 * @example
 * // Upload for portfolio with ID 456
 * uploadThumbnail(file, "portfolio", "456")
 * // Result: thumbnails/portfolios/456/{timestamp}-{random}.jpg
 */
export async function uploadThumbnail(file, type = "project", itemId = null) {
  // Validate type
  const validTypes = ["project", "portfolio"];
  if (!validTypes.includes(type.toLowerCase())) {
    throw new Error(`Invalid type. Must be one of: ${validTypes.join(", ")}`);
  }

  // Build folder path with organized structure
  // Structure: thumbnails/{type}s/{itemId}/
  const typePlural = `${type.toLowerCase()}s`; // "projects" or "portfolios"
  
  let folderPath;
  if (itemId) {
    // Organized by type and item ID: thumbnails/projects/123/
    folderPath = `thumbnails/${typePlural}/${itemId}`;
  } else {
    // Fallback: thumbnails/projects/ or thumbnails/portfolios/
    folderPath = `thumbnails/${typePlural}`;
  }

  console.log("📁 [Upload] Folder structure:", {
    type,
    itemId,
    folderPath,
  });

  return await uploadImage(file, folderPath);
}

