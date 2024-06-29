"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { Plus } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { DashboardContext } from "../../layout";

export default function NewButton() {
    let { getUserDetails } = useContext(DashboardContext);
    const ref = useRef()
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('')
    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', ref.current);
        axiosInterceptorInstance
            .post(`/organization/add?name=${name}`, formData)
            .then((res) => {
                setOpen(false)
                getUserDetails()
            })
    }
    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="p-2.5 w-10 h-10">
                    <Plus className="text-primary " />
                </Button>
            </DialogTrigger>
            <DialogContent className=" bg-white border-none max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Add a new organization</DialogTitle>
                    <DialogDescription>
                        Fill in the details to add a new organization
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label htmlFor="logo" className="text-right">
                            Logo
                        </Label>
                        <Input
                            onChange={(e) => ref.current = e.target.files[0]}
                            type="file"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSubmit}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}