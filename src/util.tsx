export function inflate<T>(xs: T[], n: number, f: (x: T, i: number) => T): T[] {
  return [...Array(Math.ceil(n / xs.length)).keys()]
    .flatMap((i) => xs.map((x) => f(x, i)))
    .slice(0, n);
}

export const randomSalary = () => Math.floor(Math.random() * 100_000);
