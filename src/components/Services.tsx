"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { services, addons, carDetailingBundles, frequencies } from "@/lib/data";
import { submitServiceRequest } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const requestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  date: z.date().optional(),
});

export default function Services() {
  const [serviceType, setServiceType] = useState(services[0].name);
  const [sqft, setSqft] = useState(1500);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("one-time");
  const [bundle, setBundle] = useState("none");

  const { toast } = useToast();
  const [state, formAction] = useActionState(submitServiceRequest, null);

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<{ name: string; email: string; phone: string; address: string; date?: Date | undefined; }>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", date: undefined },
  });

  const selectedService = useMemo(() => services.find((s) => s.name === serviceType)!, [serviceType]);

  const isClean = serviceType.includes("Clean");
  const selectedFrequency = frequencies.find((f) => f.id === frequency) || frequencies[0];

  const price = useMemo(() => {
    if (!selectedService || selectedService.basePrice === null) return null;
    const basePrice = selectedService.basePrice;
    const sqftCharge = isClean ? Math.max(0, sqft - 1000) * (selectedService.pricePerSqFt || 0) : 0;
    const extrasPrice = serviceType === "Car Detailing"
      ? (carDetailingBundles.find((b) => b.id === bundle)?.price || 0)
      : selectedAddons.reduce((total, addonId) => total + (addons.find((a) => a.id === addonId)?.price || 0), 0);
    const discount = isClean ? selectedFrequency.discount : 0;
    return Math.round((basePrice + sqftCharge + extrasPrice) * (1 - discount));
  }, [selectedService, sqft, selectedAddons, serviceType, bundle, isClean, selectedFrequency]);

  useEffect(() => {
    if (state?.type === "success") {
      toast({ title: "Request Submitted!", description: state.message });
      reset();
      setServiceType(services[0].name);
      setSqft(1500);
      setSelectedAddons([]);
      setFrequency("one-time");
      setBundle("none");
      trackEvent('submit_form', { form_id: 'services-estimator' });
      trackEvent('generate_lead', { method: 'services_estimator' });
    } else if (state?.type === "error") {
      toast({ title: "Error", description: state.message, variant: "destructive" as any });
      trackEvent('form_error', { form_id: 'services-estimator' });
    }
  }, [state, toast, reset]);


  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80">Choose a service, customize your cleaning, and get an instant price estimate. It's that simple.</p>
        </div>

        <Card className="mt-12 max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Create Your Cleaning Plan</CardTitle>
            <CardDescription>Follow the steps below to get an estimated price for your service.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Step 1: Select Your Service</Label>
                <RadioGroup value={serviceType} onValueChange={(value) => { setServiceType(value); setSelectedAddons([]); }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <Label key={service.name} htmlFor={service.name} className="block cursor-pointer rounded-lg border bg-card p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                      <RadioGroupItem value={service.name} id={service.name} className="sr-only" />
                      <div className="flex items-center gap-3">
                        <service.icon className="h-6 w-6 text-primary" />
                        <span className="font-bold">{service.name}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {isClean && selectedService.pricePerSqFt !== null && (
                <div className="space-y-4">
                  <Label htmlFor="sqft" className="text-lg font-semibold">Step 2: Home Size</Label>
                  <div className="flex items-center gap-4">
                    <Slider id="sqft" min={500} max={4000} step={100} value={[sqft]} onValueChange={(v) => setSqft(v[0] || 1500)} className="w-full" />
                    <span className="w-24 text-right tabular-nums">{sqft} sqft</span>
                  </div>
                </div>
              )}

              {isClean && (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Step 3: How Often?</Label>
                  <p className="text-sm text-muted-foreground">Regulars get the family rate — the more we visit, the more you save.</p>
                  <RadioGroup value={frequency} onValueChange={setFrequency} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {frequencies.map((f) => (
                      <Label key={f.id} htmlFor={`freq-${f.id}`} className="block cursor-pointer rounded-lg border bg-card p-3 text-center has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                        <RadioGroupItem value={f.id} id={`freq-${f.id}`} className="sr-only" />
                        <span className="font-semibold">{f.name}</span>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {f.discount > 0 ? `Save ${Math.round(f.discount * 100)}%` : "Standard rate"}
                        </p>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {serviceType === "Car Detailing" ? (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Step 2: Pick Your Package</Label>
                  <RadioGroup value={bundle} onValueChange={setBundle} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[{ id: "none", name: "Just the Detail", services: ["Interior detailing only"], price: 0 }, ...carDetailingBundles].map((b) => (
                      <Label key={b.id} htmlFor={`bundle-${b.id}`} className="block cursor-pointer rounded-lg border bg-card p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                        <RadioGroupItem value={b.id} id={`bundle-${b.id}`} className="sr-only" />
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{b.name}</span>
                          <span className="text-sm font-semibold text-primary">{b.price > 0 ? `+$${b.price}` : "—"}</span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {b.services.map((s) => <li key={s}>• {s}</li>)}
                        </ul>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Step 4: Add-ons</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addons.map((a) => (
                      <label key={a.id} className="flex items-center gap-3 rounded-md border p-3">
                        <Checkbox checked={selectedAddons.includes(a.id)} onCheckedChange={() => setSelectedAddons((prev) => prev.includes(a.id) ? prev.filter(id => id !== a.id) : [...prev, a.id])} />
                        <span className="flex-1">{a.name}</span>
                        <span className={a.price === 0 ? "text-sm font-medium text-primary" : "text-sm text-muted-foreground"}>{a.price === 0 ? "Free — just say the word" : `$${a.price}`}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Preferred Date</Label>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> 
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="p-0">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.date && <p className="text-sm text-destructive">{errors.date.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Contact Info</Label>
                  <Controller name="name" control={control} render={({ field }) => <Input placeholder="Your name" {...field} />} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
                  <Controller name="email" control={control} render={({ field }) => <Input placeholder="Email" type="email" {...field} />} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
                  <Controller name="phone" control={control} render={({ field }) => <Input placeholder="Phone" {...field} />} />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message as string}</p>}
                  <Controller name="address" control={control} render={({ field }) => <Input placeholder="Address or Service Area" {...field} />} />
                  {errors.address && <p className="text-sm text-destructive">{errors.address.message as string}</p>}
                </div>
              </div>

              {price !== null && (
                <Alert className="bg-accent/40">
                  <AlertTitle>Estimated Total</AlertTitle>
                  <AlertDescription>
                    {serviceType} — {isClean ? `${sqft} sqft` : bundle !== "none" ? carDetailingBundles.find((b) => b.id === bundle)?.name + " package" : "Flat rate"}
                    {isClean && selectedAddons.length > 0 ? ` + ${selectedAddons.filter(id => (addons.find(a => a.id === id)?.price || 0) > 0).length || "free"} add-on(s)` : ""}
                    {isClean && selectedFrequency.discount > 0 ? `, ${selectedFrequency.name.toLowerCase()} (save ${Math.round(selectedFrequency.discount * 100)}%)` : ""}
                    <span className="ml-2 font-semibold">${price}{isClean && selectedFrequency.discount > 0 ? "/visit" : ""}</span>
                    <p className="mt-1 text-xs text-muted-foreground">Free travel within about 20 miles of Oak Ridge — a small trip fee may apply beyond.</p>
                  </AlertDescription>
                </Alert>
              )}

              {/* Hidden fields to send along with server action */}
              <input type="hidden" name="serviceType" value={serviceType} />
              <input type="hidden" name="sqft" value={sqft} />
              <input type="hidden" name="addons" value={JSON.stringify(selectedAddons)} />
              <input type="hidden" name="frequency" value={isClean ? selectedFrequency.name : ""} />
              <input type="hidden" name="bundle" value={serviceType === "Car Detailing" && bundle !== "none" ? (carDetailingBundles.find((b) => b.id === bundle)?.name || "") : ""} />
              {price !== null && <input type="hidden" name="total" value={price} />}
              {/* Make sure date is included in form submission */}
              <input type="hidden" name="date" value={watch("date") ? new Date(watch("date") as Date).toISOString() : ""} />

              <div>
                <Button type="submit" size="lg">Request Booking</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
