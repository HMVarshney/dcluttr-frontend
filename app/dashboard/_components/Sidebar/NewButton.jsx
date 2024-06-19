"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function NewButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="p-2.5 w-10 h-10">
                    <Plus className="text-primary " />
                </Button>
            </DialogTrigger>
            <DialogContent className=" bg-white border-none max-w-[480px]">
                LAALALLAAA
            </DialogContent>
        </Dialog>
    )
}