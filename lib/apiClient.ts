import axios from "axios";
import { API_BASE_URL } from "./apiEndpoints";

/**
 * Pre-configured Axios instance for calling the FastAPI backend.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 30000, // 30 seconds
});



/**
 * Safely extracts a string error message from any API error (including FastAPI 422 arrays, Blobs, objects)
 */
export async function extractApiErrorMessage(err: any, fallback = "An unexpected error occurred."): Promise<string> {
  if (!err) return fallback;

  // If error response data is a Blob (common when responseType: "blob")
  if (err.response?.data instanceof Blob) {
    try {
      const text = await err.response.data.text();
      try {
        const json = JSON.parse(text);
        return extractApiErrorMessage(json, text || fallback);
      } catch {
        return text || fallback;
      }
    } catch {
      return fallback;
    }
  }

  const data = err.response?.data ?? err;

  if (typeof data === "string") return data;

  if (Array.isArray(data)) {
    return data
      .map((item) => (typeof item === "object" && item !== null ? item?.msg || item?.message || JSON.stringify(item) : String(item)))
      .join(", ");
  }

  if (typeof data === "object" && data !== null) {
    if (data.detail !== undefined) {
      return extractApiErrorMessage(data.detail, fallback);
    }
    if (data.message !== undefined) {
      return extractApiErrorMessage(data.message, fallback);
    }
    if (data.msg !== undefined) {
      return String(data.msg);
    }
    if (data.error !== undefined) {
      return extractApiErrorMessage(data.error, fallback);
    }
    if (err.message && typeof err.message === "string" && !err.message.includes("Network Error")) {
      return err.message;
    }
  }

  return err.message || fallback;
}

export default apiClient;
