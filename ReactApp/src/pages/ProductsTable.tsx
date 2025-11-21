import * as React from 'react';
import { toast } from 'sonner';
import type { Product } from '@/types/product';
import { DataTable } from '@/tables/data-table';
import { columns } from '@/tables/columns';
import UserDetailsDialog from '@/components/customUi/UserDetailsDialog';
import ProductFormDialog from '@/components/customUi/ProductFormDialog';
import { useProductsQuery } from '@/hooks/products/useProductsQuery.hook';
import { productsAPI } from '@/apis/products/products.api';

export default function ProductsTable() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedIds, setSelectedIds] = React.useState<Set<string | number>>(new Set());
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [activeProduct, setActiveProduct] = React.useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [search, setSearch] = React.useState('');

  const { data, isLoading, error } = useProductsQuery(page, pageSize);
  const rows = data?.data || [];

  console.log('Query result:', { data, isLoading, error });
  console.log('Page:', page, 'PageSize:', pageSize, 'Rows count:', rows.length);
  console.log('Raw rows:', rows);

  const openDetails = (product: Product) => {
    setActiveProduct(product);
    setOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setEditOpen(true);
  };

  const handleUpdate = async (data: any) => {
    if (!editingProduct) return;
    
    try {
      await productsAPI.update(editingProduct._id, data);
      toast.success('Product updated successfully!');
      setEditOpen(false);
      setEditingProduct(null);
      // Refresh data
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <DataTable
          columns={columns}
          data={rows}
          total={data?.total || 0}
          page={page}
          pageSize={pageSize}
          loading={isLoading}
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          searchPlaceholder="Search by name, category, or brand..."
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }}
          onRowAction={openDetails}
          onSecondaryAction={openEdit}
        />
      </div>
      <UserDetailsDialog
        open={open}
        onOpenChange={setOpen}
        title="Product Details"
      >
        {activeProduct ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">ID</p>
              <p className="font-medium">{activeProduct._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium">{activeProduct.Name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-medium">${activeProduct.Price}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Category</p>
              <p className="font-medium">{activeProduct.Category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Brand</p>
              <p className="font-medium">{activeProduct.Brand}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Stock</p>
              <p className="font-medium">{activeProduct.Stock}</p>
            </div>
            {activeProduct.productImage && (
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-500">Product Image</p>
                <img src={activeProduct.productImage} alt="Product" className="w-32 h-32 rounded-lg object-cover" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No product selected.</div>
        )}
      </UserDetailsDialog>
      
      <ProductFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        editingProduct={editingProduct}
        onSubmit={handleUpdate}
      />
    </>
  );
}
