import { FormEventHandler, useState } from 'react';

interface Props {
  onSubmit(query: string): void;
}

/** 2023/06/11 - 검색창 - by leekoby */
const SearchBar: React.FC<Props> = ({ onSubmit }): JSX.Element => {
  /** 2023/06/26 - 검색 함수 추가 - by leekoby */
  const [query, setQuery] = useState('');
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(query);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='search...'
        type='text'
        className='border-2 bg-transparent border-secondary-dark p-2 text-primary-dark dark:text-primary rounded focus:border-primary-dark dark:focus:border-primary outline-none transition'
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
};

export default SearchBar;
