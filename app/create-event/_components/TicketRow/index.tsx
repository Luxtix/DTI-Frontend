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

const ticketRowSchema = z.object({
  ticketName: z.string().min(1, "Ticket name is required"),
  ticketPrice: z.number().min(0, "Price must be 0 or greater"),
  ticketQuantity: z.number().int().min(1, "Quantity must be at least 1"),
});

function TicketRow({
  index,
  removeRow,
}: {
  index: number;
  removeRow: (index: number) => void;
}) {
  const form = useForm<z.infer<typeof ticketRowSchema>>({
    resolver: zodResolver(ticketRowSchema),
    defaultValues: {
      ticketName: "",
      ticketPrice: 0,
      ticketQuantity: 1,
    },
  });

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 mb-4">
        <FormField
          control={form.control}
          name="ticketName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. General Admission" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticketPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="IDR 0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticketQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="QTY 0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
    </Form>
  );
}

export default TicketRow;
