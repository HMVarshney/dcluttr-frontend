import Link from "next/link";
import { ArrowSquareOut, CaretDown, CaretRight } from "phosphor-react";
import { Switch } from "@/components/ui/switch";
import { cn, TABLE_CHECKBOX_COLORS } from "@/lib/utils";
import { LineChart } from "lucide-react";
import Hint from "@/components/Hint";

export function SwitchCell({ getValue }) {
  return (
    <div className="flex items-center justify-center w-20">
      <Switch checked={getValue() === "ACTIVE"} />
    </div>
  );
}

export function NameAndLinkCell({ row, getValue, expandHandler }) {
  return (
    <div className="flex items-center gap-4 group">
      <div
        className={cn("w-72 flex items-center gap-2", { "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
        {...{
          onClick: row.getToggleExpandedHandler(),
          style: { cursor: "pointer" }
        }}
      >
        <Hint label={getValue()}>
          <span
            className="line-clamp-1 text-primary font-semibold"
            onClick={() => dispatch(updateInsightsPopUp({ isOpen: true, data: row.original }))}
          >
            {getValue()}
          </span>
        </Hint>
        <Link href={row.original.url ?? "#"} target="_blank" className=" opacity-0 group-hover:opacity-100">
          <ArrowSquareOut size={20} className="text-primary font-semibold cursor-pointer" />
        </Link>
      </div>
      {expandHandler && (
        <div
          className={cn({ "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
          onClick={() => expandHandler(row)}
          style={{ cursor: "pointer" }}
        >
          {row.getCanExpand() ? (
            row.getIsExpanded() ? (
              <CaretDown className="min-w-4" />
            ) : (
              <CaretRight className="min-w-4" />
            )
          ) : null}
        </div>
      )}
    </div>
  );
}

export function CheckboxHeader({ table }) {
  return (
    <div className="flex items-center justify-start text-sm gap-3">
      <LineChart className="w-5 h-5" />
      Status
    </div>
  );
}

export function DefaultCell({ getValue }) {
  return <div className="whitespace-nowrap line-clamp-1">{getValue()}</div>;
}

export function CheckboxCell({ row }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="inline-flex items-center">
        <label className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            className={cn(
              "peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow-none border border-[#CDD1D0] ",
              TABLE_CHECKBOX_COLORS[row.index % TABLE_CHECKBOX_COLORS.length].className
            )}
            id="check4"
            onChange={row.getToggleSelectedHandler()}
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
      </div>
      <div className="w-3 h-3 rounded-full bg-primary mx-auto border-2 border-green/80" />
    </div>
  );
}
