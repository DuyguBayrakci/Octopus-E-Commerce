"use client";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";
import Loader from "@/components/common/Loader";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await productService.getProducts();
      setProducts(res);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = products;

    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category));
    }

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [products, categories, search]);

  useEffect(() => {
    setPage(1);
  }, [filtered]);

  const paginated = useMemo(
    () => filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filtered, page]
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-screen px-4 lg:px-8 pb-20">
        <aside className="w-full lg:w-[260px] flex-shrink-0">
          <FilterSidebar
            onFilterChange={setCategories}
            search={search}
            onSearchChange={setSearch}
          />
        </aside>

        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
              {filtered.length} ürün listeleniyor
            </h2>
          </div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24">
              <p className="text-gray-500 text-lg font-medium mb-2">
                Filtrelere uygun ürün bulunamadı.
              </p>
              <p className="text-gray-400 text-sm">
                Lütfen filtreleri değiştirip yeniden deneyin.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-5 lg:gap-6">
                {paginated.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 rounded-lg text-dark text-sm font-bold disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3.5 py-2 leading-normal rounded-lg text-sm font-bold cursor-pointer ${
                      i + 1 === page
                        ? "bg-primary border border-primary text-white"
                        : "bg-white border border-gray-200 text-dark hover:bg-primary-hover hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 bg-white rounded-lg text-sm font-bold disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
  );
}
