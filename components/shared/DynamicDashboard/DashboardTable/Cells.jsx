import Link from "next/link";
import { ArrowSquareOut, CaretDown, CaretRight } from "phosphor-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function SwitchCell({ getValue }) {
  return (
    <div className="flex items-center justify-center w-20">
      <Switch checked={getValue() === "ACTIVE"} />
    </div>
  );
}

export function LinkCell({ row, getValue }) {
  return (
    <div className="flex items-center gap-4">
      <div className="min-w-32">
        <span className="line-clamp-1 text-primary font-semibold">{getValue()}</span>
      </div>
      {row.original.link && (
        <Link href={row.original.link} target="_blank">
          <ArrowSquareOut size={20} className="text-primary font-semibold cursor-pointer" />
        </Link>
      )}
    </div>
  );
}

export function ExpandCell({ row, expandHandler }) {
  return (
    <div
      className={cn({ "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
      onClick={() => expandHandler(row)}
      style={{ cursor: "pointer" }}
    >
      {row.getCanExpand() ? row.getIsExpanded() ? <CaretDown className="min-w-4" /> : <CaretRight className="min-w-4" /> : null}
    </div>
  );
}

export function DefaultCell({ getValue }) {
  return <div className="min-w-32">{getValue()}</div>;
}
