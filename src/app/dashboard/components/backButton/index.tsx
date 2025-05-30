import Link from "next/link";

export function BackButtonDashboard({ title, link }: { title: string, link: string }) {
  return (
    <div className="flex items-center gap-3">
      <Link 
        href={ link }
        className="text-sm sm:text-base bg-gray-900 text-white px-4 py-1 rounded-md transition duration-300 hover:scale-105"
      >
        Voltar
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold">{ title }</h1>
    </div>
  )
}