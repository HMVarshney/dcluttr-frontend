"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { cn } from "@/lib/utils";
import { Check } from "phosphor-react";
import { useState } from "react";

export default function InvitePeopleButton() {
    const [isOpen, setOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [roleId, setRoleId] = useState(0)
    const onSubmit = () => {
        axiosInterceptorInstance.post('/invitations', {
            email,
            roleId,
            "brandIds": [
                0
            ],
            "orgId": 0
        }).then((res) => {
            setOpen(false)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button className="mt-8">
                    Invite people
                </Button>
            </DialogTrigger>
            <DialogContent className=" bg-white border-none max-w-[480px] p-0">
                <DialogHeader>
                    <DialogTitle className="border-b p-4">Invite People</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="Email" className="text-sm font-bold">
                            Email
                        </Label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="Email"
                            type="email"
                            placeholder="Enter email Id"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="Role" className="text-sm font-bold">
                            Role
                        </Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        {[{ role: 'Guest', tex: 'Access to selected workspace. Cannot edit or invite.' },
                        { role: 'Collaborator', tex: 'Access all workspace. Can edit, but not invite others.' },
                        { role: 'Admin', tex: 'Access all workspaces. Can edit and invite others' }]
                            ?.map(({ role, tex }, index) => (
                                <div key={index} className={cn("p-4 rounded-lg border cursor-pointer border-gray-300 transition-all", { 'border-primary': index === roleId })} onClick={() => setRoleId(index)}>
                                    <div className="text-sm font-semibold flex">
                                        {role}<Check size={20} className={cn("ml-auto opacity-0 transition-all", { 'opacity-100': index === roleId })} />
                                    </div>
                                    <div className="text-xs text-gray-500 font-normal mt-0.5">
                                        {tex}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <DialogFooter className="border-t p-4 shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.08)]">
                    <Button type="submit" variant="outline">Cancel</Button>
                    <Button type="submit" onClick={onSubmit}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}