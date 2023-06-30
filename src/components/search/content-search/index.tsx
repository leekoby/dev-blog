import contentIndexer from '@/lib/client/content-indexer';
import { SearchContent } from '@/types/markdown';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ChangeEventHandler } from 'react';

/** 2023/06/30 - 검색창 레이아웃 - by leekoby */
const ContentSearch = () => {
  const [results, setResults] = useState<SearchContent[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  /** 2023/06/30 - 검색 기능 수행 함수 - by leekoby */
  const performSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    const results = contentIndexer.search(value);
    setResults(results);
    setQuery(value);
  };

  /** 2023/06/30 - 검색창 외부 클릭 시 검색 초기화 함수 - by leekoby */
  const handleClickOutSide = () => {
    setResults([]);
    setQuery('');
  };

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      if (results.length > 0 && ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutSide();
      }
    };
    document.addEventListener('click', callback);

    //cleanup function
    return () => {
      document.removeEventListener('click', callback);
    };
  }, [results.length]);

  return (
    <>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input
          ref={ref}
          value={query}
          onChange={performSearch}
          id='search-input'
          autoComplete='off'
          type='text'
          className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Search for anything'
        />
      </div>
      {results.length > 0 && (
        <ul
          className='w-80 border-solid border rounded-md z-10 bg-white max-h-80 overflow-auto absolute select is-multiple'
          role='listbox'>
          {results.map((result) => (
            <li
              key={result.slug}
              onClick={() => {}}
              className={`hover:bg-indigo-600 hover:text-white p-3 relative cursor-pointer`}>
              <div className='font-bold text-sm truncate'>{result.title}</div>
              <p className='truncate text-sm'>{result.description}</p>
              <span className='mt-2 text-xs text-white bg-gray-800 px-2 py-1 rounded-xl'>
                {result.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContentSearch;
