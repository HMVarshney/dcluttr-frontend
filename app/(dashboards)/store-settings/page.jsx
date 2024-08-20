"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ConfirmModal from "@/components/ConfirmModal";
import { ArrowDown, Trash } from "phosphor-react";
import InvitePeopleButton from "../stores/_components/InvitePeopleButton";
import { Edit3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { fetchBrandById } from "@/lib/store/features/brandSlice";
import { useSearchParams } from "next/navigation";
import SourceConnectGrid from "@/components/shared/SourceConnect/SourceConnectGrid";
import { getAllUsersOfOrganization } from "@/lib/store/features/organizationSlice";

const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User
          <ArrowDown className={cn("ml-2 h-4 w-4", { "rotate-180": column.getIsSorted() === "asc" })} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={row.original.image} alt={row.original.fullName} />
            <AvatarFallback>{row.original.fullName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold">{row.original.fullName}</div>
            <div className="text-sm opacity-50">{row.getValue("email")}</div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{capitalizeFirstLetter(row.getValue("role"))}</div>
  },
  {
    id: "actions",
    header: () => <div className="px-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center ">
          <ConfirmModal
            disabled={row.original.currentUserId === row.original.id}
            header={`Delete ${row.original.fullName}`}
            description={`Are you sure you want to delete ${row.original.fullName}?`}
            onConfirm={() => alert("deleted")}
          >
            <Button variant="icon">
              <Trash size={20} className="text-destructive" weight="bold" />
            </Button>
          </ConfirmModal>
          <InvitePeopleButton preEmail={row.original.email} preRoleId={row.original.roleId}>
            <Button variant="icon" disabled={row.original.currentUserId === row.original.id}>
              <Edit3 size={20} className="text-primary" weight="bold" />
            </Button>
          </InvitePeopleButton>
        </div>
      );
    }
  }
];

function MembersTable({ usersList, currentUserId }) {
  const _usersList = usersList?.map((ele) => ({
    currentUserId,
    id: ele?.user?.id,
    email: ele?.user?.email,
    image: ele?.user?.image,
    fullName: ele?.user?.fullName,
    emailVerified: ele?.user?.emailVerified,
    userStatus: ele?.user?.userStatus,
    role: ele?.role?.name,
    roleId: ele?.role?.id
  }));

  const table = useReactTable({
    data: _usersList,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="rounded-md border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
      <Table className="rounded-md bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function StoreSettings() {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const { usersList } = useSelector((state) => state.organization);
  const { userDetails } = useSelector((state) => state.user);
  const {
    brandDetails: { brandDetails: brandDetailsIdMap }
  } = useSelector((state) => state.brand);

  const [brandName, setBrandName] = useState("");
  const [file, setFile] = useState(null);

  const brandId = searchParams.get("brandId");

  const brandDetails = brandDetailsIdMap[brandId];

  useEffect(() => {
    if (brandId) {
      dispatch(fetchBrandById(brandId));
    }
  }, [dispatch, brandId]);

  useEffect(() => {
    if (brandDetails?.organizationId) {
      dispatch(getAllUsersOfOrganization(brandDetails?.organizationId));
    }
  }, [dispatch, brandDetails?.organizationId]);

  useEffect(() => {
    if (brandDetails) {
      setBrandName(brandDetails.brandName);
    }
  }, [dispatch, brandDetails]);

  return (
    <div className="px-6">
      <div>
        <h3 className="text-xl font-bold mt-4">Store settings</h3>
        <p className="text-xs mt-1 text-[#4F4D55]">Manage store settings</p>
        <div className="mt-8">
          <form>
            <div className="flex mb-6 items-center cursor-pointer" onClick={() => ref.current.click()}>
              <Image
                src={file ? URL.createObjectURL(file) : "/image_placeholder.svg"}
                width={56}
                height={56}
                alt="dcluttr logo"
                className="rounded-xl border object-contain h-14 w-14"
              />
              <div className="ml-3">
                <div className="text-sm text-[#031B15] font-semibold">Image</div>
                <div className="text-xs text-primary font-semibold">Update image</div>
              </div>
              <input onChange={(e) => setFile(e.target.files[0])} type="file" className="hidden" />
            </div>
            <div>
              <Label
                htmlFor="brand_name"
                className="text-black text-sm after:content-['*'] after:ml-0.5 after:text-destructive"
              >
                Store name
              </Label>
              <Input
                className="mt-2"
                id="brand_name"
                type="text"
                placeholder="Enter store name"
                value={brandName}
                onChange={(e) => {
                  console.log("value", e.target.value);
                  // setBrandName(e.target.value);
                }}
              />
            </div>
            <div>
              <Button type="submit" className="mt-8" disabled={brandName === brandDetails?.brandName}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold mt-4">Members</h3>
        <p className="text-xs mt-1 text-[#4F4D55]">Manage store members</p>
        <div className="mt-6">
          {userDetails.id && <MembersTable usersList={usersList} currentUserId={userDetails.id} />}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mt-20">Integrations</h2>
        <p className="text-xs text-[#4F4D55] mt-1">
          Easily connect external apps and platforms with your Dcluttr account to add more to your dashboard
        </p>
        <div className="mt-6">{brandDetails && <SourceConnectGrid brand={brandDetails} />}</div>
      </div>
    </div>
  );
}

export default StoreSettings;
