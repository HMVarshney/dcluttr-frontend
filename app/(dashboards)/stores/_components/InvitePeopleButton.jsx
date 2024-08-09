"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendInvitation } from "@/lib/store/features/invitationSlice";
import { cn, getConstructorTextColor, getRandomColor } from "@/lib/utils";
import { Check } from "phosphor-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function InvitePeopleButton({ children }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.invitations);
  const organizationDetails = useSelector((state) => state.organization.organizationDetails);
  const { brandsList } = useSelector((state) => state.brand);

  const orgId = organizationDetails?.id;
  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [brandIds, setBrandIds] = useState([]);
  const onSubmit = () => {
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (roleId === 0) {
      setError("Please select a role");
      return;
    }
    if (brandIds.length === 0) {
      setError("Please select at least one brand");
      return;
    }
    dispatch(sendInvitation({ email, roleId, brandIds, orgId }))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const currentOrgBrands = useMemo(() => {
    if (!organizationDetails) return [];
    return brandsList
      .filter((brand) => brand.organizationId === organizationDetails.id)
      ?.map((brand) => ({ ...brand, randomColor: getRandomColor() }));
  }, [brandsList, organizationDetails]);
  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" bg-white border-none max-w-[480px] p-0 gap-0">
        <DialogHeader>
          <DialogTitle className="border-b p-4">Invite People</DialogTitle>
        </DialogHeader>
        <div className="p-4 max-h-[520px] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <Label htmlFor="Email" className="text-sm font-semibold">
              Email
            </Label>
            <Input
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              value={email}
              id="Email"
              type="email"
              placeholder="Enter email Id"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Label htmlFor="Role" className="text-sm font-semibold">
              Role
            </Label>
            {[
              { id: 1, role: "Admin", text: "Access to all the brands. Can manage user access." },
              { id: 2, role: "Marketer", text: "Access to all the brands. Cannot manage user access." }
            ]?.map(({ id, role, text }) => (
              <div
                key={id}
                className={cn("p-4 rounded-lg border cursor-pointer border-gray-300 transition-all", {
                  "border-primary": id === roleId
                })}
                onClick={() => {
                  setError("");
                  setRoleId(id);
                  if (id === 1) {
                    setBrandIds(organizationDetails?.brands);
                  } else {
                    setBrandIds([]);
                  }
                }}
              >
                <div className="text-sm font-semibold flex">
                  {role}
                  <Check
                    size={20}
                    className={cn("ml-auto opacity-0 transition-all", {
                      "opacity-100": id === roleId
                    })}
                  />
                </div>
                <div className="text-xs text-gray-500 font-normal mt-0.5">{text}</div>
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
          <div
            className={cn("flex flex-col gap-2 transition-all overflow-hidden max-h-0 mt-0", {
              "max-h-[1000px] mt-4": roleId === 2
            })}
          >
            <Label htmlFor="Role" className="text-sm font-semibold">
              Select Brand
            </Label>
            {currentOrgBrands?.map((ele, i) => (
              <div
                key={i}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer border-gray-300 transition-all flex items-center gap-4",
                  {
                    "border-primary": brandIds?.includes(ele.id)
                  }
                )}
                onClick={() => {
                  if (brandIds?.includes(ele.id)) {
                    setBrandIds(brandIds?.filter((id) => id !== ele.id));
                  } else {
                    setBrandIds([...brandIds, ele.id]);
                  }
                }}
              >
                <Avatar className={cn("border rounded-lg cursor-pointer transition h-9 w-9")}>
                  <AvatarImage src={ele?.brandLogo} alt={ele?.brandName} />
                  <AvatarFallback
                    className="text-base rounded"
                    style={{ backgroundColor: ele?.randomColor, color: getConstructorTextColor(ele?.randomColor) }}
                  >
                    {ele?.brandName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-semibold flex w-full">
                  {ele.brandName}
                  <Check
                    size={20}
                    className={cn("ml-auto opacity-0 transition-all", {
                      "opacity-100": brandIds?.includes(ele.id)
                    })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="border-t p-4 shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.08)]">
          <Button
            type="submit"
            className="font-medium"
            variant="outline"
            onClick={() => {
              setOpen(false);
              setError("");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" className="font-medium" onClick={onSubmit} disabled={loading}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
