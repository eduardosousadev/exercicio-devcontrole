import Link from "next/link";

interface DashboardButtonProps {
  title: string;
  titleButton: string;
  hrefButton: string;
}

export function DashboardButton({ title, titleButton, hrefButton }: DashboardButtonProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl sm:text-3xl font-bold">{ title }</h1>
      <Link
        href={ hrefButton }
        className="text-sm sm:text-base bg-blue-500 px-4 py-1 rounded-md text-white transition duration-300 hover:scale-105"
      >
        { titleButton }
      </Link>
    </div>
  )
}