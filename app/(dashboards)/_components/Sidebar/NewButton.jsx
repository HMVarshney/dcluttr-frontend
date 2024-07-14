"use client";

import OtherDetails from "@/app/(auth)/_components/OtherDetails";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fetchAllOrganization } from "@/lib/store/features/dashboardSlice";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function NewButton() {
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="p-2.5 w-10 h-10">
                    <Plus className="text-primary " />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-none max-w-[480px] ">
                <OtherDetails onDone={(e) => {
                    setOpen(e)//TODO
                    dispatch(fetchAllOrganization("LAST"));
                }} isBF={true} />
            </DialogContent>
        </Dialog>
    );
}
