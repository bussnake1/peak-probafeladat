import { SearchResult } from '@/types/search'

type SearchResultItemProps = {
  result: SearchResult
  focus: boolean
}

export function SearchResultItem({ result, focus }: SearchResultItemProps) {
  return (
    <div
      className={`relative cursor-default select-none py-2 pl-3 pr-9 ${
        focus ? 'bg-primary text-white' : 'text-gray-900'
      }`}
    >
      <div className="flex items-center">
        <span className={`font-medium ${focus ? 'text-white' : 'text-gray-900'}`}>
          {result.symbol}
        </span>
        <span className={`ml-2 ${focus ? 'text-white' : 'text-gray-500'}`}>
          {result.name}
        </span>
      </div>
    </div>
  )
}
