"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

import { services, addons, carDetailingAddons, carDetailingBundles } from "@/lib/data";
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
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const requestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  date: z.date({ required_error: "A date is required." }),
});

export default function Services() {
  const [serviceType, setServiceType] = useState(services[0].name);
  const [sqft, setSqft] = useState(1500);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const { toast } = useToast();
  
  const [state, formAction] = useFormState(submitServiceRequest, null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      date: undefined,
    }
  });

  const selectedService = useMemo(
    () => services.find((s) => s.name === serviceType)!,
    [serviceType]
  );
  
  const handleAddonChange = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };
  
  const handleBundleChange = (bundleId: string) => {
    const bundle = carDetailingBundles.find(b => b.id === bundleId);
    if (!bundle) return;
    
    // Deselect all car addons first
    const nonCarAddons = selectedAddons.filter(id => !carDetailingAddons.some(a => a.id === id));
    const bundleAddons = carDetailingAddons.filter(a => bundle.services.includes(a.name)).map(a => a.id);
    
    setSelectedAddons([...nonCarAddons, ...bundleAddons]);
  };

  const price = useMemo(() => {
    if (!selectedService || selectedService.basePrice === null) return null;
    const basePrice = selectedService.basePrice;
    const sqftCharge = serviceType.includes("Clean") ? Math.max(0, sqft - 1000) * selectedService.pricePerSqFt! : 0;
    
    let currentAddons = serviceType === 'Car Detailing' ? carDetailingAddons : addons;

    const addonsPrice = selectedAddons.reduce((total, addonId) => {
        const addon = currentAddons.find((a) => a.id === addonId);
        return total + (addon?.price || 0);
    }, 0);
    return basePrice + sqftCharge + addonsPrice;
  }, [selectedService, sqft, selectedAddons, serviceType]);
  
  useEffect(() => {
    if (state?.type === "success") {
      toast({
        title: "Request Submitted!",
        description: state.message,
      });
      reset();
      setServiceType(services[0].name);
      setSqft(1500);
      setSelectedAddons([]);
    } else if (state?.type === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, reset]);

  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Choose a service, customize your cleaning, and get an instant price estimate. It's that simple.
          </p>
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
                <Controller
                  name="serviceType"
                  control={control}
                  defaultValue={serviceType}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => {
                        setServiceType(value);
                        setSelectedAddons([]);
                        field.onChange(value);
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
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
                  )}
                />
              </div>

              {serviceType.includes("Clean") && selectedService.pricePerSqFt !== null && (
                 <div className="space-y-4">
                    <Label htmlFor="sqft" className="text-lg font-semibold">Step 2: Home Size</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                            id="sqft"
                            min={500}
# ... trimmed for brevity - full file was included in conversation earlier
