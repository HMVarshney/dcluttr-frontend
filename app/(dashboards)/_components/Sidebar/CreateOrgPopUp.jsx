"use client";

import OtherDetails from "@/app/(auth)/_components/OtherDetails";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { fetchAllOrganization, setCreateOrgOpen } from "@/lib/store/features/organizationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CreateOrgPopUp() {
  const dispatch = useDispatch();
  const { isCreateOrgOpen } = useSelector((state) => state.organization);
  return (
    <Dialog open={isCreateOrgOpen} onOpenChange={(e) => dispatch(setCreateOrgOpen(e))}>
      <DialogContent className="bg-white border-none max-w-[480px] ">
        <OtherDetails
          onDone={(e) => {
            dispatch(setCreateOrgOpen(false));
            dispatch(fetchAllOrganization("LAST"));
          }}
          isBF={true}
        />
      </DialogContent>
    </Dialog>
  );
}
