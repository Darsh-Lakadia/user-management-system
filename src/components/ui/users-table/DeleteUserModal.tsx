import { Button } from "../Button";
import { Modal } from "../Modal";
import type { User } from "../../../services/users/users.services.types";

interface DeleteUserModalProps {
  open: boolean;
  user?: User | null;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}

export const DeleteUserModal = ({ open, user, loading, onCancel, onConfirm }: DeleteUserModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete user"
      description="This action cannot be undone."
      size="sm"
    >
      <p className="text-sm text-muted-foreground mb-6">
        Are you sure you want to delete {user?.name ?? "this user"}?
      </p>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="destructive" loading={loading} onClick={onConfirm}>Delete</Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
