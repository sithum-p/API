import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/customUi/ImageUpload";
import type { Product } from "@/types/product";

const productSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Price: z.number().min(0, "Price must be positive"),
  Category: z.string().min(1, "Category is required"),
  Brand: z.string().min(1, "Brand is required"),
  Stock: z.number().int().min(0, "Stock must be non-negative"),
  imageUrl: z.string().optional(),
});

type FormData = z.infer<typeof productSchema>;

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  onSubmit: (data: FormData) => void;
};

export default function ProductFormDialog({ open, onOpenChange, editingProduct, onSubmit }: ProductFormDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      Name: "",
      Price: 0,
      Category: "",
      Brand: "",
      Stock: 0,
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        Name: editingProduct.Name,
        Price: editingProduct.Price,
        Category: editingProduct.Category,
        Brand: editingProduct.Brand,
        Stock: editingProduct.Stock,
        imageUrl: editingProduct.imageUrl || "",
      });
    } else {
      form.reset({
        Name: "",
        Price: 0,
        Category: "",
        Brand: "",
        Stock: 0,
        imageUrl: "",
      });
    }
  }, [editingProduct, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[520px] max-h-[90vh] overflow-y-auto bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 px-1">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onImageUpload={field.onChange}
                      currentImage={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:col-span-2 mt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}