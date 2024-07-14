"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { sendInvitation } from "@/lib/store/features/invitationSlice";
import { cn } from "@/lib/utils";
import { Check } from "phosphor-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InvitePeopleButton() {
    const dispatch = useDispatch()
    const organizationDetails = useSelector((state) => state.organization.organizationDetails)
    const brandIds = organizationDetails?.brands
    const orgId = organizationDetails?.id
    const [isOpen, setOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [roleId, setRoleId] = useState(0)
    const onSubmit = () => {
        dispatch(sendInvitation({ email, roleId, brandIds, orgId })).unwrap()
            .then(() => {
                setOpen(false);
            }).catch((error) => {
                setError(error?.message)
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
                            onChange={(e) => {
                                setError('')
                                setEmail(e.target.value)
                            }}
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
                        {[
                            { id: 1, role: 'Admin', tex: 'Access all workspaces. Can edit and invite others' },
                            { id: 2, role: 'Marker', tex: 'Access to selected workspace. Cannot edit or invite.' }
                        ]?.map(({ id, role, tex }) => (
                            <div key={id} className={cn("p-4 rounded-lg border cursor-pointer border-gray-300 transition-all", { 'border-primary': id === roleId })}
                                onClick={() => {
                                    setError('')
                                    setRoleId(id)
                                }}>
                                <div className="text-sm font-semibold flex">
                                    {role}<Check size={20} className={cn("ml-auto opacity-0 transition-all", { 'opacity-100': id === roleId })} />
                                </div>
                                <div className="text-xs text-gray-500 font-normal mt-0.5">
                                    {tex}
                                </div>
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
                <DialogFooter className="border-t p-4 shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.08)]">
                    <Button type="submit" variant="outline">Cancel</Button>
                    <Button type="submit" onClick={onSubmit}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}