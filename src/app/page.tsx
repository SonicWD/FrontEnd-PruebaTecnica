import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-span-1">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={120}
          height={120}
          layout="fixed"
        />
      </div>
      <div className="row-span-1">
        <h1 className="text-4xl font-bold text-center">Hello, World!</h1>
      </div>
      <div className="row-span-1">
        <p className="text-center">
          This is a Next.js project with Tailwind CSS and TypeScript.
        </p>
      </div>
    </div>
  );
}
