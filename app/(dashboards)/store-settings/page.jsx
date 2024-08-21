"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { fetchBrandById, updateBrand } from "@/lib/store/features/brandSlice";
import { useSearchParams } from "next/navigation";
import SourceConnectGrid from "@/components/shared/SourceConnect/SourceConnectGrid";
import { getAllUsersOfOrganization } from "@/lib/store/features/organizationSlice";
import withSuspense from "@/lib/hoc/withSuspense";
import BrandMembersTable from "./_components/BrandMembersTable";

function renderImageFromFileOrString(file) {
  if (!file) return "";
  if (file instanceof File) return URL.createObjectURL(file);
  return file;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateBrand({
        id: brandDetails.id,
        name: brandName,
        orgId: brandDetails.organizationId,
        website: brandDetails.brandWebSite,
        monthlyAdSpend: brandDetails.brandMonthlyAdSpend,
        ...(file instanceof File && { file })
      })
    );
  };

  useEffect(() => {
    if (brandId) {
      dispatch(fetchBrandById(brandId))
        .unwrap()
        .then((brandResponse) => {
          setBrandName(brandResponse.data.brandName);
          setFile(brandResponse.data.brandLogo);
          dispatch(getAllUsersOfOrganization(brandResponse.data.organizationId));
        });
    }
  }, [dispatch, brandId]);

  return (
    <div className="px-6">
      <div>
        <h3 className="text-xl font-bold mt-4">Store settings</h3>
        <p className="text-xs mt-1 text-[#4F4D55]">Manage store settings</p>
        <div className="mt-8">
          <form>
            <div className="flex mb-6 items-center cursor-pointer">
              <Image
                src={renderImageFromFileOrString(file) || "/image_placeholder.svg"}
                width={56}
                height={56}
                alt="brand logo"
                className="rounded-xl border object-contain h-14 w-14"
              />
              <div className="ml-3">
                <div className="text-sm text-[#031B15] font-semibold">Image</div>
                <label className="text-xs text-primary font-semibold cursor-pointer" htmlFor="image_input">
                  Update image
                </label>
              </div>
              <input id="image_input" onChange={(e) => setFile(e.target.files[0])} type="file" className="hidden" />
            </div>
            <div>
              <Label htmlFor="brand_name" className="text-black text-sm after:content-['*'] after:ml-0.5 after:text-destructive">
                Store name
              </Label>
              <Input
                className="mt-2"
                id="brand_name"
                type="text"
                placeholder="Enter store name"
                value={brandName}
                onChange={(e) => {
                  setBrandName(e.target.value);
                }}
              />
            </div>
            <div>
              <Button type="submit" className="mt-8" disabled={brandName === brandDetails?.brandName} onClick={handleSubmit}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold mt-4">Members</h3>
        <p className="text-xs mt-1 text-[#4F4D55]">Manage store members</p>
        <div className="mt-6">{userDetails.id && <BrandMembersTable usersList={usersList} currentUserId={userDetails.id} />}</div>
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

export default withSuspense(StoreSettings);
