import { useState } from "react";
import { DotsSixVertical, SquareHalf, X } from "phosphor-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ExportButton from "@/components/ExportButton";
import DataTable from "./DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DashboardTableHeader({
  title,
  description,
  columns,
  columnVisibility,
  columnOrder,
  setColumnVisibility,
  setColumnOrdering
}) {
  return (
    <div className="flex items-center justify-center gap-2 p-6">
      <div className="mr-auto">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-[#4F4D55] text-xs">{description}</div>
      </div>
      <div>
        <ExportButton onExport={() => exportCampaignWiseTable(allData, campaignData.parsed?.columns || {})} />
      </div>
      <EditTableAttribution
        columns={columns}
        columnVisibility={columnVisibility}
        columnOrder={columnOrder}
        setColumnVisibility={setColumnVisibility}
        setColumnOrdering={setColumnOrdering}
      >
        <Button variant="outline" className="px-2.5">
          <SquareHalf className="w-5 h-5" />
        </Button>
      </EditTableAttribution>
    </div>
  );
}

export function DashboardTableBody({ loading, error, data, ...reactTableProps }) {
  const { results, columns } = data;
  return (
    <div className="px-6 pb-8 w-full h-full">
      <div className="h-full rounded-md overflow-scroll border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
        {loading ? (
          <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
        ) : error ? (
          <div className="text-destructive p-4 shadow-sm">{error}</div>
        ) : (
          <DataTable data={results} columns={columns} {...reactTableProps} />
        )}
      </div>
    </div>
  );
}

export function EditTableAttribution({
  children,
  columns,
  columnVisibility,
  columnOrder,
  setColumnVisibility,
  setColumnOrdering
}) {
  const [isOpen, setOpen] = useState(false);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...columnOrder];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setColumnOrdering(items);
  };

  return (
    <Popover open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[340px] max-h-[600px] -mt-40 mr-10 p-0 overflow-y-auto" align="end">
        <div className="w-full flex items-center justify-between gap-2 p-6 border-b sticky top-0 bg-white">
          <div className=" text-base font-bold">Edit: Dcluttr Preset</div>
          <X className="w-5 h-5" onClick={() => setOpen(false)} />
        </div>

        <div className="py-3 px-6 text-sm font-medium text-[#031B1599]">INCLUDED ITEMS</div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="imageUrls" direction="vertical">
            {(provided) => (
              <div className="flex flex-col" {...provided.droppableProps} ref={provided.innerRef}>
                {[...columns]
                  .sort((a, b) => (columnVisibility[b.key] === true) - (columnVisibility[a.key] === true))
                  .map((col, i) => (
                    <Draggable key={i} draggableId={`image-${i}`} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border-b py-3.5 px-6 w-full flex items-center ${
                            snapshot.isDragging ? "bg-blue-100 shadow-lg z-50" : ""
                          }`}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                        >
                          <DotsSixVertical size={16} color="#031B15" className="mr-4" />
                          <div className="text-base font-semibold"> {col.shortTitle}</div>
                          <input
                            type="checkbox"
                            className={cn(
                              "min-w-4 h-4 accent-primary hover:accent-primary/80 rounded ml-auto",
                              " cursor-pointer"
                            )}
                            checked={!!columnVisibility[col.key]}
                            onChange={(event) => {
                              setColumnVisibility(col.key, event.target.checked);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                <div className="w-[340px] bg-[#dbdbdb8c]">{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
          <div className="w-full flex items-center justify-end gap-2.5 p-4 border-t sticky bottom-0 bg-white">
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </DragDropContext>
      </PopoverContent>
    </Popover>
  );
}
