import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { connectFacebook, connectGoogle } from "@/lib/store/features/sourceConnectSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function ConnectFacebookModal({ openModal, onClose, value, setValue, handleSubmit }) {
  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <div className="mb-4">
            <h2>Connect Facebook</h2>
          </div>
          <div>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              id="account_id"
              name="account_id"
              placeholder="Enter account Id"
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

function ConnectFacebook({ openModal, onClose, brandId, orgId }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const { sourceConnectLoading } = useSelector((state) => state.sourceConnect.facebook);

  const handleSubmit = () => {
    if (!value) return;
    dispatch(connectFacebook({ brandId, orgId, accountId: value }))
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
    <ConnectFacebookModal
      openModal={openModal}
      onClose={onClose}
      value={value}
      setValue={setValue}
      handleSubmit={handleSubmit}
    />
  );
}

export default ConnectFacebook;
