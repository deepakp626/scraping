/**
 * Centralized API endpoints configuration for FastAPI Backend.
 * Base URL is configured via environment variables with fallback to localhost.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  // Base / Health Check
  HEALTH: `${API_BASE_URL}/`,

  // PDF Endpoints
  PDF: {
    CONVERT_TO_WORD: `${API_BASE_URL}/api/pdf/to-word`,
    COMPRESS: `${API_BASE_URL}/api/pdf/compress`,
    LOCKPDF:`${API_BASE_URL}/api/pdf/lock-pdf`,
    UNLOCKPDF:`${API_BASE_URL}/api/pdf/unlock-pdf`,
    OCRPDF:`${API_BASE_URL}/api/pdf/ocr-pdf`,
    PROTECTPDF: `${API_BASE_URL}/api/pdf/protect-pdf`,
    PDFTOHTML: `${API_BASE_URL}/api/pdf/to-html`,
    EXTRACTIMAGES:`${API_BASE_URL}/api/pdf/extract-images`,
    GET_DETAILS: (id: string | number) => `${API_BASE_URL}/api/pdf/${id}`,
  },

  // Image Endpoints
  IMAGE: {
    RESIZE: `${API_BASE_URL}/api/image/resize`,
    COMPRESS: `${API_BASE_URL}/api/image/compress`,
    REMOVE_BG: `${API_BASE_URL}/api/image/remove-bg`,
    CONVERT_FORMAT: `${API_BASE_URL}/api/image/convert`,
  },

  // Blog Endpoints
  BLOG: {
    LIST: `${API_BASE_URL}/api/blog/posts`,
    DETAIL: (slugOrId: string | number) => `${API_BASE_URL}/api/blog/posts/${slugOrId}`,
    CREATE: `${API_BASE_URL}/api/blog/posts`,
    UPDATE: (id: string | number) => `${API_BASE_URL}/api/blog/posts/${id}`,
    DELETE: (id: string | number) => `${API_BASE_URL}/api/blog/posts/${id}`,
  },

  // Scraping Endpoints
  SCRAPING: {
    SCRAPE_URL: `${API_BASE_URL}/api/scrape`,
    GET_TASK_STATUS: (taskId: string) => `${API_BASE_URL}/api/scrape/tasks/${taskId}`,
    DOWNLOAD_DATASET: (datasetId: string) => `${API_BASE_URL}/api/scrape/datasets/${datasetId}/download`,
  },
} as const;

export default API_ENDPOINTS;
