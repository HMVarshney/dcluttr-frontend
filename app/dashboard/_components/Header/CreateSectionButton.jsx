"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function CreateSectionButton() {
    const ref = useRef()
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('')
    const onSubmit = () => {
        setOpen(false)
    }
    return (
        <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
            <DialogTrigger asChild>
                <Button variant="default" >
                    <Plus className='w-4 h-4 mr-2' />
                    <div className='font-medium text-sm'>
                        Create Section
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className=" bg-white border-none max-w-[652px] p-0">
                <DialogHeader>
                    <DialogTitle className="border-b p-4">Section name</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="Section name" className="text-base font-bold">
                            Section name
                        </Label>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="Section name"
                            placeholder="Type title here"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="logo" className="text-base font-bold">
                            Search for metric
                        </Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="🔍 Search for metric"
                        />
                    </div>
                    <div className="flex flex-col gap-2 px-4 pb-4 border-b">
                        <Label htmlFor="logo" className="text-base font-bold">
                            Custom Metrics Metrics
                        </Label>
                        <div className="flex flex-wrap gap-4 py-2">
                            {[
                                'Net Profit', 'Blended ROAS', 'MER', 'Net Margin', 'ROAS',
                                'Blended Ad Spend', 'New Customers CPA', 'New Customers ROAS',
                                'Blended Sales', 'RPS', 'Returns %', 'Blended CPA',
                                'Profit on Ad Spend', 'Customer Expense Ad Spend', 'Cash Turnover',
                                'Blended Attributed ROAS'
                            ]?.map((item, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <input type="checkbox" id={item} className="w-[18px] h-[18px]" />
                                    <label
                                        htmlFor={item}
                                        className="text-sm font-medium leading-none text-[#515153]"
                                    >
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 px-4">
                        <Label htmlFor="logo" className="text-base font-bold">
                            Web Analytics Metrics
                        </Label>
                        <div className="flex flex-wrap gap-4 py-2">
                            {[
                                'Net Profit', 'Blended ROAS', 'MER', 'Net Margin', 'ROAS',
                                'Blended Ad Spend', 'New Customers CPA', 'New Customers ROAS',
                                'Blended Sales', 'RPS', 'Returns %', 'Blended CPA',
                                'Profit on Ad Spend', 'Customer Expense Ad Spend', 'Cash Turnover',
                                'Blended Attributed ROAS'
                            ]?.map((item, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <input type="checkbox" id={item} className="w-[18px] h-[18px]" />
                                    <label
                                        htmlFor={item}
                                        className="text-sm font-medium leading-none text-[#515153]"
                                    >
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter className=" p-2.5 border-t">
                    <Button type="submit" onClick={onSubmit}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}