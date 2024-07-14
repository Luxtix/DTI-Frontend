import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CgRemove } from "react-icons/cg";

const voucherRowSchema = z.object({
  voucherName: z.string().min(1, "Voucher name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

function VoucherRow({
  index,
  removeRow,
}: {
  index: number;
  removeRow: (index: number) => void;
}) {
  const form = useForm<z.infer<typeof voucherRowSchema>>({
    resolver: zodResolver(voucherRowSchema),
    defaultValues: {
      voucherName: "",
      startDate: "",
      endDate: "",
    },
  });

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 mb-4">
        <FormField
          control={form.control}
          name="voucherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md mb-2 text-luxtix-8">
                Voucher Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter voucher name"
                  className="w-full p-2 border border-input rounded"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md mb-2 text-luxtix-8">
                Start Date
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  className="w-full p-2 border border-input rounded"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md mb-2 text-luxtix-8">
                End Date
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  className="w-full p-2 border border-input rounded"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-end">
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="btn-anim p-2 text-luxtix-3"
          >
            <CgRemove size={20} />
          </button>
        </div>
      </div>
    </Form>
  );
}

export default VoucherRow;
