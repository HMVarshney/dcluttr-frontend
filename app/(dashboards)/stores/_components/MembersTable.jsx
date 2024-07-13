"use client"

import React, { useState } from "react"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash } from "phosphor-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import InvitePeopleButton from "./InvitePeopleButton"

const data = [
    {
        id: "m5gr84i9",
        name: "Shiva Singh (You)",
        role: "Organization",
        email: "ritvik@organization.club",
    },
    {
        id: "3u1reuv4",
        name: "Shiva Singh (You)",
        role: "Organization",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        name: "Shiva Singh (You)",
        role: "lalala",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        name: "Shiva Singh (You)",
        role: "Organization",
        email: "Silas22@gmail.com",
    },
]


export const columns = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User details
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocIRon2cY0wIwVnv9sxbxtnV3VyEN6SO51SN3ndz6QD3Sea8FXYB=s96-c" alt={'fullName'} />
                        <AvatarFallback>{'FullName'.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold">{row.original.name}</div>
                        <div className="text-sm opacity-50">{row.getValue("email")}</div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("role")}</div>
        ),
    },
    {
        accessorKey: "id",
        header: "Settings",
        cell: ({ row }) => {
            return (
                <button className="flex items-center gap-1">
                    <Trash size={20} className="text-destructive" weight="bold" />
                    <span className="font-medium text-destructive">Delete</span>
                </button>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="w-40 p-0 bg-white">
                            Modify User Access
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            option 1
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>option 1</DropdownMenuItem>
                        <DropdownMenuItem>option 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function MembersTable() {
    const [sorting, setSorting] = useState([])
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    })

    return (
        <div className="px-6 pb-8">
            <h3 className='text-xl font-bold mt-4'>
                Members
            </h3>
            <p className='text-xs mt-1 mb-6 text-[#4F4D55]'>
                Find all the brand for store
            </p>
            <div className="rounded-md border shadow">
                <Table className="rounded-md bg-white">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <InvitePeopleButton />
        </div>
    )
}
