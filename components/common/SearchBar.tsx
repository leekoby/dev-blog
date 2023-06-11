interface Props {}

/** 2023/06/11 - 검색창 - by leekoby */
const SearchBar: React.FC<Props> = (props): JSX.Element => {
  return (
    <input
      placeholder='search...'
      type='text'
      className='border-2 bg-transparent border-secondary-dark p-2 text-primary-dark dark:text-primary rounded focus:border-primary-dark dark:focus:border-primary outline-none transition'
    />
  );
};

export default SearchBar;
