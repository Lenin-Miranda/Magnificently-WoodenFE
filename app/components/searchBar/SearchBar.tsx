import { useEffect, useState } from "react";
import { Product } from "@/app/interfaces/products";
import { SearchBarProps } from "@/app/interfaces/products";

export default function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex-col gap-4">
      <p className="text-2xl mb-6 font-display font-bold dark:text-madera text-azul">
        Type to search our products
      </p>
      <label htmlFor="search"></label>
      <input
        className="w-full z-[0] py-4 px-2 md:px-6 bg-blanco/80 dark:bg-madera/60 .placeholder-cafe rounded backdrop-blur-md shadow-md border-b border-madera/20 mb-6 sticky top-0 z-50"
        type="text"
        id="search"
        placeholder="Search Products"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
