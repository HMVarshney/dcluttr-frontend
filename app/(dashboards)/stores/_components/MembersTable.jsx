"use client";

import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash } from "phosphor-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InvitePeopleButton from "./InvitePeopleButton";
import ConfirmModal from "@/components/ConfirmModal";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Edit3, ArrowDown } from "lucide-react";

export const columns = [
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
  },
  {
    accessorKey: "role",
    header: "Access",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role") === "ADMIN" ? "All store" : "Limited stores"}</div>
    )
  },
  {
    accessorKey: "userStatus",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("userStatus")}</div>
  }
];

export default function MembersTable({ usersList, currentUserId }) {
  const data = useMemo(
    () =>
      usersList?.map((ele) => ({
        currentUserId: currentUserId,
        id: ele?.user?.id,
        email: ele?.user?.email,
        image: ele?.user?.image,
        fullName: ele?.user?.fullName,
        emailVerified: ele?.user?.emailVerified,
        userStatus: ele?.user?.userStatus,
        role: ele?.role?.name,
        roleId: ele?.role?.id
      })),
    [currentUserId, usersList]
  );

  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      rowSelection
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection
  });

  return (
    <div className="px-6 pb-8">
      <h3 className="text-xl font-bold mt-4">Team</h3>
      <p className="text-xs mt-1 mb-6 text-[#4F4D55]">Manage access and security for your organisation</p>
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
      <InvitePeopleButton>
        <Button className="mt-8">Invite people</Button>
      </InvitePeopleButton>
    </div>
  );
}
