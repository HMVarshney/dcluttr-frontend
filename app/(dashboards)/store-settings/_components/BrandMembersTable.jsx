import { useMemo } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowDown, Trash } from "phosphor-react";
import InvitePeopleButton from "../../stores/_components/InvitePeopleButton";
import { Edit3 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { capitalizeFirstLetter, cn } from "@/lib/utils";

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

function BrandMembersTable({ usersList, currentUserId }) {
  const _usersList = useMemo(() => {
    return usersList?.map((ele) => ({
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
  }, [currentUserId, usersList]);

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

export default BrandMembersTable;
