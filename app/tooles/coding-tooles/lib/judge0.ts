// src/lib/judge0.ts
import type { ExecutionResult } from "../types/editor";

const BASE_URL =
  process.env.NEXT_PUBLIC_JUDGE0_BASE_URL || "https://judge0-ce.p.rapidapi.com";
const API_KEY = process.env.NEXT_PUBLIC_JUDGE0_API_KEY || "";
const HOST = process.env.NEXT_PUBLIC_JUDGE0_HOST || "judge0-ce.p.rapidapi.com";

export interface SubmissionPayload {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  cpu_time_limit?: number;
  memory_limit?: number;
}

export class Judge0Error extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "Judge0Error";
  }
}

/**
 * Fallback execution for when no API key is provided.
 * Provides real execution for JS and simulated for others.
 */
async function runLocally(payload: SubmissionPayload): Promise<ExecutionResult> {
  const isJavaScript = payload.language_id === 63 || payload.language_id === 93; // JS or Node.js
  
  if (isJavaScript) {
    let output = "";
    const originalLog = console.log;
    const originalError = console.error;
    
    // Simple console capture
    console.log = (...args) => { output += args.map(a => String(a)).join(" ") + "\n"; };
    console.error = (...args) => { output += "[Error] " + args.map(a => String(a)).join(" ") + "\n"; };

    try {
      // Use a Function constructor for basic browser-side execution
      const fn = new Function(payload.source_code);
      fn();
      
      return {
        stdout: output || "(no output)",
        stderr: null,
        compile_output: null,
        message: "Executed locally in browser (Demo Mode)",
        status: { id: 3, description: "Accepted" },
        time: "0.001",
        memory: 0
      };
    } catch (err) {
      return {
        stdout: output,
        stderr: String(err),
        compile_output: null,
        message: "Runtime error in local execution",
        status: { id: 11, description: "Runtime Error (Local)" },
        time: "0.001",
        memory: 0
      };
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  }

  // Simulated mode for other languages
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stdout: `[SIMULATED OUTPUT]\nThis is a demo mode response for Language ID ${payload.language_id}.\nTo enable real execution for this language, please provide a Judge0 API Key.`,
        stderr: null,
        compile_output: null,
        message: "Simulated execution (Demo Mode)",
        status: { id: 3, description: "Accepted" },
        time: "0.100",
        memory: 1024
      });
    }, 500);
  });
}

export async function executeCode(
  payload: SubmissionPayload
): Promise<ExecutionResult> {
  // If no API key, use the local/simulated fallback
  if (!API_KEY || API_KEY === "your_rapidapi_key_here" || API_KEY.trim() === "") {
    return runLocally(payload);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,compile_output,message,status,time,memory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": HOST,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      throw new Judge0Error(
        `Judge0 API error ${response.status}: ${text}`,
        response.status
      );
    }

    const data: ExecutionResult = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Judge0Error) throw err;
    // Fallback if API fails (e.g. network issue)
    console.warn("Judge0 API failed, falling back to local simulation", err);
    return runLocally(payload);
  }
}

export function formatOutput(result: ExecutionResult): {
  text: string;
  isError: boolean;
  statusLabel: string;
} {
  const statusId = result.status?.id ?? 0;
  const isError = statusId > 3;

  let text = "";
  if (result.compile_output) text += `[Compile Error]\n${result.compile_output}\n`;
  if (result.stderr) text += result.stderr;
  if (result.stdout) text += result.stdout;
  if (result.message) text += `\n[System Message]: ${result.message}\n`;
  if (!text) text = isError ? result.status?.description || "Unknown error" : "(no output)";

  return {
    text: text.trim(),
    isError,
    statusLabel: result.status?.description || "Unknown",
  };
}
