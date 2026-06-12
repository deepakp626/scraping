// src/lib/languages.ts
import type { LanguageConfig } from "../types/editor";

export const LANGUAGES: Record<string, LanguageConfig> = {
  python: {
    id: "python",
    name: "Python",
    judge0Id: 71,
    extension: "py",
    monacoLang: "python",
    color: "#3b82f6",
    starter: `# Python 3.12
def greet(name: str) -> str:
    return f"Hello, {name}!"

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(greet("World"))
print("Squares:", squares)

# Dictionary operations
person = {"name": "Alice", "age": 30}
for key, value in person.items():
    print(f"  {key}: {value}")
`,
    info: {
      description:
        "General-purpose, high-level language famous for its clean syntax. Excellent for data science, AI/ML, scripting, and web backends.",
      version: "3.12",
      tip: 'Use f-strings for formatting: f"Hello, {name}". List comprehensions for concise loops.',
      website: "https://python.org",
    },
  },

  javascript: {
    id: "javascript",
    name: "JavaScript",
    judge0Id: 63,
    extension: "js",
    monacoLang: "javascript",
    color: "#eab308",
    starter: `// JavaScript (Node.js 20)
const greet = (name) => \`Hello, \${name}!\`;

// Async/await example
const fetchData = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 100);
  });
};

(async () => {
  console.log(greet("World"));
  const data = await fetchData();
  console.log("Data:", data.map(x => x ** 2));
  
  // Destructuring
  const { a = 10, b = 20 } = {};
  console.log(\`a=\${a}, b=\${b}\`);
})();
`,
    info: {
      description:
        "The language of the web — runs in browsers and Node.js. Supports async/await, modules, and modern ES2024 features.",
      version: "Node.js 20 LTS",
      tip: "Use const/let instead of var. Optional chaining: obj?.prop. Nullish coalescing: val ?? default.",
      website: "https://nodejs.org",
    },
  },

  typescript: {
    id: "typescript",
    name: "TypeScript",
    judge0Id: 74,
    extension: "ts",
    monacoLang: "typescript",
    color: "#2563eb",
    starter: `// TypeScript 5.4
interface User {
  id: number;
  name: string;
  email: string;
}

const greet = (user: User): string => {
  return \`Hello, \${user.name}! (ID: \${user.id})\`;
};

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const alice: User = { id: 1, name: "Alice", email: "alice@example.com" };
console.log(greet(alice));
console.log(identity<number>(42));
console.log(identity<string>("TypeScript rocks!"));
`,
    info: {
      description:
        "JavaScript with static types. Compiles to JS. Catches errors at compile-time. Industry standard for large React/Node.js projects.",
      version: "5.4",
      tip: "Use interface for object shapes, type for unions. Generics: function fn<T>(arg: T): T",
      website: "https://typescriptlang.org",
    },
  },

  java: {
    id: "java",
    name: "Java",
    judge0Id: 62,
    extension: "java",
    monacoLang: "java",
    color: "#f97316",
    starter: `// Java 21
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    record Person(String name, int age) {}

    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Streams API
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> squares = nums.stream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println("Squares: " + squares);

        // Records (Java 16+)
        var alice = new Person("Alice", 30);
        System.out.printf("Person: %s, age %d%n", alice.name(), alice.age());
    }
}
`,
    info: {
      description:
        "Strongly-typed, object-oriented language. Write once, run anywhere on the JVM. Powers Android and enterprise backends.",
      version: "JDK 21 LTS",
      tip: "Entry point: public static void main(String[] args). Use var for type inference (Java 10+).",
      website: "https://openjdk.org",
    },
  },

  cpp: {
    id: "cpp",
    name: "C++",
    judge0Id: 54,
    extension: "cpp",
    monacoLang: "cpp",
    color: "#7c3aed",
    starter: `// C++17
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;

    // Range-based for loop
    std::vector<int> nums = {5, 2, 8, 1, 9, 3};
    std::sort(nums.begin(), nums.end());
    
    std::cout << "Sorted: ";
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    // Lambda
    auto square = [](int x) { return x * x; };
    std::cout << "5² = " << square(5) << std::endl;

    return 0;
}
`,
    info: {
      description:
        "High-performance systems language with zero-cost abstractions. Used in game engines, OS, compilers, and embedded systems.",
      version: "C++17/20",
      tip: "Use #include <iostream> and std::cout. Prefer references (&) over pointers. Use auto for type inference.",
      website: "https://isocpp.org",
    },
  },

  c: {
    id: "c",
    name: "C",
    judge0Id: 50,
    extension: "c",
    monacoLang: "c",
    color: "#6366f1",
    starter: `// C11
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void reverse(char* str) {
    int n = strlen(str);
    for (int i = 0; i < n / 2; i++) {
        char tmp = str[i];
        str[i] = str[n - 1 - i];
        str[n - 1 - i] = tmp;
    }
}

int main() {
    printf("Hello, World!\\n");

    // Array operations
    int arr[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += arr[i];
    printf("Sum: %d\\n", sum);

    // String manipulation
    char word[] = "coderun";
    reverse(word);
    printf("Reversed: %s\\n", word);

    return 0;
}
`,
    info: {
      description:
        "Low-level systems language. Foundation of modern operating systems and compilers. Manual memory management gives full control.",
      version: "C11/C17",
      tip: "printf() for output, scanf() for input. Always free() malloc'd memory. Use sizeof() for array sizes.",
      website: "https://en.cppreference.com",
    },
  },

  csharp: {
    id: "csharp",
    name: "C#",
    judge0Id: 51,
    extension: "cs",
    monacoLang: "csharp",
    color: "#8b5cf6",
    starter: `// C# 12 / .NET 8
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    record Product(string Name, decimal Price);

    static void Main() {
        Console.WriteLine("Hello, World!");

        // LINQ
        var products = new List<Product> {
            new("Apple", 1.5m),
            new("Banana", 0.75m),
            new("Cherry", 3.0m),
        };

        var expensive = products
            .Where(p => p.Price > 1.0m)
            .OrderBy(p => p.Price)
            .Select(p => $"{p.Name}: £{p.Price:F2}");

        foreach (var item in expensive)
            Console.WriteLine(item);
    }
}
`,
    info: {
      description:
        "Microsoft's flagship language for .NET. Excellent for Windows apps, ASP.NET web APIs, Unity games, and Xamarin mobile.",
      version: ".NET 8 / C# 12",
      tip: "Use LINQ for collections. Records for immutable data. var for type inference. string interpolation: $\"Hello {name}\"",
      website: "https://learn.microsoft.com/dotnet/csharp",
    },
  },

  go: {
    id: "go",
    name: "Go",
    judge0Id: 60,
    extension: "go",
    monacoLang: "go",
    color: "#06b6d4",
    starter: `// Go 1.22
package main

import (
	"fmt"
	"sort"
	"strings"
)

func fibonacci(n int) []int {
	seq := []int{0, 1}
	for i := 2; i < n; i++ {
		seq = append(seq, seq[i-1]+seq[i-2])
	}
	return seq[:n]
}

func main() {
	fmt.Println("Hello, World!")

	// Slices
	nums := fibonacci(8)
	fmt.Println("Fibonacci:", nums)

	// Maps
	words := strings.Fields("go is fast and simple")
	sort.Strings(words)
	fmt.Println("Sorted words:", words)
}
`,
    info: {
      description:
        "Google's language for scalable cloud software. Fast compilation, built-in concurrency with goroutines, simple syntax.",
      version: "1.22",
      tip: "fmt.Println() for output. := for short variable declaration. Goroutines: go myFunc(). Channels: make(chan int)",
      website: "https://go.dev",
    },
  },

  rust: {
    id: "rust",
    name: "Rust",
    judge0Id: 73,
    extension: "rs",
    monacoLang: "rust",
    color: "#f97316",
    starter: `// Rust 1.78
fn fibonacci(n: u32) -> Vec<u64> {
    let mut seq = vec![0u64, 1];
    for i in 2..n as usize {
        let next = seq[i-1] + seq[i-2];
        seq.push(next);
    }
    seq.truncate(n as usize);
    seq
}

fn main() {
    println!("Hello, World!");

    // Ownership & iterators
    let nums: Vec<i32> = (1..=5).collect();
    let squares: Vec<i32> = nums.iter().map(|&x| x * x).collect();
    println!("Squares: {:?}", squares);

    // Pattern matching
    let fibs = fibonacci(8);
    println!("Fibonacci: {:?}", fibs);

    let sum: u64 = fibs.iter().sum();
    println!("Sum: {}", sum);
}
`,
    info: {
      description:
        "Memory-safe systems language with no garbage collector. Ownership model prevents data races at compile time.",
      version: "1.78 (stable)",
      tip: "println!() is a macro. let = immutable, let mut = mutable. .iter() for references, .into_iter() for ownership.",
      website: "https://rust-lang.org",
    },
  },

  kotlin: {
    id: "kotlin",
    name: "Kotlin",
    judge0Id: 78,
    extension: "kt",
    monacoLang: "kotlin",
    color: "#a855f7",
    starter: `// Kotlin 2.0
data class Person(val name: String, val age: Int)

fun List<Int>.squared() = map { it * it }

fun main() {
    println("Hello, World!")

    // Data classes & extension functions
    val people = listOf(
        Person("Alice", 30),
        Person("Bob", 25),
        Person("Charlie", 35)
    )

    people
        .filter { it.age >= 30 }
        .sortedBy { it.name }
        .forEach { println("  \${it.name}: \${it.age}") }

    // Extension function
    val squares = (1..5).toList().squared()
    println("Squares: \$squares")
}
`,
    info: {
      description:
        "Modern JVM language, 100% interoperable with Java. Official Android language. Concise and expressive with null safety.",
      version: "2.0",
      tip: "val = immutable, var = mutable. String templates: \"Hello \$name\". data class auto-generates equals/hashCode/toString.",
      website: "https://kotlinlang.org",
    },
  },

  swift: {
    id: "swift",
    name: "Swift",
    judge0Id: 83,
    extension: "swift",
    monacoLang: "swift",
    color: "#f97316",
    starter: `// Swift 5.10
struct Stack<T> {
    private var elements: [T] = []
    mutating func push(_ item: T) { elements.append(item) }
    mutating func pop() -> T? { elements.popLast() }
    var top: T? { elements.last }
}

print("Hello, World!")

// Generics
var stack = Stack<Int>()
[1, 2, 3, 4, 5].forEach { stack.push($0) }
print("Top:", stack.top ?? "empty")

// Pattern matching
let nums = [1, 2, 3, 4, 5, 6]
let (evens, odds) = nums.reduce(([Int](), [Int]())) { acc, n in
    n % 2 == 0 ? (acc.0 + [n], acc.1) : (acc.0, acc.1 + [n])
}
print("Evens:", evens, "Odds:", odds)
`,
    info: {
      description:
        "Apple's language for iOS, macOS, watchOS, and tvOS development. Fast, safe, and expressive with powerful type inference.",
      version: "5.10",
      tip: "let = constant, var = variable. Optionals: String? for nullable. Guard statements for early exit.",
      website: "https://swift.org",
    },
  },

  ruby: {
    id: "ruby",
    name: "Ruby",
    judge0Id: 72,
    extension: "rb",
    monacoLang: "ruby",
    color: "#ef4444",
    starter: `# Ruby 3.3
class Animal
  attr_reader :name, :sound

  def initialize(name, sound)
    @name = name
    @sound = sound
  end

  def speak
    "#{@name} says #{@sound}!"
  end
end

puts "Hello, World!"

# OOP
animals = [
  Animal.new("Dog", "Woof"),
  Animal.new("Cat", "Meow"),
  Animal.new("Cow", "Moo"),
]

animals.each { |a| puts a.speak }

# Enumerable magic
numbers = (1..10).to_a
puts "Evens: #{numbers.select(&:even?)}"
puts "Sum:   #{numbers.sum}"
`,
    info: {
      description:
        "Expressive, elegant dynamic language. Everything is an object. Famous for Ruby on Rails web framework.",
      version: "3.3",
      tip: "puts for printing with newline. Blocks: {|x| x * 2} or do |x| ... end. Symbol :name vs string \"name\".",
      website: "https://ruby-lang.org",
    },
  },

  php: {
    id: "php",
    name: "PHP",
    judge0Id: 68,
    extension: "php",
    monacoLang: "php",
    color: "#818cf8",
    starter: `<?php
// PHP 8.3
declare(strict_types=1);

readonly class Point {
    public function __construct(
        public float $x,
        public float $y
    ) {}

    public function distanceTo(Point $other): float {
        return sqrt(($this->x - $other->x) ** 2 + ($this->y - $other->y) ** 2);
    }

    public function __toString(): string {
        return "Point({$this->x}, {$this->y})";
    }
}

echo "Hello, World!\n";

$p1 = new Point(0, 0);
$p2 = new Point(3, 4);
echo "Distance: " . $p1->distanceTo($p2) . "\n";

// Array functions
$nums = range(1, 5);
$squared = array_map(fn($n) => $n ** 2, $nums);
echo "Squares: " . implode(", ", $squared) . "\n";
`,
    info: {
      description:
        "Server-side scripting language powering ~77% of websites. Powers WordPress, Laravel, and Symfony.",
      version: "8.3",
      tip: "Variables start with $. echo for output. Arrow functions: fn($x) => $x * 2. Use === for strict equality.",
      website: "https://php.net",
    },
  },

  rust2: undefined as unknown as LanguageConfig,

  scala: {
    id: "scala",
    name: "Scala",
    judge0Id: 81,
    extension: "scala",
    monacoLang: "scala",
    color: "#ef4444",
    starter: `// Scala 3.4
@main def run(): Unit =
  println("Hello, World!")

  // Case classes (like records)
  case class Point(x: Double, y: Double):
    def distanceTo(other: Point): Double =
      math.sqrt(math.pow(x - other.x, 2) + math.pow(y - other.y, 2))

  val p1 = Point(0, 0)
  val p2 = Point(3, 4)
  println(s"Distance: {p1.distanceTo(p2)}")

  // Functional collections
  val nums = (1 to 5).toList
  val result = nums
    .filter(_ % 2 != 0)
    .map(n => n * n)
  println(s"Odd squares: $result")
`,
    info: {
      description:
        "Combines OOP and functional programming on the JVM. Used at Twitter, LinkedIn, and Netflix for big data (Apache Spark).",
      version: "3.4",
      tip: "val = immutable, var = mutable. Case classes have equals/hashCode/toString for free. Use for-comprehensions.",
      website: "https://scala-lang.org",
    },
  },

  r: {
    id: "r",
    name: "R",
    judge0Id: 80,
    extension: "r",
    monacoLang: "r",
    color: "#2563eb",
    starter: `# R 4.4 — Statistical Computing
cat("Hello, World!\n")

# Vectors (fundamental R type)
x <- c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
cat("Mean:", mean(x), "\n")
cat("SD:", round(sd(x), 3), "\n")
cat("Median:", median(x), "\n")

# Vectorized operations
squares <- x^2
cat("Squares:", squares, "\n")

# Apply family
mat <- matrix(1:12, nrow = 3)
row_sums <- apply(mat, 1, sum)
cat("Row sums:", row_sums, "\n")
`,
    info: {
      description:
        "Statistical computing and graphics language. The go-to for data analysis, bioinformatics, and academic research.",
      version: "4.4",
      tip: "Vectors: c(1,2,3). Assignment: x <- value. Apply family replaces loops. pipe: x |> mean()",
      website: "https://r-project.org",
    },
  },

  bash: {
    id: "bash",
    name: "Bash",
    judge0Id: 46,
    extension: "sh",
    monacoLang: "shell",
    color: "#22c55e",
    starter: `#!/bin/bash
# Bash 5.2
echo "Hello, World!"

# Arrays
fruits=("apple" "banana" "cherry" "date")
echo "Fruits: "
# echo "Count: "

# Loop with C-style
for ((i=1; i<=5; i++)); do
    square=$((i * i))
    echo "  $i² = $square"
done

# String operations
greeting="Hello, Bash!"
echo "Upper: "
echo "Length: "

# Function
greet() {
    local name="$1"
    echo "Welcome, $name!"
}
greet "Developer"
`,
    info: {
      description:
        "Unix shell scripting language for automating system tasks. Glues programs together. Essential for DevOps and sysadmin.",
      version: "Bash 5.2",
      tip: "$var for variables, ${var} in strings. $(cmd) for command substitution. [[ ]] for modern conditionals.",
      website: "https://gnu.org/software/bash",
    },
  },

  lua: {
    id: "lua",
    name: "Lua",
    judge0Id: 64,
    extension: "lua",
    monacoLang: "lua",
    color: "#3b82f6",
    starter: `-- Lua 5.4
print("Hello, World!")

-- Tables are everything in Lua
local function create_stack()
    local stack = { items = {}, size = 0 }
    
    function stack:push(val)
        self.size = self.size + 1
        self.items[self.size] = val
    end
    
    function stack:pop()
        if self.size == 0 then return nil end
        local val = self.items[self.size]
        self.items[self.size] = nil
        self.size = self.size - 1
        return val
    end
    
    return stack
end

local s = create_stack()
for i = 1, 5 do s:push(i * i) end

print("Popping stack:")
for i = 1, 5 do
    print("  " .. s:pop())
end
`,
    info: {
      description:
        "Lightweight, embeddable scripting language. Popular in game dev (Roblox, Love2D, World of Warcraft), Redis, and nginx.",
      version: "5.4",
      tip: "Tables are the only data structure. Local variables with local keyword. String concat with ..",
      website: "https://lua.org",
    },
  },

  haskell: {
    id: "haskell",
    name: "Haskell",
    judge0Id: 61,
    extension: "hs",
    monacoLang: "haskell",
    color: "#8b5cf6",
    starter: `-- Haskell GHC 9.8
module Main where

import Data.List (sort, group)

-- Pure function
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Higher-order functions
applyTwice :: (a -> a) -> a -> a
applyTwice f = f . f

-- List comprehension
pythagorean :: Int -> [(Int, Int, Int)]
pythagorean n =
  [(a, b, c) | c <- [1..n], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]

main :: IO ()
main = do
  putStrLn "Hello, World!"
  print $ map factorial [0..7]
  print $ applyTwice (+3) 10
  print $ pythagorean 20
`,
    info: {
      description:
        "Pure functional language with lazy evaluation and strong static typing. Influential in academic PL research.",
      version: "GHC 9.8",
      tip: "Everything is a function. Pattern matching is fundamental. $ reduces parentheses. . for function composition.",
      website: "https://haskell.org",
    },
  },

  dart: {
    id: "dart",
    name: "Dart",
    judge0Id: 90,
    extension: "dart",
    monacoLang: "dart",
    color: "#06b6d4",
    starter: `// Dart 3.4
void main() {
  print('Hello, World!');

  // Records (Dart 3+)
  final point = (x: 3.0, y: 4.0);
  final distance = (point.x * point.x + point.y * point.y);
  print('Distance: \${distance.toString()}');

  // Collections
  final numbers = List.generate(5, (i) => i + 1);
  final squares = numbers.map((n) => n * n).toList();
  print('Squares: \$squares');

  // Null safety
  String? nullableStr;
  final length = nullableStr?.length ?? 0;
  print('Length of null: \$length');
  
  // Pattern matching (Dart 3)
  final value = 42;
  final result = switch (value) {
    < 0 => 'negative',
    0 => 'zero',
    > 0 => 'positive',
    _ => 'unknown'
  };
  print('Value is: \$result');
}
`,
    info: {
      description:
        "Google's language. Foundation of Flutter for cross-platform mobile, web, and desktop apps from a single codebase.",
      version: "3.4",
      tip: "Strong typing with inference. Null safety built-in: String? for nullable. async/await for asynchronous code.",
      website: "https://dart.dev",
    },
  },

  perl: {
    id: "perl",
    name: "Perl",
    judge0Id: 85,
    extension: "pl",
    monacoLang: "perl",
    color: "#2563eb",
    starter: `#!/usr/bin/perl
# Perl 5.38
use strict;
use warnings;
use List::Util qw(sum min max);

print "Hello, World!\n";

# Regular expressions (Perl's superpower)
my $text = "The quick brown fox jumps over the lazy dog";
my @words = ($text =~ /\b\w{4,}\b/g);
print "Long words: @words\n";

# Array operations
my @nums = (1..10);
my @evens = grep { $_ % 2 == 0 } @nums;
my @squares = map { $_ ** 2 } @evens;

print "Even squares: @squares\n";
print "Sum: " . sum(@squares) . "\n";
print "Max: " . max(@squares) . "\n";
`,
    info: {
      description:
        "Text processing powerhouse. Unmatched regular expression support. CPAN has 25,000+ modules. Popular in bioinformatics.",
      version: "5.38",
      tip: "$scalar, @array, %hash. grep for filtering, map for transforming. Regular expressions: /pattern/flags",
      website: "https://perl.org",
    },
  },

  sql: {
    id: "sql",
    name: "SQL",
    judge0Id: 82,
    extension: "sql",
    monacoLang: "sql",
    color: "#f59e0b",
    starter: `-- SQL (PostgreSQL)
-- Create and query tables

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

INSERT INTO employees (name, department, salary) VALUES
    ('Alice Johnson', 'Engineering', 95000),
    ('Bob Smith',     'Marketing',   72000),
    ('Carol White',   'Engineering', 88000),
    ('David Brown',   'HR',          65000),
    ('Eve Davis',     'Engineering', 102000);

-- Aggregate query
SELECT 
    department,
    COUNT(*) AS headcount,
    ROUND(AVG(salary), 2) AS avg_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
`,
    info: {
      description:
        "Structured Query Language for relational databases. Declarative — describe what you want, not how to get it.",
      version: "PostgreSQL 16",
      tip: "SELECT, FROM, WHERE, GROUP BY, ORDER BY are the core. JOINs combine tables. Aggregate: COUNT, SUM, AVG, MAX, MIN.",
      website: "https://postgresql.org",
    },
  },
};

// Remove the placeholder
delete (LANGUAGES as Record<string, unknown>).rust2;

export const LANGUAGE_LIST = Object.values(LANGUAGES);

export function getLanguage(id: string): LanguageConfig | undefined {
  return LANGUAGES[id];
}
