import { FormField } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { CgRemove } from "react-icons/cg";

function VoucherRow({
  index,
  removeRow,
}: {
  index: number;
  removeRow: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 mb-4">
      <FormField label="Voucher Name" type="text" placeholder="Voucher Name" />
      <FormField label="Voucher Quantity" type="number" placeholder="QTY 0" />
      <FormField label="Voucher Discount (%)" type="number" placeholder="0" />
      <div>
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <Input type="date" placeholder="DD/MM/YYYY" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">End Date</label>
        <Input
          type="date"
          placeholder="DD/MM/YYYY"
          className="w-full p-2 border border-input rounded"
        />
      </div>
      <div className="flex flex-row">
        <button
          type="button"
          onClick={() => removeRow(index)}
          className="p-2 text-luxtix-3"
        >
          <CgRemove size={20} />
        </button>
      </div>
    </div>
  );
}

export default VoucherRow;
