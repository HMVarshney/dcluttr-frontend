import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import ConnectGoogle from "./ConnectGoogle";
import { toast } from "sonner";
import { sourceConnectURLs } from "@/lib/constants/sourceConnect";
import ConnectFacebook from "./ConnectFacebook";

const sources = [
  {
    title: "Meta Ads",
    // disc: "View Connection details",
    btnText: "Connect",
    status: "NOT_CONNECTED",
    icon: "/icons/meta_icon.svg",
    source: "FACEBOOK"
  },
  {
    title: "Google Ads",
    btnText: "Connect",
    status: "NOT_CONNECTED",
    icon: "/icons/google_ads_icon.svg",
    source: "GOOGLE"
  },
  {
    title: "Klaviyo",
    disc: "Coming Soon",
    btnText: null,
    status: "COMING",
    icon: "/icons/klaviyo_icon.svg",
    source: "KLAVIYO"
  }
];

function ConnectYourData({ goNext, brandId, orgId }) {
  const [openModalType, toggleModal] = useState("FACEBOOK");

  const handleModalClose = () => toggleModal("");

  const connectSource = useCallback((sourceName) => {
    const loginChildWindow = window.open(sourceConnectURLs[sourceName], "_blank", "height=600,width=900");
    const checkPopup = setInterval(() => {
      try {
        if (loginChildWindow.window.location.href.includes(window.location.hostname)) {
          const callbackURL = loginChildWindow.location.href;
          loginChildWindow.close();
          toggleModal(sourceName);
          toast.success("Authentication successful");
        }
      } catch (err) {}
      if (!loginChildWindow || !loginChildWindow.closed) return;
      clearInterval(checkPopup);
    }, 1500);
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center px-20">
        <h2 className="text-4xl font-bold mt-20">Connect your Data</h2>
        <p className="text-xs mt-4 mb-10 w-2/3 text-center">
          Dcluttr brings all of your data together to give you a clear view of your customer journey. Connect ad
          platforms and marketing tools to Dcluttr to see every step in your customer journey.
        </p>
        <div className="grid grid-cols-2 gap-3 w-full">
          {sources.map((item, index) => (
            <div className="border border-[#0000001F] bg-white rounded-lg p-4 flex" key={index}>
              <div>
                <div className="font-bold text-base text-black flex">
                  <Image src={item.icon} alt="logo" width={100} height={100} className="w-5 object-contain mr-2.5" />
                  {item.title}
                </div>
                <div
                  className={cn("text-sm text-[#031B1599]", { "text-primary underline": item.status === "CONNECTED" })}
                >
                  {item.disc}
                </div>
              </div>
              {item.status !== "COMING" && (
                <Button
                  variant={item.status === "CONNECTED" ? "default" : "outline"}
                  className="ml-auto"
                  size="sm"
                  onClick={() => connectSource(item.source)}
                >
                  {item.btnText}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <ConnectGoogle
        openModal={openModalType === "GOOGLE"}
        onClose={handleModalClose}
        brandId={brandId}
        orgId={orgId}
      />
      <ConnectFacebook
        openModal={openModalType === "FACEBOOK"}
        onClose={handleModalClose}
        brandId={brandId}
        orgId={orgId}
      />
    </>
  );
}

export default ConnectYourData;
