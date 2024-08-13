import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sourceConnectURLs, sourceTypes } from "@/lib/constants/sourceConnect";
import ConnectGoogle from "./ConnectGoogle";
import ConnectFacebook from "./ConnectFacebook";

function ConnectYourData({ goNext, brand }) {
  const [openModalType, toggleModal] = useState("");

  const orgId = brand.organizationId;

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

  const disconnectSource = useCallback(() => {}, []);

  const atleastOneSourceConnected =
    brand.brandSourcesInfo?.isFacebookActive ||
    brand.brandSourcesInfo?.isGoogleActive ||
    brand.brandSourcesInfo?.isShopifyActive;

  const sources = useMemo(() => {
    const { isFacebookActive, isGoogleActive, isShopifyActive } = brand.brandSourcesInfo;
    return [
      {
        source: sourceTypes.FACEBOOK,
        title: "Meta Ads",
        desc: isFacebookActive && "View connection details",
        btnText: isFacebookActive ? "Disconnect" : "Connect",
        status: isFacebookActive ? "CONNECTED" : "NOT_CONNECTED",
        icon: "/icons/meta_icon.svg",
        onClick: isFacebookActive ? disconnectSource : connectSource
      },
      {
        source: sourceTypes.GOOGLE,
        title: "Google Ads",
        desc: isGoogleActive && "View connection details",
        btnText: isGoogleActive ? "Disconnect" : "Connect",
        status: isGoogleActive ? "CONNECTED" : "NOT_CONNECTED",
        icon: "/icons/google_ads_icon.svg",
        onClick: isGoogleActive ? disconnectSource : connectSource
      },
      {
        source: sourceTypes.SHOPIFY,
        title: "Shopify",
        desc: isShopifyActive && "View connection details",
        btnText: isShopifyActive ? "Disconnect" : "Connect",
        status: isShopifyActive ? "CONNECTED" : "NOT_CONNECTED",
        icon: "/icons/shopify.svg",
        onClick: isShopifyActive ? disconnectSource : connectSource
      }
    ];
  }, [brand, connectSource, disconnectSource]);

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
                  {item.desc}
                </div>
              </div>
              {item.status !== "COMING" && (
                <Button
                  variant={item.status === "CONNECTED" ? "default" : "outline"}
                  className="ml-auto"
                  size="sm"
                  onClick={() => item.onClick(item.source)}
                >
                  {item.btnText}
                </Button>
              )}
            </div>
          ))}
        </div>
        {atleastOneSourceConnected && (
          <div className="w-full mt-10">
            <Button className="w-full" onClick={goNext}>
              Continue
            </Button>
          </div>
        )}
      </div>

      <ConnectGoogle
        openModal={openModalType === "GOOGLE"}
        onClose={handleModalClose}
        brandId={brand.id}
        orgId={orgId}
      />
      <ConnectFacebook
        openModal={openModalType === "FACEBOOK"}
        onClose={handleModalClose}
        brandId={brand.id}
        orgId={orgId}
      />
    </>
  );
}

export default ConnectYourData;
