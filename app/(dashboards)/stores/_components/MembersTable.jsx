"use client"


import React from 'react'

export default function MembersTable({ data }) {
    return (
        <div className="container mx-auto overflow-x-auto rounded shadow">
            <table className="table w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-3">
                            User details↓
                        </th>
                        <th scope="col" className="p-3">
                            Role
                        </th>
                        <th scope="col" className="p-3">
                            Settings
                        </th>
                        <th scope="col" className="p-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.email} className="border-b hover:bg-gray-100">
                            <td className="p-3">
                                {user.name} ({user.you ? 'you' : ''})
                                <br />
                                {user.email}
                            </td>
                            <td className="p-3">{user.role}</td>
                            <td className="p-3">
                                <span className="text-red-500 hover:underline">Delete</span>
                                <br />
                                <span className="text-blue-500 hover:underline">Modify User Access</span>
                            </td>
                            <td className="p-3">{/* Add Your Content Here */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

