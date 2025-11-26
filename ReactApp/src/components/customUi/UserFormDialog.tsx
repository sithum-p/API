import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/customUi/ImageUpload";
import type { User } from "@/apis/users/users.api";

const createSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthday: z.string().min(1, "Birthday is required"),
  age: z.number().int().min(10, "Age must be at least 10").max(150),
  gender: z.enum(["male", "female", "other"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profileImage: z.string().optional(),
});

const updateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthday: z.string().min(1, "Birthday is required"),
  age: z.number().int().min(10, "Age must be at least 10").max(150),
  gender: z.enum(["male", "female", "other"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().optional(),
  profileImage: z.string().optional(),
});

type FormData = z.infer<typeof createSchema>;

type UserFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser: User | null;
  onSubmit: (data: any) => void;
};

export default function UserFormDialog({ open, onOpenChange, editingUser, onSubmit }: UserFormDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(editingUser ? updateSchema : createSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "male",
      email: "",
      phone: "",
      birthday: "",
      password: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (editingUser) {
      form.reset({
        firstName: editingUser.firstname,
        lastName: editingUser.lastname,
        age: editingUser.age as any,
        gender: editingUser.gender as any,
        email: editingUser.email,
        phone: "",
        birthday: editingUser.birthdate ? editingUser.birthdate.split('T')[0] : "",
        password: editingUser.password || "",
        profileImage: editingUser.profileImage || editingUser.imageUrl || "",
      });
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "male",
        email: "",
        phone: "",
        birthday: "",
        password: "",
        profileImage: "",
      });
    }
  }, [editingUser, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[520px] max-h-[90vh] overflow-y-auto bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogDescription>
            {editingUser ? "Update user information below." : "Fill in the details to create a new user."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 px-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (e.target.value) {
                          const date = new Date(e.target.value);
                          const today = new Date();
                          let age = today.getFullYear() - date.getFullYear();
                          const monthDiff = today.getMonth() - date.getMonth();
                          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
                            age--;
                          }
                          form.setValue("age", age);
                        }
                      }}
                      max={format(new Date(Date.now() - 86400000), "yyyy-MM-dd")}
                      min="1900-01-01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={(field.value as any) ?? ""}
                      disabled
                      readOnly
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange as any} value={(field.value as any) ?? "male"}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{editingUser ? "Password (leave blank to keep current)" : "Password"}</FormLabel>
                  <FormControl><Input type="password" {...field} placeholder={editingUser ? "Enter new password or leave blank" : "Enter password"} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Profile Image</FormLabel>
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
