"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BrandsAccessList({ children, brands = [] }) {
  const [isOpen, setOpen] = useState(false);
  console.log(brands);

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" bg-white border-none max-w-[480px] p-0 gap-0">
        <DialogHeader>
          <DialogTitle className="border-b p-4">All stores</DialogTitle>
        </DialogHeader>
        <div className="p-4 max-h-[520px] overflow-y-auto">
          <div className={cn("flex flex-col gap-2 transition-all overflow-hidden  mt-0")}>
            {brands?.map((ele, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer border-gray-300 transition-all flex items-center gap-4"
                )}
              >
                <Avatar className={cn("border rounded-lg cursor-pointer transition h-9 w-9")}>
                  <AvatarImage src={ele?.brandLogo} alt={ele?.brandName} />
                  <AvatarFallback
                    className="text-base rounded"
                    style={
                      {
                        // backgroundColor: ele?.randomColor,
                        // color: getConstructorTextColor(ele?.randomColor ?? "")
                      }
                    }
                  >
                    {ele?.brandName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-semibold flex w-full">{ele.brandName}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
