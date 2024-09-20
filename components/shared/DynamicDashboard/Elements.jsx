import { cn } from "@/lib/utils";

export function GridItem({ id, children, gridstackOptions }) {
  const { x, y, w, h } = gridstackOptions;
  console.log("gridstackOptions", gridstackOptions);
  return (
    <div className={cn("grid-stack-item", "ui-resizable-autohide")} gs-id={id} gs-x={x} gs-y={y} gs-w={w} gs-h={h}>
      <div className="grid-stack-item-content">{children}</div>
    </div>
  );
}
