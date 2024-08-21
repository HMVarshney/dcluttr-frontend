import SourceConnectGrid from "@/components/shared/SourceConnect/SourceConnectGrid";
import { Button } from "@/components/ui/button";

function ConnectYourData({ goNext, brand }) {
  const atleastOneSourceConnected =
    brand.brandSourcesInfo?.isFacebookActive ||
    brand.brandSourcesInfo?.isGoogleActive ||
    brand.brandSourcesInfo?.isShopifyActive;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-20">
      <h2 className="text-4xl font-bold mt-20">Connect your Data</h2>
      <p className="text-xs mt-4 mb-10 w-2/3 text-center">
        Dcluttr brings all of your data together to give you a clear view of your customer journey. Connect ad platforms
        and marketing tools to Dcluttr to see every step in your customer journey.
      </p>
      <SourceConnectGrid brand={brand} />
      {atleastOneSourceConnected && (
        <div className="w-full mt-10">
          <Button className="w-full" onClick={goNext}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}

export default ConnectYourData;
