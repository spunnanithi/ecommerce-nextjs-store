"use client";

import Button from "@/components/reuseable/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
  name: string;
  valueKey: string;
  data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({ name, valueKey, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    // Check to see current URL
    const current = qs.parse(searchParams.toString());

    // Add filter to current URL
    const query = {
      ...current,
      [valueKey]: id,
    };

    // Remove filter if clicked while active
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md border border-gray-300 bg-white text-sm text-gray-800",
                selectedValue === filter.id && "bg-black text-white",
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
