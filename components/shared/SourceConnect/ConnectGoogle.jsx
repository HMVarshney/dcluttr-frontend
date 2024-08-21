import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { connectGoogle } from "@/lib/store/features/sourceConnectSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function ConnectGoogleModal({ openModal, onClose, value, setValue, handleSubmit }) {
  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <div className="mb-4">
            <h2>Connect Google</h2>
          </div>
          <div>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              id="customer_id"
              name="customer_id"
              placeholder="Enter customer Id"
            />
          </div>
        </div>

        <DialogFooter>
          <Button disabled={!value} onClick={handleSubmit}>
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ConnectGoogle({ openModal, onClose, brandId, orgId }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const { sourceConnectLoading } = useSelector((state) => state.sourceConnect.google);

  const handleSubmit = () => {
    if (!value) return;
    dispatch(connectGoogle({ brandId, orgId, customerId: value }))
      .unwrap()
      .then(() => {
        toast.success("Connection is successful");
        onClose();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (!openModal) setValue("");
  }, [openModal]);

  return (
    <ConnectGoogleModal
      openModal={openModal}
      onClose={onClose}
      value={value}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  );
}

export default ConnectGoogle;
