"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import StoresSettings from "../_components/StoresSettings";
import MembersTable from "../_components/MembersTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/app/(auth)/loading";
import { getAllUsersOfOrganization } from "@/lib/store/features/organizationSlice";

export default function Page() {
  const dispatch = useDispatch();
  const { usersList, status, organizationDetails } = useSelector((state) => state.organization);
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (organizationDetails?.id) {
      dispatch(getAllUsersOfOrganization(organizationDetails?.id));
    }
  }, [dispatch, organizationDetails?.id]);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-5 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/stores">All stores</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/stores/settings">Org settings</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <StoresSettings organizationDetails={organizationDetails} />
          <MembersTable usersList={usersList} currentUserId={userDetails.id} />
        </>
      )}
    </ScrollArea>
  );
}
