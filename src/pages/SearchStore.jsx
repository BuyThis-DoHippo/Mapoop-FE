import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

export default function SearchStore() {
  return (
    <div className="w-full">
      <Navbar />

      {/* 네브바 하단선과 90px, 좌 198 / 우 197 */}
      <main className="w-[1440px] mx-auto">
        <section className="mt-[90px] pl-[198px] pr-[197px]">
          {/* SearchBar(961px) + 24px + 필터(60px) = 1045px */}
          <div className="inline-flex items-center gap-[24px]">
            <SearchBar
              variant="store"
              onSearch={(q) => console.log('search:', q)}
            />

            {/* 필터 60×60 */}
            <button
              type="button"
              aria-label="필터"
              className="
                h-[60px] w-[60px] shrink-0
                inline-flex items-center justify-center
                rounded-[10px] border border-[#D9D9D9] bg-white
                hover:shadow-sm transition
                focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/25
              "
            >
              <img src="/assets/filter.svg" alt="필터" className="h-5 w-5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
