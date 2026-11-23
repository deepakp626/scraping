// src/lib/languages.ts
import type React from "react";
import {
  Terminal,
  Play,
  SquareCode,
  Code,
  Palette,
  Database,
  FileJson,
  FileCode,
  Cpu,
  Coffee,
  Zap,
  Hammer,
  Gem,
  Hash,
  Feather,
  Layers,
  BookOpen,
  Brackets,
  FileText,
  Boxes,
  Binary,
} from "lucide-react";
import type { LanguageConfig } from "../types/editor";
import pythonSvg from "@/public/programming-languages/python.svg";

/**
 * Raw Judge0 CE Language list provided for exact mapping.
 */
export const JUDGE0_RAW_LANGUAGES = [
  { id: 45, name: "Assembly (NASM 2.14.02)" },
  { id: 46, name: "Bash (5.0.0)" },
  { id: 47, name: "Basic (FBC 1.07.1)" },
  { id: 75, name: "C (Clang 7.0.1)" },
  { id: 76, name: "C++ (Clang 7.0.1)" },
  { id: 48, name: "C (GCC 7.4.0)" },
  { id: 52, name: "C++ (GCC 7.4.0)" },
  { id: 49, name: "C (GCC 8.3.0)" },
  { id: 53, name: "C++ (GCC 8.3.0)" },
  { id: 50, name: "C (GCC 9.2.0)" },
  { id: 54, name: "C++ (GCC 9.2.0)" },
  { id: 86, name: "Clojure (1.10.1)" },
  { id: 51, name: "C# (Mono 6.6.0.161)" },
  { id: 77, name: "COBOL (GnuCOBOL 2.2)" },
  { id: 55, name: "Common Lisp (SBCL 2.0.0)" },
  { id: 56, name: "D (DMD 2.089.1)" },
  { id: 57, name: "Elixir (1.9.4)" },
  { id: 58, name: "Erlang (OTP 22.2)" },
  { id: 44, name: "Executable" },
  { id: 87, name: "F# (.NET Core SDK 3.1.202)" },
  { id: 59, name: "Fortran (GFortran 9.2.0)" },
  { id: 60, name: "Go (1.13.5)" },
  { id: 88, name: "Groovy (3.0.3)" },
  { id: 61, name: "Haskell (GHC 8.8.1)" },
  { id: 62, name: "Java (OpenJDK 13.0.1)" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  { id: 78, name: "Kotlin (1.3.70)" },
  { id: 64, name: "Lua (5.3.5)" },
  { id: 89, name: "Multi-file program" },
  { id: 79, name: "Objective-C (Clang 7.0.1)" },
  { id: 65, name: "OCaml (4.09.0)" },
  { id: 66, name: "Octave (5.1.0)" },
  { id: 67, name: "Pascal (FPC 3.0.4)" },
  { id: 85, name: "Perl (5.28.1)" },
  { id: 68, name: "PHP (7.4.1)" },
  { id: 43, name: "Plain Text" },
  { id: 69, name: "Prolog (GNU Prolog 1.4.5)" },
  { id: 70, name: "Python (2.7.17)" },
  { id: 71, name: "Python (3.8.1)" },
  { id: 80, name: "R (4.0.0)" },
  { id: 72, name: "Ruby (2.7.0)" },
  { id: 73, name: "Rust (1.40.0)" },
  { id: 81, name: "Scala (2.13.2)" },
  { id: 82, name: "SQL (SQLite 3.27.2)" },
  { id: 83, name: "Swift (5.2.3)" },
  { id: 74, name: "TypeScript (3.7.4)" },
  { id: 84, name: "Visual Basic.Net (vbnc 0.0.0.5943)" },
] as const;

/**
 * Unique primary language definitions.
 */
const PRIMARY_LANGUAGES: Record<string, LanguageConfig> = {
  // ── Python ─────────────────────────────────────────────────────────────
  python: {
    id: "python",
    name: "Python (3.8.1)",
    judge0Id: 71,
    extension: "py",
    monacoLang: "python",
    color: "#3b82f6",
    version: "3.8.1",
    isLatest: true,
    starter: `# Python 3.8.1 (Latest)
def greet(name: str) -> str:
    return f"Hello, {name}!"

# List comprehension & dict
squares = [x**2 for x in range(1, 6)]
print(greet("World"))
print("Squares:", squares)

person = {"name": "Alice", "role": "Developer"}
for key, value in person.items():
    print(f"  {key}: {value}")
`,
    info: {
      description: "Python 3.8.1 - Clean, versatile high-level language widely used for web development, scripting, data science, and AI/ML.",
      version: "3.8.1",
      tip: "Use f-strings for string interpolation: f'Hello, {name}'.",
      website: "https://python.org",
    },
  },

  python2: {
    id: "python2",
    name: "Python (2.7.17)",
    judge0Id: 70,
    extension: "py",
    monacoLang: "python",
    color: "#f59e0b",
    version: "2.7.17",
    isLatest: false,
    starter: `# Python 2.7.17 (Legacy)
print "Hello, World from Python 2.7!"

squares = [x**2 for x in range(1, 6)]
print "Squares:", squares
`,
    info: {
      description: "Legacy Python 2.7.17 runtime for backwards compatibility with legacy Python scripts.",
      version: "2.7.17",
      tip: "Print statement does not require parentheses in Python 2: print 'Hello'.",
      website: "https://python.org",
    },
  },

  // ── JavaScript / TypeScript ────────────────────────────────────────────
  javascript: {
    id: "javascript",
    name: "JavaScript (Node.js 12.14.0)",
    judge0Id: 63,
    extension: "js",
    monacoLang: "javascript",
    color: "#eab308",
    version: "Node.js 12.14.0",
    isLatest: true,
    starter: `// JavaScript (Node.js 12.14.0)
const greet = (name) => \`Hello, \${name}!\`;

const numbers = [1, 2, 3, 4, 5];
console.log(greet("World"));
console.log("Squares:", numbers.map(n => n * n));
`,
    info: {
      description: "High-performance JavaScript runtime on Node.js 12.14.0 engine.",
      version: "Node.js 12.14.0",
      tip: "Use const/let over var and template literals for string interpolation.",
      website: "https://nodejs.org",
    },
  },

  typescript: {
    id: "typescript",
    name: "TypeScript (3.7.4)",
    judge0Id: 74,
    extension: "ts",
    monacoLang: "typescript",
    color: "#2563eb",
    version: "3.7.4",
    isLatest: true,
    starter: `// TypeScript 3.7.4
interface User {
  id: number;
  name: string;
}

const greet = (user: User): string => {
  return \`Hello, \${user.name}! (ID: \${user.id})\`;
};

const user: User = { id: 1, name: "World" };
console.log(greet(user));
`,
    info: {
      description: "Typed superset of JavaScript that compiles to plain JavaScript.",
      version: "3.7.4",
      tip: "Use interfaces to enforce typed contracts across your application.",
      website: "https://typescriptlang.org",
    },
  },

  // ── C (GCC 9.2.0 is latest, GCC 8.3.0, GCC 7.4.0, Clang 7.0.1) ──────────
  c: {
    id: "c",
    name: "C (GCC 9.2.0)",
    judge0Id: 50,
    extension: "c",
    monacoLang: "c",
    color: "#6366f1",
    version: "GCC 9.2.0",
    isLatest: true,
    starter: `// C (GCC 9.2.0 - Latest)
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    int nums[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += nums[i];
    }
    printf("Sum: %d\\n", sum);
    return 0;
}
`,
    info: {
      description: "C compiled with GCC 9.2.0. Foundational low-level systems programming language.",
      version: "GCC 9.2.0",
      tip: "Remember to include <stdio.h> for printf and manage pointers carefully.",
      website: "https://en.cppreference.com",
    },
  },

  c_gcc8: {
    id: "c_gcc8",
    name: "C (GCC 8.3.0)",
    judge0Id: 49,
    extension: "c",
    monacoLang: "c",
    color: "#6366f1",
    version: "GCC 8.3.0",
    isLatest: false,
    starter: `// C (GCC 8.3.0)
#include <stdio.h>

int main(void) {
    printf("Hello, World from GCC 8.3.0!\\n");
    return 0;
}
`,
    info: {
      description: "C language compiled with GNU Compiler Collection 8.3.0.",
      version: "GCC 8.3.0",
      tip: "Standard C compiler.",
      website: "https://gcc.gnu.org",
    },
  },

  c_gcc7: {
    id: "c_gcc7",
    name: "C (GCC 7.4.0)",
    judge0Id: 48,
    extension: "c",
    monacoLang: "c",
    color: "#6366f1",
    version: "GCC 7.4.0",
    isLatest: false,
    starter: `// C (GCC 7.4.0)
#include <stdio.h>

int main(void) {
    printf("Hello, World from GCC 7.4.0!\\n");
    return 0;
}
`,
    info: {
      description: "C language compiled with GNU Compiler Collection 7.4.0.",
      version: "GCC 7.4.0",
      tip: "Standard C compiler.",
      website: "https://gcc.gnu.org",
    },
  },

  c_clang: {
    id: "c_clang",
    name: "C (Clang 7.0.1)",
    judge0Id: 75,
    extension: "c",
    monacoLang: "c",
    color: "#0284c7",
    version: "Clang 7.0.1",
    isLatest: false,
    starter: `// C (Clang 7.0.1)
#include <stdio.h>

int main(void) {
    printf("Hello, World from Clang 7.0.1!\\n");
    return 0;
}
`,
    info: {
      description: "C language compiled with LLVM Clang 7.0.1 compiler.",
      version: "Clang 7.0.1",
      tip: "LLVM-based C compiler with fast compilation.",
      website: "https://clang.llvm.org",
    },
  },

  // ── C++ (GCC 9.2.0 is latest, GCC 8.3.0, GCC 7.4.0, Clang 7.0.1) ────────
  cpp: {
    id: "cpp",
    name: "C++ (GCC 9.2.0)",
    judge0Id: 54,
    extension: "cpp",
    monacoLang: "cpp",
    color: "#7c3aed",
    version: "GCC 9.2.0",
    isLatest: true,
    starter: `// C++ (GCC 9.2.0 - Latest)
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}
`,
    info: {
      description: "C++ compiled with GCC 9.2.0 supporting C++17 modern features and STL.",
      version: "GCC 9.2.0",
      tip: "Use std::vector and modern STL algorithms instead of raw arrays.",
      website: "https://isocpp.org",
    },
  },

  cpp_gcc8: {
    id: "cpp_gcc8",
    name: "C++ (GCC 8.3.0)",
    judge0Id: 53,
    extension: "cpp",
    monacoLang: "cpp",
    color: "#8b5cf6",
    version: "GCC 8.3.0",
    isLatest: false,
    starter: `// C++ (GCC 8.3.0)
#include <iostream>

int main() {
    std::cout << "Hello, World from GCC 8.3.0 C++!" << std::endl;
    return 0;
}
`,
    info: {
      description: "C++ compiled with GNU Compiler Collection 8.3.0.",
      version: "GCC 8.3.0",
      tip: "Supports modern C++ features.",
      website: "https://gcc.gnu.org",
    },
  },

  cpp_gcc7: {
    id: "cpp_gcc7",
    name: "C++ (GCC 7.4.0)",
    judge0Id: 52,
    extension: "cpp",
    monacoLang: "cpp",
    color: "#8b5cf6",
    version: "GCC 7.4.0",
    isLatest: false,
    starter: `// C++ (GCC 7.4.0)
#include <iostream>

int main() {
    std::cout << "Hello, World from GCC 7.4.0 C++!" << std::endl;
    return 0;
}
`,
    info: {
      description: "C++ compiled with GNU Compiler Collection 7.4.0.",
      version: "GCC 7.4.0",
      tip: "Supports standard C++14/17.",
      website: "https://gcc.gnu.org",
    },
  },

  cpp_clang: {
    id: "cpp_clang",
    name: "C++ (Clang 7.0.1)",
    judge0Id: 76,
    extension: "cpp",
    monacoLang: "cpp",
    color: "#7c3aed",
    version: "Clang 7.0.1",
    isLatest: false,
    starter: `// C++ (Clang 7.0.1)
#include <iostream>

int main() {
    std::cout << "Hello, World from Clang 7.0.1 C++!" << std::endl;
    return 0;
}
`,
    info: {
      description: "C++ compiled with LLVM Clang 7.0.1 frontend.",
      version: "Clang 7.0.1",
      tip: "Fast LLVM diagnostic compiler.",
      website: "https://clang.llvm.org",
    },
  },

  // ── Assembly ───────────────────────────────────────────────────────────
  assembly: {
    id: "assembly",
    name: "Assembly (NASM 2.14.02)",
    judge0Id: 45,
    extension: "asm",
    monacoLang: "mips",
    color: "#64748b",
    version: "NASM 2.14.02",
    isLatest: true,
    starter: `section .data
    msg db "Hello, World!", 10
    len equ $ - msg

section .text
    global _start

_start:
    ; sys_write (eax=4, ebx=1, ecx=msg, edx=len)
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, len
    int 0x80

    ; sys_exit (eax=1, ebx=0)
    mov eax, 1
    xor ebx, ebx
    int 0x80
`,
    info: {
      description: "Netwide Assembler (NASM) x86 assembly language runtime.",
      version: "NASM 2.14.02",
      tip: "Uses 32-bit Linux int 0x80 system calls for I/O operations.",
      website: "https://nasm.us",
    },
  },

  // ── Bash ───────────────────────────────────────────────────────────────
  bash: {
    id: "bash",
    name: "Bash (5.0.0)",
    judge0Id: 46,
    extension: "sh",
    monacoLang: "shell",
    color: "#22c55e",
    version: "5.0.0",
    isLatest: true,
    starter: `#!/bin/bash
# Bash 5.0.0
echo "Hello, World!"

# Loop calculation
for ((i=1; i<=5; i++)); do
    echo "  $i squared = $((i * i))"
done
`,
    info: {
      description: "GNU Bourne Again Shell scripting environment.",
      version: "5.0.0",
      tip: "Use $(( ... )) for native integer arithmetic in Bash.",
      website: "https://gnu.org/software/bash",
    },
  },

  // ── Basic ──────────────────────────────────────────────────────────────
  basic: {
    id: "basic",
    name: "Basic (FBC 1.07.1)",
    judge0Id: 47,
    extension: "bas",
    monacoLang: "vb",
    color: "#0284c7",
    version: "FBC 1.07.1",
    isLatest: true,
    starter: `' FreeBASIC (FBC 1.07.1)
Print "Hello, World!"

Dim As Integer i, sum = 0
For i = 1 To 5
    sum += i * i
Next i

Print "Sum of squares (1..5): "; sum
`,
    info: {
      description: "FreeBASIC high-level syntax compiler compatible with QuickBASIC.",
      version: "FBC 1.07.1",
      tip: "Use Dim As Integer for typed variable declarations.",
      website: "https://freebasic.net",
    },
  },

  // ── Clojure ────────────────────────────────────────────────────────────
  clojure: {
    id: "clojure",
    name: "Clojure (1.10.1)",
    judge0Id: 86,
    extension: "clj",
    monacoLang: "clojure",
    color: "#5881d8",
    version: "1.10.1",
    isLatest: true,
    starter: `; Clojure 1.10.1
(defn greet [name]
  (str "Hello, " name "!"))

(println (greet "World"))

(def numbers [1 2 3 4 5])
(println "Squares:" (map #( * % % ) numbers))
`,
    info: {
      description: "Dynamic, general-purpose functional programming language for the JVM.",
      version: "1.10.1",
      tip: "Parentheses wrap function invocations: (fn arg1 arg2).",
      website: "https://clojure.org",
    },
  },

  // ── C# ─────────────────────────────────────────────────────────────────
  csharp: {
    id: "csharp",
    name: "C# (Mono 6.6.0.161)",
    judge0Id: 51,
    extension: "cs",
    monacoLang: "csharp",
    color: "#8b5cf6",
    version: "Mono 6.6.0.161",
    isLatest: true,
    starter: `// C# (Mono 6.6.0.161)
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        var nums = new List<int> { 1, 2, 3, 4, 5 };
        Console.WriteLine("Sum: " + nums.Sum());
    }
}
`,
    info: {
      description: "Modern, object-oriented language for .NET running on Mono runtime.",
      version: "Mono 6.6.0.161",
      tip: "Use LINQ methods like .Select() and .Where() for concise collection processing.",
      website: "https://mono-project.com",
    },
  },

  // ── COBOL ──────────────────────────────────────────────────────────────
  cobol: {
    id: "cobol",
    name: "COBOL (GnuCOBOL 2.2)",
    judge0Id: 77,
    extension: "cob",
    monacoLang: "plaintext",
    color: "#1e3a8a",
    version: "GnuCOBOL 2.2",
    isLatest: true,
    starter: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
           DISPLAY 'Hello, World!'.
           STOP RUN.
`,
    info: {
      description: "GnuCOBOL enterprise business data processing language.",
      version: "GnuCOBOL 2.2",
      tip: "COBOL programs require standard DIVISION layout headers.",
      website: "https://gnucobol.sourceforge.io",
    },
  },

  // ── Common Lisp ────────────────────────────────────────────────────────
  lisp: {
    id: "lisp",
    name: "Common Lisp (SBCL 2.0.0)",
    judge0Id: 55,
    extension: "lisp",
    monacoLang: "scheme",
    color: "#475569",
    version: "SBCL 2.0.0",
    isLatest: true,
    starter: `;; Common Lisp (SBCL 2.0.0)
(format t "Hello, World!~%")

(defun square (x)
  (* x x))

(format t "Square of 5: ~a~%" (square 5))
`,
    info: {
      description: "Steel Bank Common Lisp high-performance Common Lisp compiler.",
      version: "SBCL 2.0.0",
      tip: "(format t \"...~%\") prints text with a trailing newline.",
      website: "https://sbcl.org",
    },
  },

  // ── D ──────────────────────────────────────────────────────────────────
  d: {
    id: "d",
    name: "D (DMD 2.089.1)",
    judge0Id: 56,
    extension: "d",
    monacoLang: "c",
    color: "#b91c1c",
    version: "DMD 2.089.1",
    isLatest: true,
    starter: `// D (DMD 2.089.1)
import std.stdio;

void main() {
    writeln("Hello, World!");
    int[] nums = [1, 2, 3, 4, 5];
    foreach (n; nums) {
        writefln("  %d squared is %d", n, n * n);
    }
}
`,
    info: {
      description: "General-purpose systems programming language with C++ power and clean syntax.",
      version: "DMD 2.089.1",
      tip: "Use std.stdio writeln and writefln for formatted output.",
      website: "https://dlang.org",
    },
  },

  // ── Elixir ─────────────────────────────────────────────────────────────
  elixir: {
    id: "elixir",
    name: "Elixir (1.9.4)",
    judge0Id: 57,
    extension: "ex",
    monacoLang: "elixir",
    color: "#6e3f89",
    version: "1.9.4",
    isLatest: true,
    starter: `# Elixir 1.9.4
IO.puts "Hello, World!"

squares = 1..5 |> Enum.map(&(&1 * &1))
IO.inspect squares, label: "Squares"
`,
    info: {
      description: "Concurrent functional language built on the Erlang BEAM virtual machine.",
      version: "1.9.4",
      tip: "Use the pipe operator |> to chain data transformations cleanly.",
      website: "https://elixir-lang.org",
    },
  },

  // ── Erlang ─────────────────────────────────────────────────────────────
  erlang: {
    id: "erlang",
    name: "Erlang (OTP 22.2)",
    judge0Id: 58,
    extension: "erl",
    monacoLang: "plaintext",
    color: "#a90533",
    version: "OTP 22.2",
    isLatest: true,
    starter: `% Erlang OTP 22.2
-module(main).
-export([start/0]).

start() ->
    io:format("Hello, World!~n"),
    Nums = [1, 2, 3, 4, 5],
    Squares = lists:map(fun(X) -> X * X end, Nums),
    io:format("Squares: ~p~n", [Squares]).
`,
    info: {
      description: "Battle-tested functional runtime powering distributed, fault-tolerant telecom systems.",
      version: "OTP 22.2",
      tip: "Module name must match execution entry; finish statements with a period.",
      website: "https://erlang.org",
    },
  },

  // ── Executable ─────────────────────────────────────────────────────────
  executable: {
    id: "executable",
    name: "Executable",
    judge0Id: 44,
    extension: "exe",
    monacoLang: "plaintext",
    color: "#475569",
    version: "Binary",
    isLatest: true,
    starter: `#!/bin/sh
# Executable runner
echo "Executable script runner active."
`,
    info: {
      description: "Direct executable binary runner sandbox in Judge0 CE.",
      version: "Binary",
      tip: "Runs uploaded or generated executable binaries.",
      website: "https://judge0.com",
    },
  },

  // ── F# ─────────────────────────────────────────────────────────────────
  fsharp: {
    id: "fsharp",
    name: "F# (.NET Core SDK 3.1.202)",
    judge0Id: 87,
    extension: "fs",
    monacoLang: "fsharp",
    color: "#30b9db",
    version: ".NET Core 3.1.202",
    isLatest: true,
    starter: `// F# (.NET Core SDK 3.1.202)
printfn "Hello, World!"

let square x = x * x
let numbers = [1 .. 5]
let squares = List.map square numbers

printfn "Squares: %A" squares
`,
    info: {
      description: "Universal programming language for writing succinct, robust, and performant code on .NET.",
      version: ".NET Core 3.1.202",
      tip: "Use %A in printfn to format any structured data or collections.",
      website: "https://fsharp.org",
    },
  },

  // ── Fortran ────────────────────────────────────────────────────────────
  fortran: {
    id: "fortran",
    name: "Fortran (GFortran 9.2.0)",
    judge0Id: 59,
    extension: "f90",
    monacoLang: "fortran",
    color: "#734f96",
    version: "GFortran 9.2.0",
    isLatest: true,
    starter: `! Fortran 90 (GFortran 9.2.0)
program hello
    implicit none
    integer :: i, total
    print *, "Hello, World!"

    total = 0
    do i = 1, 5
        total = total + i * i
    end do
    print *, "Sum of squares:", total
end program hello
`,
    info: {
      description: "High-performance numerical and scientific computing language.",
      version: "GFortran 9.2.0",
      tip: "Always declare 'implicit none' to catch unassigned type bugs.",
      website: "https://fortran-lang.org",
    },
  },

  // ── Go ─────────────────────────────────────────────────────────────────
  go: {
    id: "go",
    name: "Go (1.13.5)",
    judge0Id: 60,
    extension: "go",
    monacoLang: "go",
    color: "#06b6d4",
    version: "1.13.5",
    isLatest: true,
    starter: `// Go 1.13.5
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    nums := []int{1, 2, 3, 4, 5}
    sum := 0
    for _, n := range nums {
        sum += n * n
    }
    fmt.Printf("Sum of squares: %d\\n", sum)
}
`,
    info: {
      description: "Fast, concurrent, statically typed language developed by Google.",
      version: "1.13.5",
      tip: "Use := for short variable declarations and range for iterating slices.",
      website: "https://go.dev",
    },
  },

  // ── Groovy ─────────────────────────────────────────────────────────────
  groovy: {
    id: "groovy",
    name: "Groovy (3.0.3)",
    judge0Id: 88,
    extension: "groovy",
    monacoLang: "groovy",
    color: "#4298b8",
    version: "3.0.3",
    isLatest: true,
    starter: `// Groovy 3.0.3
println "Hello, World!"

def numbers = [1, 2, 3, 4, 5]
def squares = numbers.collect { it * it }
println "Squares: " + squares
`,
    info: {
      description: "Powerful, multi-faceted language for the Java platform with concise syntax.",
      version: "3.0.3",
      tip: "Use .collect { it * 2 } for mapping operations over collections.",
      website: "https://groovy-lang.org",
    },
  },

  // ── Haskell ────────────────────────────────────────────────────────────
  haskell: {
    id: "haskell",
    name: "Haskell (GHC 8.8.1)",
    judge0Id: 61,
    extension: "hs",
    monacoLang: "haskell",
    color: "#8b5cf6",
    version: "GHC 8.8.1",
    isLatest: true,
    starter: `-- Haskell (GHC 8.8.1)
module Main where

factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

main :: IO ()
main = do
    putStrLn "Hello, World!"
    putStrLn $ "Factorial 5: " ++ show (factorial 5)
`,
    info: {
      description: "Purely functional programming language with strong static typing and lazy evaluation.",
      version: "GHC 8.8.1",
      tip: "Use pattern matching for recursive mathematical functions.",
      website: "https://haskell.org",
    },
  },

  // ── Java ───────────────────────────────────────────────────────────────
  java: {
    id: "java",
    name: "Java (OpenJDK 13.0.1)",
    judge0Id: 62,
    extension: "java",
    monacoLang: "java",
    color: "#f97316",
    version: "OpenJDK 13.0.1",
    isLatest: true,
    starter: `// Java (OpenJDK 13.0.1)
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        int sum = nums.stream().mapToInt(n -> n * n).sum();
        System.out.println("Sum of squares: " + sum);
    }
}
`,
    info: {
      description: "Popular object-oriented language running on OpenJDK 13.0.1 virtual machine.",
      version: "OpenJDK 13.0.1",
      tip: "Class name must be Main for the Judge0 sandbox entry point.",
      website: "https://openjdk.org",
    },
  },

  // ── Kotlin ─────────────────────────────────────────────────────────────
  kotlin: {
    id: "kotlin",
    name: "Kotlin (1.3.70)",
    judge0Id: 78,
    extension: "kt",
    monacoLang: "kotlin",
    color: "#a855f7",
    version: "1.3.70",
    isLatest: true,
    starter: `// Kotlin 1.3.70
fun main() {
    println("Hello, World!")
    val numbers = listOf(1, 2, 3, 4, 5)
    val squares = numbers.map { it * it }
    println("Squares: $squares")
}
`,
    info: {
      description: "Modern JVM language, fully interoperable with Java, designed by JetBrains.",
      version: "1.3.70",
      tip: "String templates allow inline interpolation: \"Value: $variable\".",
      website: "https://kotlinlang.org",
    },
  },

  // ── Lua ────────────────────────────────────────────────────────────────
  lua: {
    id: "lua",
    name: "Lua (5.3.5)",
    judge0Id: 64,
    extension: "lua",
    monacoLang: "lua",
    color: "#3b82f6",
    version: "5.3.5",
    isLatest: true,
    starter: `-- Lua 5.3.5
print("Hello, World!")

local nums = {1, 2, 3, 4, 5}
local sum = 0
for i = 1, #nums do
    sum = sum + (nums[i] * nums[i])
end
print("Sum of squares: " .. sum)
`,
    info: {
      description: "Lightweight, embeddable scripting language used across game engines and systems.",
      version: "5.3.5",
      tip: "Lua array indexing starts at 1, and .. is the string concatenation operator.",
      website: "https://lua.org",
    },
  },

  // ── Multi-file program ─────────────────────────────────────────────────
  multifile: {
    id: "multifile",
    name: "Multi-file program",
    judge0Id: 89,
    extension: "zip",
    monacoLang: "plaintext",
    color: "#64748b",
    version: "Multi-file",
    isLatest: true,
    starter: `# Multi-file program support in Judge0
# Submit zip or multipart code bundle
`,
    info: {
      description: "Execution mode for multi-file code packages in Judge0 CE.",
      version: "Multi-file",
      tip: "Bundle dependencies or multiple source files for compilation.",
      website: "https://judge0.com",
    },
  },

  // ── Objective-C ────────────────────────────────────────────────────────
  objectivec: {
    id: "objectivec",
    name: "Objective-C (Clang 7.0.1)",
    judge0Id: 79,
    extension: "m",
    monacoLang: "objective-c",
    color: "#438eff",
    version: "Clang 7.0.1",
    isLatest: true,
    starter: `// Objective-C (Clang 7.0.1)
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, World!");
        NSArray *nums = @[@1, @2, @3, @4, @5];
        NSLog(@"Count: %lu", (unsigned long)[nums count]);
    }
    return 0;
}
`,
    info: {
      description: "General-purpose, object-oriented language that adds Smalltalk-style messaging to C.",
      version: "Clang 7.0.1",
      tip: "Use @autoreleasepool to handle automatic memory draining in Foundation apps.",
      website: "https://developer.apple.com",
    },
  },

  // ── OCaml ──────────────────────────────────────────────────────────────
  ocaml: {
    id: "ocaml",
    name: "OCaml (4.09.0)",
    judge0Id: 65,
    extension: "ml",
    monacoLang: "plaintext",
    color: "#ea6e1d",
    version: "4.09.0",
    isLatest: true,
    starter: `(* OCaml 4.09.0 *)
let () =
  print_endline "Hello, World!";
  let nums = [1; 2; 3; 4; 5] in
  let squares = List.map (fun x -> x * x) nums in
  List.iter (fun x -> Printf.printf "%d " x) squares;
  print_newline ()
`,
    info: {
      description: "General-purpose industrial-strength functional language with type inference.",
      version: "4.09.0",
      tip: "Use List.map with anonymous function (fun x -> ...) for transformations.",
      website: "https://ocaml.org",
    },
  },

  // ── Octave ─────────────────────────────────────────────────────────────
  octave: {
    id: "octave",
    name: "Octave (5.1.0)",
    judge0Id: 66,
    extension: "m",
    monacoLang: "matlab",
    color: "#08579e",
    version: "5.1.0",
    isLatest: true,
    starter: `% GNU Octave 5.1.0
disp("Hello, World!");

A = [1, 2; 3, 4];
disp("Matrix A:");
disp(A);
disp("Determinant:");
disp(det(A));
`,
    info: {
      description: "High-level language primarily intended for numerical computations, mostly compatible with MATLAB.",
      version: "5.1.0",
      tip: "Use disp() to print variables and matrices directly to console.",
      website: "https://gnu.org/software/octave",
    },
  },

  // ── Pascal ─────────────────────────────────────────────────────────────
  pascal: {
    id: "pascal",
    name: "Pascal (FPC 3.0.4)",
    judge0Id: 67,
    extension: "pas",
    monacoLang: "pascal",
    color: "#b91c1c",
    version: "FPC 3.0.4",
    isLatest: true,
    starter: `// Pascal (FPC 3.0.4)
program HelloWorld;
var
  i, sum: integer;
begin
  writeln('Hello, World!');
  sum := 0;
  for i := 1 to 5 do
    sum := sum + (i * i);
  writeln('Sum of squares: ', sum);
end.
`,
    info: {
      description: "Free Pascal Compiler (FPC 3.0.4) structured procedural language.",
      version: "FPC 3.0.4",
      tip: "Statements are separated by semicolons and programs end with 'end.'.",
      website: "https://freepascal.org",
    },
  },

  // ── Perl ───────────────────────────────────────────────────────────────
  perl: {
    id: "perl",
    name: "Perl (5.28.1)",
    judge0Id: 85,
    extension: "pl",
    monacoLang: "perl",
    color: "#2563eb",
    version: "5.28.1",
    isLatest: true,
    starter: `#!/usr/bin/perl
# Perl 5.28.1
use strict;
use warnings;

print "Hello, World!\\n";

my @nums = (1..5);
my @squares = map { $_ ** 2 } @nums;
print "Squares: @squares\\n";
`,
    info: {
      description: "High-level, interpreted scripting language famous for regex and text processing.",
      version: "5.28.1",
      tip: "Always enable 'use strict;' and 'use warnings;' in modern Perl.",
      website: "https://perl.org",
    },
  },

  // ── PHP ────────────────────────────────────────────────────────────────
  php: {
    id: "php",
    name: "PHP (7.4.1)",
    judge0Id: 68,
    extension: "php",
    monacoLang: "php",
    color: "#818cf8",
    version: "7.4.1",
    isLatest: true,
    starter: `<?php
// PHP 7.4.1
echo "Hello, World!\\n";

$numbers = range(1, 5);
$squares = array_map(fn($n) => $n ** 2, $numbers);
echo "Squares: " . implode(", ", $squares) . "\\n";
`,
    info: {
      description: "Popular general-purpose scripting language that is especially suited to web development.",
      version: "7.4.1",
      tip: "PHP 7.4 introduced arrow functions: fn($n) => $n * 2.",
      website: "https://php.net",
    },
  },

  // ── Plain Text ─────────────────────────────────────────────────────────
  plaintext: {
    id: "plaintext",
    name: "Plain Text",
    judge0Id: 43,
    extension: "txt",
    monacoLang: "plaintext",
    color: "#64748b",
    version: "Standard",
    isLatest: true,
    starter: `Plain Text Document
You can type, format, and run raw text output here.
`,
    info: {
      description: "Unformatted plain text data stream.",
      version: "Standard",
      tip: "Useful for input data files and plain text logs.",
      website: "https://en.wikipedia.org/wiki/Plain_text",
    },
  },

  // ── Prolog ─────────────────────────────────────────────────────────────
  prolog: {
    id: "prolog",
    name: "Prolog (GNU Prolog 1.4.5)",
    judge0Id: 69,
    extension: "pro",
    monacoLang: "plaintext",
    color: "#c0392b",
    version: "GNU Prolog 1.4.5",
    isLatest: true,
    starter: `% Prolog (GNU Prolog 1.4.5)
likes(alice, pizza).
likes(bob, sushi).

:- initialization(main).
main :-
    write('Hello, World!'), nl,
    likes(alice, X),
    write('Alice likes: '), write(X), nl,
    halt.
`,
    info: {
      description: "Logic programming language associated with AI and computational linguistics.",
      version: "GNU Prolog 1.4.5",
      tip: "Queries and facts end with a period. Variables must start with a capital letter.",
      website: "http://gprolog.org",
    },
  },

  // ── R ──────────────────────────────────────────────────────────────────
  r: {
    id: "r",
    name: "R (4.0.0)",
    judge0Id: 80,
    extension: "r",
    monacoLang: "r",
    color: "#2563eb",
    version: "4.0.0",
    isLatest: true,
    starter: `# R 4.0.0
cat("Hello, World!\\n")

x <- c(1, 2, 3, 4, 5)
cat("Mean:", mean(x), "\\n")
cat("Squares:", x^2, "\\n")
`,
    info: {
      description: "Language and environment for statistical computing and graphics.",
      version: "4.0.0",
      tip: "Vectors are vectorized natively: x^2 calculates squares for all elements.",
      website: "https://r-project.org",
    },
  },

  // ── Ruby ───────────────────────────────────────────────────────────────
  ruby: {
    id: "ruby",
    name: "Ruby (2.7.0)",
    judge0Id: 72,
    extension: "rb",
    monacoLang: "ruby",
    color: "#ef4444",
    version: "2.7.0",
    isLatest: true,
    starter: `# Ruby 2.7.0
puts "Hello, World!"

numbers = (1..5).to_a
squares = numbers.map { |n| n ** 2 }
puts "Squares: #{squares}"
`,
    info: {
      description: "Dynamic, open-source programming language with a focus on simplicity and productivity.",
      version: "2.7.0",
      tip: "Everything in Ruby is an object. Use #{variable} for string interpolation.",
      website: "https://ruby-lang.org",
    },
  },

  // ── Rust ───────────────────────────────────────────────────────────────
  rust: {
    id: "rust",
    name: "Rust (1.40.0)",
    judge0Id: 73,
    extension: "rs",
    monacoLang: "rust",
    color: "#f97316",
    version: "1.40.0",
    isLatest: true,
    starter: `// Rust 1.40.0
fn main() {
    println!("Hello, World!");
    let nums: Vec<i32> = (1..=5).collect();
    let sum: i32 = nums.iter().map(|&x| x * x).sum();
    println!("Sum of squares: {}", sum);
}
`,
    info: {
      description: "Systems programming language focused on safety, speed, and memory safety without GC.",
      version: "1.40.0",
      tip: "println! is a macro. Use .iter() for borrowing and .sum() for summation.",
      website: "https://rust-lang.org",
    },
  },

  // ── Scala ──────────────────────────────────────────────────────────────
  scala: {
    id: "scala",
    name: "Scala (2.13.2)",
    judge0Id: 81,
    extension: "scala",
    monacoLang: "scala",
    color: "#ef4444",
    version: "2.13.2",
    isLatest: true,
    starter: `// Scala 2.13.2
object Main {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    val numbers = (1 to 5).toList
    val squares = numbers.map(x => x * x)
    println(s"Squares: $squares")
  }
}
`,
    info: {
      description: "Scala combines object-oriented and functional programming in one concise high-level language on the JVM.",
      version: "2.13.2",
      tip: "Use 'val' for immutable bindings and string interpolator s\"...\".",
      website: "https://scala-lang.org",
    },
  },

  // ── SQL ────────────────────────────────────────────────────────────────
  sql: {
    id: "sql",
    name: "SQL (SQLite 3.27.2)",
    judge0Id: 82,
    extension: "sql",
    monacoLang: "sql",
    color: "#f59e0b",
    version: "SQLite 3.27.2",
    isLatest: true,
    starter: `-- SQLite 3.27.2
CREATE TABLE demo (id INTEGER PRIMARY KEY, item TEXT, count INT);
INSERT INTO demo (item, count) VALUES ('Apples', 10), ('Bananas', 25), ('Cherries', 40);

SELECT item, count FROM demo WHERE count >= 20 ORDER BY count DESC;
`,
    info: {
      description: "Relational database SQL executed in SQLite 3.27.2 engine.",
      version: "SQLite 3.27.2",
      tip: "Use standard SQL queries: SELECT, INSERT, CREATE TABLE.",
      website: "https://sqlite.org",
    },
  },

  // ── Swift ──────────────────────────────────────────────────────────────
  swift: {
    id: "swift",
    name: "Swift (5.2.3)",
    judge0Id: 83,
    extension: "swift",
    monacoLang: "swift",
    color: "#f97316",
    version: "5.2.3",
    isLatest: true,
    starter: `// Swift 5.2.3
print("Hello, World!")

let numbers = [1, 2, 3, 4, 5]
let squares = numbers.map { $0 * $0 }
print("Squares: \\(squares)")
`,
    info: {
      description: "Apple's powerful, intuitive programming language for iOS, macOS, and systems.",
      version: "5.2.3",
      tip: "Use let for constants and \\(expression) for string interpolation.",
      website: "https://swift.org",
    },
  },

  // ── Visual Basic.NET ───────────────────────────────────────────────────
  vbnet: {
    id: "vbnet",
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
    judge0Id: 84,
    extension: "vb",
    monacoLang: "vb",
    color: "#2563eb",
    version: "vbnc 0.0.0.5943",
    isLatest: true,
    starter: `' Visual Basic.Net (vbnc 0.0.0.5943)
Imports System

Module Program
    Sub Main()
        Console.WriteLine("Hello, World!")
        Dim nums() As Integer = {1, 2, 3, 4, 5}
        For Each n As Integer In nums
            Console.WriteLine("  " & n & " squared = " & (n * n))
        Next
    End Sub
End Module
`,
    info: {
      description: "Visual Basic .NET compiled with Mono vbnc compiler.",
      version: "vbnc 0.0.0.5943",
      tip: "Strings are concatenated with the '&' operator.",
      website: "https://learn.microsoft.com/dotnet/visual-basic",
    },
  },

  // ── Web & Data Languages ───────────────────────────────────────────────
  html: {
    id: "html",
    name: "HTML5",
    judge0Id: 96,
    extension: "html",
    monacoLang: "html",
    color: "#e34f26",
    version: "HTML5",
    isLatest: true,
    starter: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML5 Playground</title>
</head>
<body>
  <h1>Hello from HTML5!</h1>
  <p>Live interactive web markup.</p>
</body>
</html>
`,
    info: {
      description: "HyperText Markup Language standard for creating modern web structures.",
      version: "HTML5",
      tip: "Use semantic tags for SEO and accessibility.",
      website: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
  },

  css: {
    id: "css",
    name: "CSS3",
    judge0Id: 97,
    extension: "css",
    monacoLang: "css",
    color: "#264de4",
    version: "CSS3",
    isLatest: true,
    starter: `/* Modern CSS3 Styling */
:root {
  --primary: #3b82f6;
  --bg: #ffffff;
}

body {
  font-family: system-ui, sans-serif;
  background: var(--bg);
  color: #1e293b;
}
`,
    info: {
      description: "Cascading Style Sheets powering modern responsive interfaces.",
      version: "CSS3",
      tip: "Use CSS variables for theme token management.",
      website: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
  },

  json: {
    id: "json",
    name: "JSON",
    judge0Id: 98,
    extension: "json",
    monacoLang: "json",
    color: "#0f172a",
    version: "ECMA-404",
    isLatest: true,
    starter: `{
  "name": "Coding Playground",
  "version": "2.0.0",
  "languagesCount": 47,
  "supported": true
}
`,
    info: {
      description: "JavaScript Object Notation universal data-interchange format.",
      version: "ECMA-404",
      tip: "Keys must always be wrapped in double quotes.",
      website: "https://json.org",
    },
  },

  xml: {
    id: "xml",
    name: "XML",
    judge0Id: 99,
    extension: "xml",
    monacoLang: "xml",
    color: "#e44d26",
    version: "1.0",
    isLatest: true,
    starter: `<?xml version="1.0" encoding="UTF-8"?>
<application>
  <name>Coding Playground</name>
  <version>2.0.0</version>
</application>
`,
    info: {
      description: "Extensible Markup Language for hierarchical data and configurations.",
      version: "1.0",
      tip: "Ensure all tags are properly closed.",
      website: "https://w3.org/XML",
    },
  },

  yaml: {
    id: "yaml",
    name: "YAML",
    judge0Id: 100,
    extension: "yaml",
    monacoLang: "yaml",
    color: "#cb171e",
    version: "1.2",
    isLatest: true,
    starter: `# YAML Configuration
version: "3.8"
services:
  app:
    image: node:18
    ports:
      - "3000:3000"
`,
    info: {
      description: "Human-friendly data serialization standard commonly used in CI/CD and Docker.",
      version: "1.2",
      tip: "Indentation must use spaces, never tabs.",
      website: "https://yaml.org",
    },
  },

  markdown: {
    id: "markdown",
    name: "Markdown",
    judge0Id: 101,
    extension: "md",
    monacoLang: "markdown",
    color: "#083fa1",
    version: "GFM",
    isLatest: true,
    starter: `# Markdown Live Document

Welcome to the **Monaco Online Code Runner**.

- [x] 47 Judge0 Compilers & Runtimes
- [x] Latest Version Badges & Filter
- [x] Syntax Highlighting
`,
    info: {
      description: "Lightweight formatting syntax for documentation and notes.",
      version: "GFM",
      tip: "Use # for titles and - for list items.",
      website: "https://commonmark.org",
    },
  },
};

// Helper to resolve icon component for any language ID
export function getLanguageIcon(id: string): React.ComponentType<{ className?: string; style?: React.CSSProperties }> {
  const map: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    python: Terminal,
    python2: Terminal,
    javascript: Play,
    typescript: SquareCode,
    html: Code,
    css: Palette,
    sql: Database,
    json: FileJson,
    xml: FileCode,
    cpp: Cpu,
    cpp_gcc8: Cpu,
    cpp_gcc7: Cpu,
    cpp_clang: Cpu,
    c: Cpu,
    c_gcc8: Cpu,
    c_gcc7: Cpu,
    c_clang: Cpu,
    csharp: Hash,
    java: Coffee,
    go: Zap,
    rust: Hammer,
    php: FileCode,
    ruby: Gem,
    swift: Feather,
    kotlin: Layers,
    markdown: BookOpen,
    bash: Terminal,
    yaml: Brackets,
    r: FileText,
    lua: Boxes,
    scala: Layers,
    perl: FileCode,
    assembly: Binary,
    basic: FileCode,
    clojure: Brackets,
    cobol: FileText,
    lisp: Brackets,
    d: Cpu,
    elixir: Feather,
    erlang: Feather,
    executable: Terminal,
    fsharp: SquareCode,
    fortran: FileCode,
    groovy: Coffee,
    haskell: Brackets,
    multifile: Boxes,
    objectivec: Cpu,
    ocaml: Feather,
    octave: FileText,
    pascal: FileCode,
    plaintext: FileText,
    prolog: FileCode,
    vbnet: FileCode,
  };
  return map[id] || FileCode;
}

// Automatically assign icons and images to primary language configs
for (const key in PRIMARY_LANGUAGES) {
  PRIMARY_LANGUAGES[key].icon = getLanguageIcon(key);
  if (!PRIMARY_LANGUAGES[key].image) {
    PRIMARY_LANGUAGES[key].image = pythonSvg.src || "/programming-languages/python.svg";
  }
}

/**
 * Global lookup table of all languages and their aliases (slugs and numeric IDs).
 */
export const LANGUAGES: Record<string, LanguageConfig> = { ...PRIMARY_LANGUAGES };

// Add numeric Judge0 ID aliases and compiler aliases
for (const lang of Object.values(PRIMARY_LANGUAGES)) {
  LANGUAGES[String(lang.judge0Id)] = lang;
}

// Additional specific convenience aliases
LANGUAGES["c_gcc9"] = PRIMARY_LANGUAGES.c;
LANGUAGES["cpp_gcc9"] = PRIMARY_LANGUAGES.cpp;
LANGUAGES["python3"] = PRIMARY_LANGUAGES.python;

/**
 * Unique list of all available languages for UI lists.
 */
export const LANGUAGE_LIST: LanguageConfig[] = Object.values(PRIMARY_LANGUAGES);

/**
 * Filtered list of only the latest version of each language family.
 */
export const LATEST_LANGUAGE_LIST: LanguageConfig[] = LANGUAGE_LIST.filter(
  (lang) => lang.isLatest !== false
);

/**
 * Getter with fallback support.
 */
export function getLanguage(id: string | number): LanguageConfig | undefined {
  return LANGUAGES[String(id)];
}
