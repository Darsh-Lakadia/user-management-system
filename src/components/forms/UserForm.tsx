import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Button } from "../ui";
import type { User } from "../../services/users/users.services.types";
import {
  createUserSchema,
  editUserSchema,
  type UserFormValues,
} from "../../schemas/users";

export interface UserFormProps {
  user?: User;
  mode?: "view" | "edit" | "create";
  onSubmit: (values: UserFormValues, user?: User) => Promise<void> | void;
  onCancel?: () => void;
}

const UserForm = ({
  user,
  mode = "view",
  onSubmit,
  onCancel,
}: UserFormProps) => {
  const isView = mode === "view";
  const isCreate = mode === "create";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UserFormValues>({
    resolver: zodResolver(isCreate ? createUserSchema : editUserSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "",
      avatar: user?.avatar ?? "",
      ...(isCreate ? { password: "" } : {}),
    },
    mode: "onBlur",
  });

  const handleFormSubmit = async (values: UserFormValues) => {
    if (isView) {
      onCancel?.();
      return;
    }
    await onSubmit(values, user);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="flex items-start gap-4">
        <img
          src={user?.avatar ?? "https://avatar.iran.liara.run/public/40.jpg"}
          alt={user?.name}
          className="h-16 w-16 rounded-full object-cover border border-line"
        />
        <div className="grid w-full grid-cols-1 gap-4">
          <Input
            label="Name"
            placeholder="Enter name"
            disabled={isView}
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            placeholder="user@example.com"
            disabled={isView}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Role"
          disabled={isView}
          error={errors.role?.message}
          {...register("role")}
          options={[
            { label: "Customer", value: "customer" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Input
          label="Avatar URL"
          placeholder="https://..."
          disabled={isView}
          error={errors.avatar?.message}
          {...register("avatar")}
        />
      </div>

      {isCreate && (
        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          disabled={isView}
          error={errors.password?.message}
          {...register("password")}
        />
      )}

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="ghost" type="button" onClick={onCancel}>
          {isView ? "Close" : "Cancel"}
        </Button>
        {!isView && (
          <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
            {isCreate ? "Create user" : "Save changes"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
