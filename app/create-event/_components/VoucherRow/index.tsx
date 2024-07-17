
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CgRemove } from "react-icons/cg";
import { z } from "zod";


const voucherRowSchema = z.object({
  name: z.string().min(1, "Voucher name is required"),
  rate: z.bigint(),
  qty: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  referralOnly: z.boolean()
});

function VoucherRow({
  index,
  removeRow,
}: {
  index: number;
  removeRow: (index: number) => void;
}) {

  const { control, watch } = useFormContext();
  const isReferral = watch(`vouchers.${index}.isReferral`);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-x-4 mb-4">
      <FormField
        control={control}
        name={`vouchers.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md mb-2 text-luxtix-8">Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Voucher name"
                className="w-full p-2 border border-input rounded"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`vouchers.${index}.qty`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md mb-2 text-luxtix-8">QTY</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Quantity"
                className="w-full p-2 border border-input rounded"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`vouchers.${index}.rate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md mb-2 text-luxtix-8">
              Rate (%)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Discount rate"
                className="w-full p-2 border border-input rounded"
                {...field}
                disabled={isReferral}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`vouchers.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md mb-2 text-luxtix-8">
              Start Date
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                className="w-full p-2 border border-input rounded"
                {...field}
                disabled={isReferral}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`vouchers.${index}.endDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md mb-2 text-luxtix-8">
              End Date
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                className="w-full p-2 border border-input rounded"
                {...field}
                disabled={isReferral}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-end justify-end">
        <FormField
          control={control}
          name={`vouchers.${index}.isReferral`}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Set as referral voucher?</FormLabel>
            </FormItem>
          )}
        />
        <button
          type="button"
          onClick={() => removeRow(index)}
          className="btn-anim p-2 text-luxtix-3 mt-2"
        >
          <CgRemove size={20} />
        </button>
      </div>
    </div>
  );
}

export default VoucherRow;
