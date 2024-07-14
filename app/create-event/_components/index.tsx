"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsDoorOpen, BsCurrencyDollar } from "react-icons/bs";
import TicketRow from "./TicketRow";
import VoucherRow from "./VoucherRow";
import { useCreateEvent } from "@/hooks/useCreateEvent";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const eventCategories = [
  "Entertainment",
  "Educational & Business",
  "Arts & Culture",
  "Sports & Fitness",
  "Technology & Innovation",
  "Travel & Adventure",
];

const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  category: z.number().min(1, "Event category is required"),
  isOnline: z.boolean(),
  eventDate: z.string().min(1, "Event date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  venue: z.string().min(1, "Venue name is required"),
  address: z.string().min(1, "Venue address is required"),
  city: z.number().min(1, "City is required"),
  description: z.string(),
  isPaid: z.boolean(),
  tickets: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      qty: z.number(),
    })
  ),
  vouchers: z.array(
    z.object({
      name: z.string(),
      qty: z.number(),
      rate: z.number(),
      startDate: z.string(),
      endDate: z.string(),
      referralOnly: z.boolean(),
    })
  ),
  acceptReferralVoucher: z.boolean(),
  referralVoucherName: z.string().optional(),
  referralVoucherQuantity: z.number().optional(),
});

function CreateEvent() {
  const router = useRouter();
  const { createEvent, isLoading, error } = useCreateEvent();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      category: 1,
      isOnline: false,
      eventDate: "",
      startTime: "",
      endTime: "",
      venue: "",
      address: "",
      city: 1,
      description: "",
      isPaid: false,
      tickets: [],
      vouchers: [],
      acceptReferralVoucher: false,
      referralVoucherName: "",
      referralVoucherQuantity: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createEventSchema>) => {
    try {
      const result = await createEvent(data);
      if (result) {
        toast({
          title: "Event Created",
          description: "Your event has been successfully created.",
          duration: 3000,
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to create event:", err);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [ticketRows, setTicketRows] = useState([{ id: 0 }]);
  const [voucherRows, setVoucherRows] = useState([{ id: 0 }]);

  const addTicketRow = () => {
    const newTicketRow = { id: ticketRows.length };
    setTicketRows([...ticketRows, newTicketRow]);
  };

  const removeTicketRow = (indexToRemove: number) => {
    const updatedRows = ticketRows.filter(
      (_, index) => index !== indexToRemove
    );
    setTicketRows(updatedRows);
  };

  const addVoucherRow = () => {
    const newVoucherRow = { id: voucherRows.length };
    setVoucherRows([...voucherRows, newVoucherRow]);
  };

  const removeVoucherRow = (indexToRemove: number) => {
    const updatedRows = voucherRows.filter(
      (_, index) => index !== indexToRemove
    );
    setVoucherRows(updatedRows);
  };

  return (
    <Form {...form}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="block sm:py-6">
          <Link href="/" className="text-luxtix-1">
            <AiOutlineArrowLeft size={25} />
          </Link>
        </div>

        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-4">Event Details</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the name of your event"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {eventCategories.map((category, index) => (
                      <SelectItem key={category} value={(index + 1).toString()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
          <FormField
            control={form.control}
            name="isOnline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value.toString()}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">Offline</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Online</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where will your event take place?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue Address</FormLabel>
                <FormControl>
                  <Input placeholder="Where is the venue located?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Jakarta</SelectItem>
                    <SelectItem value="2">Surabaya</SelectItem>
                    <SelectItem value="3">Bandung</SelectItem>
                    <SelectItem value="4">Medan</SelectItem>
                    <SelectItem value="5">Semarang</SelectItem>
                    <SelectItem value="6">Makassar</SelectItem>
                    <SelectItem value="7">Palembang</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what's special about your event & other important details."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <Input type="file" />
          <p className="text-sm text-luxtix-7 mt-2">
            Feature Image must be at least 1170 pixels wide by 504 pixels high.
            Valid file formats: JPG, GIF, PNG.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            What type of event are you running?
          </h2>
          <FormField
            control={form.control}
            name="isPaid"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value.toString()}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <BsCurrencyDollar className="inline-block mr-2" />
                        Paid Event
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <BsDoorOpen className="inline-block mr-2" />
                        Free Event
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            What tickets are you selling?
          </h2>
          <div className="py-2">
            {ticketRows.map((_, index) => (
              <TicketRow
                key={index}
                index={index}
                removeRow={removeTicketRow}
              />
            ))}
            <button
              onClick={addTicketRow}
              className="btn-anim bg-luxtix-4 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
            >
              Add Ticket
            </button>
          </div>
        </section>

        {form.watch("isPaid") && (
          <>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Do you want to create promotional voucher?
              </h2>
              <div className="py-2">
                {voucherRows.map((_, index) => (
                  <VoucherRow
                    key={index}
                    index={index}
                    removeRow={removeVoucherRow}
                  />
                ))}
                <button
                  onClick={addVoucherRow}
                  className="btn-anim bg-luxtix-4 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
                >
                  Add Voucher
                </button>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Do you accept referral voucher?
              </h2>
              <FormField
                control={form.control}
                name="acceptReferralVoucher"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Yes, I accept referral vouchers</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch("acceptReferralVoucher") && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  <FormField
                    name="referralVoucherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Voucher Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="referralVoucherQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>QTY</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="QTY 0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </section>
          </>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 px-4 py-2 rounded-lg"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default CreateEvent;
