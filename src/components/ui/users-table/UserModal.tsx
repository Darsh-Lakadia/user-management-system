import type { User } from "../../../services/users/users.services.types";
import { Modal } from "../Modal";
import { UserForm } from "../../forms";

interface FormValues {
  name: string;
  email: string;
  role: string;
  avatar: string;
  password?: string;
}

interface UserModalProps {
  open: boolean;
  mode?: "view" | "edit" | "create";
  user?: User;
  onClose: () => void;
  onSubmit?: (values: FormValues, user?: User) => Promise<void> | void;
}

export const UserModal = ({
  open,
  mode = "view",
  user,
  onClose,
  onSubmit,
}: UserModalProps) => {
  const isView = mode === "view";

  const TITLE_BY_MODE: Record<NonNullable<UserModalProps["mode"]>, string> = {
    view: "View user",
    create: "Create user",
    edit: "Edit user",
  };

  const DESCRIPTION_BY_MODE: Record<
    NonNullable<UserModalProps["mode"]>,
    string
  > = {
    view: "User details",
    create: "Add the user details below",
    edit: "Update the user details below",
  };

  const handleFormSubmit = async (values: FormValues) => {
    if (isView) {
      onClose();
      return;
    }
    await onSubmit?.(values, user);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={TITLE_BY_MODE[mode]}
      description={DESCRIPTION_BY_MODE[mode]}
      size="md"
    >
      <UserForm
        user={user}
        mode={mode}
        onSubmit={handleFormSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default UserModal;
