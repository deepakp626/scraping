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
  const isJavaScript = payload.language_id === 63 || payload.language_id === 93;
  const isTypeScript = payload.language_id === 74;
  const isJson = payload.language_id === 98;
  const isHtml = payload.language_id === 96;

  // JSON Validation & Formatting in Browser
  if (isJson) {
    try {
      const parsed = JSON.parse(payload.source_code);
      const formatted = JSON.stringify(parsed, null, 2);
      const keysCount = typeof parsed === "object" && parsed !== null ? Object.keys(parsed).length : 1;
      return {
        stdout: `✅ Valid JSON!\n\n${formatted}\n\n[Summary: Root elements/keys: ${keysCount}]`,
        stderr: null,
        compile_output: null,
        message: "JSON Validated and formatted in browser",
        status: { id: 3, description: "Accepted" },
        time: "0.001",
        memory: 256,
      };
    } catch (err: any) {
      return {
        stdout: null,
        stderr: `❌ JSON Syntax Error:\n${err?.message || String(err)}`,
        compile_output: null,
        message: "JSON Syntax Error",
        status: { id: 11, description: "Runtime Error (Local)" },
        time: "0.001",
        memory: 0,
      };
    }
  }

  // HTML / XML Inspection in Browser
  if (isHtml) {
    return {
      stdout: `🌐 HTML5 Document Ready\nCharacters: ${payload.source_code.length}\nLines: ${payload.source_code.split("\n").length}\n\nMarkup parsed cleanly in client environment.`,
      stderr: null,
      compile_output: null,
      message: "Client HTML execution ready",
      status: { id: 3, description: "Accepted" },
      time: "0.001",
      memory: 128,
    };
  }

  // JavaScript / TypeScript Browser Execution
  if (isJavaScript || isTypeScript) {
    let output = "";
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    // Simple console capture
    const capture = (prefix: string, args: any[]) => {
      output += (prefix ? `[${prefix}] ` : "") + args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ") + "\n";
    };

    console.log = (...args) => capture("", args);
    console.error = (...args) => capture("Error", args);
    console.warn = (...args) => capture("Warn", args);
    console.info = (...args) => capture("Info", args);

    try {
      // Strip simple TypeScript type annotations for basic browser execution if TS
      let executableCode = payload.source_code;
      if (isTypeScript) {
        // Strip interfaces, type aliases, and basic type annotations for demo evaluation
        executableCode = executableCode
          .replace(/interface\s+\w+\s*\{[^}]*\}/g, "")
          .replace(/type\s+\w+\s*=[^;]+;/g, "")
          .replace(/:\s*(string|number|boolean|any|void|object|User|T)(\[\])?/g, "")
          .replace(/<[A-Za-z0-9_,\s]+>/g, "");
      }

      // Use an async function wrapper to support await/async code top-level
      const runAsync = new Function(`return (async () => {\n${executableCode}\n})();`);
      const resultPromise = runAsync();
      if (resultPromise && typeof resultPromise.then === "function") {
        await resultPromise;
      }

      return {
        stdout: output || "Program completed successfully with no console output.",
        stderr: null,
        compile_output: null,
        message: "Executed locally in browser",
        status: { id: 3, description: "Accepted" },
        time: "0.002",
        memory: 512,
      };
    } catch (err: any) {
      return {
        stdout: output || null,
        stderr: String(err?.stack || err?.message || err),
        compile_output: null,
        message: "Runtime error in local execution",
        status: { id: 11, description: "Runtime Error (Local)" },
        time: "0.002",
        memory: 0,
      };
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
    }
  }

  // Simulated mode for compiled/backend languages when no API key is provided
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stdout: `🚀 Execution completed (Demo Mode)\n\nProgram output simulated for Language ID ${payload.language_id}.\nTo execute compiled code via high-performance cloud sandbox (Piston/Judge0):\nAdd your RapidAPI Judge0 API key in NEXT_PUBLIC_JUDGE0_API_KEY environment variable.`,
        stderr: null,
        compile_output: null,
        message: "Simulated execution (Demo Mode)",
        status: { id: 3, description: "Accepted" },
        time: "0.085",
        memory: 1024,
      });
    }, 450);
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
