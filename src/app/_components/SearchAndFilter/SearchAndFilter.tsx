import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { SelectProps } from '../../../interfaces/index';
import { MySelect } from '../Select/Select';
import { GlobalContext } from '@/context/global';

export const SearchAndFilter = React.memo(
  ({ data }: { data: SelectProps[] }) => {
    //usecontext
    const { searchInput, setSearchInput } = useContext(GlobalContext);
    // handle search input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    };

    return (
      <div className="search flex items-center w-full gap-3">
        <div className="search__Input w-3/4 relative">
          <Search className="w-4 h-4 text-secondary absolute top-3 left-2" />
          <input
            className="w-full p-2 outline-none px-7 bg-therd dark:bg-slate-800 border border-secondary/20 text-[15px] rounded-lg text-secondary"
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search patients by name "
          />
        </div>

        {/* Sort Select */}
        <div className="w-1/4">
          <MySelect data={data} placeholder="sort by..." />
        </div>
      </div>
    );
  }
);
