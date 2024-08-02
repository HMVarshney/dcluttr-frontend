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
import { fetchAllOrganization } from "@/lib/store/features/organizationSlice";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function NewButton() {
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <div className="flex items-center gap-3 p-3">
                    <Plus className="text-primary " size={16} />
                    <span className="line-clamp-1 text-sm">Create new</span>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white border-none max-w-[480px] ">
                <OtherDetails
                    onDone={(e) => {
                        setOpen(e); //TODO
                        dispatch(fetchAllOrganization("LAST"));
                    }}
                    isBF={true}
                />
            </DialogContent>
        </Dialog>
    );
}
