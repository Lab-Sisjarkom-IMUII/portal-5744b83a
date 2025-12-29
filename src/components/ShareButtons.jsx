import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "./Button";
import { Toast } from "./Toast";

/**
 * ShareButtons component untuk social sharing
 * @param {string} url - URL to share
 * @param {string} title - Title untuk share
 * @param {string} description - Description untuk share
 */
export function ShareButtons({ url, title, description }) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const shareText = `${title}${description ? ` - ${description}` : ""}`;
  
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };
  
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  };
  
  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420");
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Fallback untuk browsers yang tidak support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setShowToast(true);
        setTimeout(() => {
          setCopied(false);
          setShowToast(false);
        }, 2000);
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textArea);
    }
  };
  
  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleTwitterShare}
          className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={handleFacebookShare}
          className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
        >
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
          Facebook
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLinkedInShare}
          className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyLink}
          className="w-full sm:w-auto min-h-[44px] sm:min-h-0"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
      
      {showToast && (
        <Toast
          message="Link copied to clipboard!"
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}
    </>
  );
}

