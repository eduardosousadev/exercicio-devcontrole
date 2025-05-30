export function CheckDashboardItems<T>({ table, message }: { table: T[] ,message: string }) {
  return (
    <>
      {
        table.length === 0 && (
          <h1 className="text-gray-600 text-xs sm:text-base mt-2 flex-1 flex justify-center items-center">
            { message }
          </h1>
        )
      }
    </>
  )
}