'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Transition 
} from '@headlessui/react'
import { useStockSearch } from '@/hooks/useStockSearch'
import { SearchResult } from '@/types/search'
import { SearchResultItem } from './SearchResultItem'

export function SearchBox() {
  const router = useRouter()
  const {
    selected,
    setSelected,
    query,
    loading,
    setQuery,
    results,
    handleSearch,
  } = useStockSearch()

  const handleSelect = (result: SearchResult) => {
    setSelected(result)
    router.push(`/stock/${result.symbol}`)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <ComboboxInput
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={(event) => handleSearch(event.target.value)}
            displayValue={(result: SearchResult | null) => result?.symbol ?? ''}
            placeholder="Search stocks..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <ComboboxOptions 
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              {loading ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Loading...
                </div>
              ) : results.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                results.map((result, index) => (
                  <ComboboxOption
                    key={result.symbol}
                    value={result}
                    as="div"
                    order={index}
                  >
                    {({ focus }) => (
                      <SearchResultItem 
                        result={result}
                        focus={focus}
                      />
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
