import { Export as ExportIcon } from "phosphor-react";
import Hint from "./Hint";
import { Button } from "./ui/button";

function ExportButton({ onExport }) {
  return (
    <Hint label="Export">
      <Button variant="outline" className="px-2.5" onClick={onExport}>
        <ExportIcon />
      </Button>
    </Hint>
  );
}

export default ExportButton;
