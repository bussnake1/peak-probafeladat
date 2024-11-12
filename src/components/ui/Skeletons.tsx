export function StockDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PriceChartSkeleton() {
  return (
    <div className="w-full h-[400px] mt-8 animate-pulse">
      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="w-full h-[calc(100%-2rem)] bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  )
}
