function Link(props: JSX.IntrinsicElements['a']) {
  return (
    <a
      className="text-yellow-500 underline hover:no-underline dark:text-yellow-400"
      {...props}
    />
  );
}

export default function App() {
  return (
    <div className="mx-auto my-8 mt-10 w-8/12 rounded border border-gray-200 p-4 text-center shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      <h1 className="mb-4 text-4xl">Welcome</h1>
      <p className="my-4">
        <em>Minimal, fast, sensible defaults.</em>
      </p>
      <p className="my-4">
        Using
        {' '}
        <Link href="https://vitejs.dev/">Vite</Link>
        ,
        {' '}
        <Link href="https://reactjs.org/">React</Link>
        ,
        {' '}
        <Link href="https://www.typescriptlang.org/">TypeScript</Link>
        {' '}
        and
        {' '}
        <Link href="https://tailwindcss.com/">Tailwind</Link>
        .
      </p>
      <p className="my-4">
        Change
        {' '}
        <code className="rounded border border-yellow-500 bg-neutral-100 px-1 font-mono text-yellow-500 dark:border-yellow-400 dark:bg-neutral-700 dark:text-yellow-400">
          src/App.tsx
        </code>
        {' '}
        for live updates.
      </p>
    </div>
  );
}
