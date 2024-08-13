"use client";

import { Suspense, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WelcomeToDcluttr from "../_components/WelcomeToDcluttr";
import BrandDetails from "../_components/BrandDetails";
import PendingApproval from "../_components/PendingApproval";
import ConnectYourData from "../_components/ConnectYourData";
import AllDoneStartUsingDcluttr from "../_components/AllDoneStartUsingDcluttr";
import DecluttrNotWorksInPhone from "@/components/DecluttrNotWorksInPhone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { createQueryString } from "@/lib/utils/request.utils";
import { fetchBrandById } from "@/lib/store/features/brandSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "@/app/(auth)/loading";
import { EmptyTickIcon, TickIcon } from "@/components/Icons";

const steps = [
  {
    title: "Welcome",
    disc: "",
    btnText: "Let’s go!"
  },
  {
    title: "Brand Details",
    disc: "Avg. time to complete: 3 mins",
    btnText: "Completed"
  },
  {
    title: "Pending Approval",
    disc: "Avg. time to complete: 3 mins",
    btnText: "Approved"
  },
  {
    title: "Connect Your Data",
    disc: "Avg. time to complete: 3 mins",
    btnText: "Completed"
  },
  {
    title: "All Set",
    disc: "Avg. time to complete: 3 mins",
    btnText: "None Added"
  }
];

function Welcome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const {
    brandDetails: { loading, brandDetails: brandDetailsIdMap }
  } = useSelector((state) => state.brand);

  const step = Number(searchParams.get("step"));
  const brandId = searchParams.get("brand");

  const brandDetails = brandDetailsIdMap[brandId];

  const setStep = useCallback(
    (stepNumber) => {
      const url = pathname + `?${createQueryString(searchParams, { step: stepNumber })}`;
      router.replace(url);
    },
    [pathname, router, searchParams]
  );

  const goNext = () => setStep(step + 1);

  useEffect(() => {
    if (!step) {
      setStep(1);
    }
  }, [step, setStep]);

  useEffect(() => {
    if (brandId) {
      dispatch(fetchBrandById(brandId));
    }
  }, [brandId, dispatch]);

  useEffect(() => {
    if (step < 4 && brandDetails && brandDetails.brandSettings.isApproved) {
      setStep(4);
    }
    if (step < 3 && brandDetails) {
      setStep(3);
    }
    if (step > 2 && !brandId) {
      setStep(1);
    }
  }, [brandDetails, brandId, step, setStep]);

  if (!step) return null;

  if (loading) {
    return <Loading />;
  }

  const stepsCompletionPercentage = (((step - 1) / 4) * 100)?.toFixed(0);

  return (
    <main className="w-full h-full">
      <DecluttrNotWorksInPhone />
      <div className="lg:grid grid-cols-12 h-full hidden">
        <div className="col-span-5 bg-[#F5F5F5] h-full flex flex-col items-stretch justify-center px-8">
          <div className=" flex justify-between items-center">
            <div className="w-[240px] flex gap-1 items-center">
              <Image src="/logoIcon.svg" alt="logo" width={100} height={100} className="w-8 object-contain" />
              <span className="font-extrabold text-xl text-black">Decluttr</span>
            </div>
            <Link href="/stores">
              <span className="text-primary text-sm">Return to All Stores</span>
            </Link>
          </div>
          <div className="border border-[#0000001F] bg-white rounded-lg p-4 mt-4">
            <div className="font-medium text-sm text-black mb-2">{stepsCompletionPercentage}% Completed</div>
            <Progress value={stepsCompletionPercentage} className="bg-[#0000001F]" />
          </div>
          <div className="border border-[#0000001F] bg-white rounded-lg p-4 flex flex-col gap-2.5 mt-12">
            <div className="font-bold text-lg text-black mb-2.5">Steps involved for Onboarding</div>
            {steps.map((ele, i) => (
              <div className="flex gap-2 border rounded-md px-4 py-3" key={ele.title}>
                {step > i + 1 ? TickIcon : EmptyTickIcon}
                <div>
                  <div className="text-base font-medium">{ele.title}</div>
                  <div className="text-xs font-light text-[#031B15B2]">{ele.disc}</div>
                </div>
                <div
                  className={cn("text-sm font-medium text-[#EC1212] ml-auto mt-2.5", { "text-primary": step > i + 1 })}
                >
                  {step > i + 1 ? ele.btnText : "None Added"}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-7">
          <div className="w-full h-full">
            {step === 1 && <WelcomeToDcluttr goNext={goNext} />}
            {step === 2 && <BrandDetails goNext={goNext} />}
            {step === 3 && <PendingApproval goNext={goNext} />}
            {step === 4 && brandDetails && <ConnectYourData goNext={goNext} brand={brandDetails} />}
            {step === 5 && <AllDoneStartUsingDcluttr brandId={brandDetails?.id} orgId={brandDetails?.organizationId} />}
          </div>
        </div>
      </div>
    </main>
  );
}

function WelcomePage() {
  return (
    <Suspense>
      <Welcome />
    </Suspense>
  );
}

export default WelcomePage;
