"use client";

import React, { useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Ajv, { ErrorObject } from "ajv";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Upload,
  Trash2,
  RefreshCw,
  FileCode,
  Code2,
} from "lucide-react";

interface ValidationStatus {
  valid: boolean;
  msg: string;
  errors?: string[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_INPUT_LENGTH = 5 * 1024 * 1024; // 5 MB

const DEFAULT_JSON = ``;

const DEFAULT_SCHEMA = ``;

export default function JSONSchemaValidator() {
  const [jsonInput, setJsonInput] = useState<string>(DEFAULT_JSON);
  const [schemaInput, setSchemaInput] =
    useState<string>(DEFAULT_SCHEMA);

  const [status, setStatus] =
    useState<ValidationStatus | null>(null);

  const [isValidating, setIsValidating] =
    useState<boolean>(false);

  const jsonFileInputRef =
    useRef<HTMLInputElement>(null);

  const schemaFileInputRef =
    useRef<HTMLInputElement>(null);

  /**
   * Create Ajv instance only once.
   */
  const ajv = useMemo(() => {
    return new Ajv({
      allErrors: true,
      verbose: false,
    });
  }, []);

  /**
   * Format Ajv validation errors.
   */
  const formatValidationErrors = (
    errors: ErrorObject[] | null | undefined
  ): string[] => {
    if (!errors || errors.length === 0) {
      return ["Validation failed against schema rules."];
    }

    return errors.map((error: any) => {
      const path =
        error.instancePath && error.instancePath.length > 0
          ? error.instancePath
          : error.dataPath && error.dataPath.length > 0
          ? error.dataPath
          : "root";

      switch (error.keyword) {
        case "required": {
          const missingProperty =
            typeof error.params === "object" &&
            error.params !== null &&
            "missingProperty" in error.params
              ? String(error.params.missingProperty)
              : "unknown";

          return `Field "${path}" is missing required property "${missingProperty}".`;
        }

        case "additionalProperties": {
          const additionalProperty =
            typeof error.params === "object" &&
            error.params !== null &&
            "additionalProperty" in error.params
              ? String(error.params.additionalProperty)
              : "unknown";

          return `Field "${path}" contains unexpected property "${additionalProperty}".`;
        }

        case "type": {
          const expectedType =
            typeof error.params === "object" &&
            error.params !== null &&
            "type" in error.params
              ? String(error.params.type)
              : "unknown";

          return `Field "${path}" must be of type "${expectedType}".`;
        }

        case "enum": {
          return `Field "${path}" must match one of the allowed values.`;
        }

        case "const": {
          return `Field "${path}" must match the required constant value.`;
        }

        case "pattern": {
          return `Field "${path}" does not match the required pattern.`;
        }

        case "format": {
          const format =
            typeof error.params === "object" &&
            error.params !== null &&
            "format" in error.params
              ? String(error.params.format)
              : "required format";

          return `Field "${path}" must match format "${format}".`;
        }

        case "minimum": {
          return `Field "${path}" must be greater than or equal to the minimum value.`;
        }

        case "maximum": {
          return `Field "${path}" must be less than or equal to the maximum value.`;
        }

        case "minLength": {
          return `Field "${path}" is shorter than the minimum allowed length.`;
        }

        case "maxLength": {
          return `Field "${path}" exceeds the maximum allowed length.`;
        }

        case "minItems": {
          return `Field "${path}" contains fewer items than allowed.`;
        }

        case "maxItems": {
          return `Field "${path}" contains more items than allowed.`;
        }

        case "uniqueItems": {
          return `Field "${path}" contains duplicate items.`;
        }

        case "oneOf": {
          return `Field "${path}" must match exactly one allowed schema.`;
        }

        case "anyOf": {
          return `Field "${path}" must match at least one allowed schema.`;
        }

        case "allOf": {
          return `Field "${path}" must satisfy all schema requirements.`;
        }

        case "not": {
          return `Field "${path}" must not match the specified schema.`;
        }

        default:
          return `Field "${path}": ${
            error.message || "Invalid value."
          }`;
      }
    });
  };

  /**
   * Validate JSON against JSON Schema.
   */
  const handleValidate = () => {
    setStatus(null);
    setIsValidating(true);

    try {
      if (!jsonInput.trim()) {
        setStatus({
          valid: false,
          msg: "JSON Data input is empty.",
        });
        return;
      }

      if (!schemaInput.trim()) {
        setStatus({
          valid: false,
          msg: "JSON Schema input is empty.",
        });
        return;
      }

      /**
       * Protect browser from extremely large input.
       */
      if (jsonInput.length > MAX_INPUT_LENGTH) {
        setStatus({
          valid: false,
          msg: "JSON payload is too large. Maximum allowed size is 5 MB.",
        });
        return;
      }

      if (schemaInput.length > MAX_INPUT_LENGTH) {
        setStatus({
          valid: false,
          msg: "JSON Schema is too large. Maximum allowed size is 5 MB.",
        });
        return;
      }

      let data: unknown;
      let schema: unknown;

      /**
       * Parse JSON payload.
       */
      try {
        data = JSON.parse(jsonInput);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Invalid JSON syntax.";

        setStatus({
          valid: false,
          msg: `Invalid JSON payload: ${message}`,
        });

        return;
      }

      /**
       * Parse JSON Schema.
       */
      try {
        schema = JSON.parse(schemaInput);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Invalid JSON Schema syntax.";

        setStatus({
          valid: false,
          msg: `Invalid JSON Schema: ${message}`,
        });

        return;
      }

      /**
       * Ensure schema is a JSON object.
       */
      if (
        typeof schema !== "object" ||
        schema === null ||
        Array.isArray(schema)
      ) {
        setStatus({
          valid: false,
          msg: "JSON Schema must be a valid JSON object.",
        });

        return;
      }

      /**
       * Compile schema.
       */
      let validate;

      try {
        validate = ajv.compile(schema);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to compile JSON Schema.";

        setStatus({
          valid: false,
          msg: `Invalid JSON Schema: ${message}`,
        });

        return;
      }

      /**
       * Validate payload.
       */
      const valid = validate(data);

      if (valid) {
        setStatus({
          valid: true,
          msg: "JSON data successfully validates against the JSON Schema.",
        });

        return;
      }

      const errorDetails = formatValidationErrors(
        validate.errors
      );

      setStatus({
        valid: false,
        msg: `Validation failed with ${errorDetails.length} error(s).`,
        errors: errorDetails,
      });
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Upload JSON or Schema file.
   */
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "json" | "schema"
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    /**
     * Reset input so the same file can be selected again.
     */
    event.target.value = "";

    /**
     * File size protection.
     */
    if (file.size > MAX_FILE_SIZE) {
      setStatus({
        valid: false,
        msg: "File is too large. Maximum allowed file size is 5 MB.",
      });

      return;
    }

    /**
     * Basic file extension validation.
     */
    const fileName = file.name.toLowerCase();

    if (
      !fileName.endsWith(".json") &&
      !fileName.endsWith(".txt")
    ) {
      setStatus({
        valid: false,
        msg: "Please upload a valid .json or .txt file.",
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result;

      if (typeof content !== "string") {
        setStatus({
          valid: false,
          msg: "Unable to read the selected file.",
        });

        return;
      }

      if (content.length > MAX_INPUT_LENGTH) {
        setStatus({
          valid: false,
          msg: "File content exceeds the maximum allowed size of 5 MB.",
        });

        return;
      }

      if (type === "json") {
        setJsonInput(content);
      } else {
        setSchemaInput(content);
      }

      setStatus(null);
    };

    reader.onerror = () => {
      setStatus({
        valid: false,
        msg: "An error occurred while reading the file.",
      });
    };

    reader.readAsText(file);
  };

  /**
   * Clear JSON input.
   */
  const handleClearJson = () => {
    setJsonInput("");
    setStatus(null);
  };

  /**
   * Clear schema input.
   */
  const handleClearSchema = () => {
    setSchemaInput("");
    setStatus(null);
  };

  /**
   * Reset complete validator.
   */
  const handleReset = () => {
    setJsonInput(DEFAULT_JSON);
    setSchemaInput(DEFAULT_SCHEMA);
    setStatus(null);
  };

  return (
    <div className="w-full max-w-8xl mx-auto rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm font-sans text-base">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-1 flex items-center gap-2 text-2xl font-bold text-slate-800">
            <ShieldCheck className="h-6 w-6 text-primary-theme md:h-7 md:w-7" />

            JSON Schema Validator
          </h2>

          <p className="text-sm text-slate-500 md:text-base">
            Validate JSON data against a JSON Schema using
            the Ajv validation engine.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-primary-theme"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        accept=".json,.txt,application/json,text/plain"
        ref={jsonFileInputRef}
        onChange={(event) =>
          handleFileUpload(event, "json")
        }
        className="hidden"
      />

      <input
        type="file"
        accept=".json,.txt,application/json,text/plain"
        ref={schemaFileInputRef}
        onChange={(event) =>
          handleFileUpload(event, "schema")
        }
        className="hidden"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* JSON Payload */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-600">
              <FileCode className="h-5 w-5 text-slate-500" />

              JSON Payload Data
            </label>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  jsonFileInputRef.current?.click()
                }
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-primary-theme"
                title="Upload JSON File"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Upload
                </span>
              </button>

              <button
                type="button"
                onClick={handleClearJson}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
                title="Clear JSON Input"
              >
                <Trash2 className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Clear
                </span>
              </button>
            </div>
          </div>

          <div className="h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-[#1e1e1e]">
            <CodeMirror
              value={jsonInput}
              height="380px"
              placeholder={"past or upload your json here ..."}
              theme={vscodeDark}
              extensions={[json()]}
              onChange={(value) => {
                setJsonInput(value);

                if (status) {
                  setStatus(null);
                }
              }}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                autocompletion: true,
                bracketMatching: true,
                closeBrackets: true,
              }}
              className="h-full text-sm font-mono [&_.cm-editor]:!font-mono [&_.cm-scroller]:!font-mono [&_.cm-content]:!text-sm"
            />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Maximum input size: 5 MB
          </p>
        </div>

        {/* JSON Schema */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-600">
              <Code2 className="h-5 w-5 text-slate-500" />

              JSON Schema Document
            </label>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  schemaFileInputRef.current?.click()
                }
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-primary-theme"
                title="Upload Schema File"
              >
                <Upload className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Upload
                </span>
              </button>

              <button
                type="button"
                onClick={handleClearSchema}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
                title="Clear Schema Input"
              >
                <Trash2 className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Clear
                </span>
              </button>
            </div>
          </div>

          <div className="h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-[#1e1e1e]">
            <CodeMirror
              value={schemaInput}
              height="380px"
              placeholder={"past or upload your json here ..."}
              theme={vscodeDark}
              extensions={[json()]}
              onChange={(value) => {
                setSchemaInput(value);

                if (status) {
                  setStatus(null);
                }
              }}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                autocompletion: true,
                bracketMatching: true,
                closeBrackets: true,
              }}
              className="h-full text-sm font-mono [&_.cm-editor]:!font-mono [&_.cm-scroller]:!font-mono [&_.cm-content]:!text-sm"
            />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Maximum schema size: 5 MB
          </p>
        </div>
      </div>

      {/* Validate Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleValidate}
          disabled={
            !jsonInput.trim() ||
            !schemaInput.trim() ||
            isValidating
          }
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary-theme px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary-theme/90 active:bg-primary-theme/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`h-5 w-5 ${
              isValidating ? "animate-spin" : ""
            }`}
          />

          {isValidating
            ? "Validating..."
            : "Validate Against Schema"}
        </button>
      </div>

      {/* Result */}
      {status && (
        <div
          role="alert"
          aria-live="polite"
          className={`mt-6 rounded-2xl border p-4 ${
            status.valid
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
        >
          <div className="flex items-start gap-2">
            {status.valid ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
            )}

            <div className="min-w-0">
              <p className="font-bold">
                {status.valid
                  ? "Validation Successful"
                  : "Validation Failed"}
              </p>

              <p className="mt-1 text-sm">
                {status.msg}
              </p>
            </div>
          </div>

          {status.errors &&
            status.errors.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold">
                  Validation Errors:
                </p>

                <ul className="space-y-2 pl-5 text-sm font-mono">
                  {status.errors.map((error, index) => (
                    <li
                      key={`${error}-${index}`}
                      className="break-words"
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}

      {/* Footer Information */}
      <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
        <p>
          <strong>Privacy:</strong> Validation is performed
          entirely in your browser. Your JSON data and schema
          are not sent to a server by this component.
        </p>
      </div>
    </div>
  );
}