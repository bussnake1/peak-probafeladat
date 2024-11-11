import { SearchBox } from '@/components/ui/SearchBox'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">
        Stock <span className="text-primary">Search</span>
      </h1>
      <SearchBox />
    </div>
  );
}
