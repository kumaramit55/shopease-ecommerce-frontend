import { useEffect, useState } from "react";

const STORAGE_KEY = "admin_products";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  // Load once
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const save = (data) => {
    setProducts(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // ✅ ADD
  const addProduct = (product) => {
    save([...products, product]);
  };

  // ✅ UPDATE
  const updateProduct = (id, updatedData) => {
    const updatedList = products.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p,
    );
    save(updatedList);
  };

  // ✅ DELETE (REMOVE)
  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    const filtered = products.filter((p) => p.id !== id);
    save(filtered);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
