import React, { Fragment, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateInsightsPopUp } from "@/lib/store/features/creativeSlice";
import Hint from "@/components/Hint";

export default function CreativeInsightsPopUp() {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.creative.insightsPopUp);
  console.log(data);

  return (
    <Dialog open={isOpen} onOpenChange={(e) => dispatch(updateInsightsPopUp({ isOpen: e }))}>
      <DialogContent className=" bg-white border-none h-[90vh] min-w-[80%] p-0 overflow-hidden gap-0">
        <div className="border-b px-4 py-3 max-h-20">
          <div className="text-lg font-semibold">Creative insights</div>
        </div>
        <div className="flex divide-x items-stretch overflow-hidden">
          <div className="w-1/2 bg-[#ebebeb79] flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-72 ">
              <div className="w-full p-3">
                <Hint
                  label={"Slay in luxury. Combine bold colors and effortless application for a look that lasts✨"}
                  align="top"
                >
                  <div className="text-sm text-gray-700 font-medium line-clamp-2">
                    Slay in luxury. Combine bold colors and effortless application for a look that lasts✨
                  </div>
                </Hint>
              </div>
              <img
                src="https://s.yimg.com/ny/api/res/1.2/Xq1ju7co8KRI5oJznyu1LA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY1MTtjZj13ZWJw/https://o.aolcdn.com/images/dims?resize=2000%2C2000%2Cshrink&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2018-12%2F4830f030-04d6-11e9-9efb-324de7e29ad5&client=a1acac3e1b3290917d92&signature=b6d816abc2c61973b8e76c036d99c0448c32a1f6"
                className="w-full h-72 object-cover"
                alt="sm"
              />
              <div className="w-full p-3 flex items-center justify-between gap-3">
                <div className="">
                  <span className="text-sm font-semibold line-clamp-1">{data?.meta_ads_name ?? "-"}</span>
                  <span className="text-gray-400 font-normal line-clamp-1 text-xs">{data?.meta_ad_sets_name ?? "-"}</span>
                </div>
                <Button variant="outline" size="sm" className="text-sm">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-4 h-full overflow-y-auto">
            <div className="text-base font-bold mb-4 text-gray-600">Details</div>
            <div className="grid grid-cols-2 gap-4 grid-flow-row text-sm">
              <div className="text-gray-400">Name</div>
              <div className="text-gray-600 line-clamp-1">{data?.meta_ads_name ?? "-"}</div>
              <div className="text-gray-400">Ad set name</div>
              <div className="text-gray-600 line-clamp-1">{data?.meta_ad_sets_name ?? "-"}</div>
              <div className="text-gray-400">Campaign name</div>
              <div className="text-gray-600 line-clamp-1">{data?.meta_campaign_name ?? "-"}</div>
              <div className="text-gray-400">Status</div>
              <div className="text-gray-600 line-clamp-1 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary border-2 border-green/80" />
                Active
              </div>
            </div>
            <hr className="my-4 -mx-4" />
            <div className="text-base font-bold mb-4 text-gray-600">Performance metrics</div>
            <div className="grid grid-cols-2 gap-4 grid-flow-row text-sm">
              {Object.entries(data ?? {}).map(
                ([k, v], i) =>
                  !k?.includes("_name") && (
                    <Fragment key={i}>
                      <div className="text-gray-400 capitalize">{k?.replace(/_/g, " ")}</div>
                      <div className="text-gray-600 line-clamp-1">{v ?? "-"}</div>
                    </Fragment>
                  )
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
