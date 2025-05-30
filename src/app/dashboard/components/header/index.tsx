import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="w-full bg-gray-900 my-4 p-3 rounded-md flex items-center gap-4 uppercase">
      <Link href="/dashboard" className="text-sm md:text-base text-white transition-colors duration-300 hover:text-blue-500">
        Chamados
      </Link>
      <Link href="/dashboard/customers" className="text-sm md:text-base text-white transition-colors duration-300 hover:text-blue-500 uppercase">
        Clientes
      </Link>
    </header>
  )
}