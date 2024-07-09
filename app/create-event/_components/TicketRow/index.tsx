import { FormField } from "@/components/ui/form";
import { CgRemove } from "react-icons/cg";

function TicketRow({
  index,
  removeRow,
}: {
  index: number;
  removeRow: (index: number) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 mb-4">
        {/* <FormField
          label="Ticket Name"
          type="text"
          placeholder="e.g. General Admission"
        />
        <FormField label="Ticket Price" type="number" placeholder="IDR 0.00" />
        <FormField label="Ticket Quantity" type="number" placeholder="QTY 0" /> */}
        <div className="flex flex-row">
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="btn-anim p-2 text-luxtix-3"
          >
            <CgRemove size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketRow;
