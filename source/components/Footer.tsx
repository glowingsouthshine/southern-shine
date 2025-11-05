"use client";

import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Send } from "lucide-react";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";

export default function Footer() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(submitContactForm, null);

  useEffect(() => {
    if (state?.type === "success") {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
    } else if (state?.type === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <footer id="contact" className="bg-secondary">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                A Southern Glow
              </span>
            </Link>
            <p className="text-muted-foreground">
              Bringing a touch of Tennessee hospitality and shine to every home and vehicle. We're proud to serve our beautiful state and the volunteers dedicated to keeping it that way.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-muted-foreground">
              <a 
                href="mailto:glowingsouthshine@gmail.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
                aria-label="Email A Southern Glow"
              >
                <Mail className="h-4 w-4" />
                <span>glowingsouthshine@gmail.com</span>
              </a>
              <a 
                href="tel:8652654105" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
                aria-label="Call A Southern Glow"
              >
                <Phone className="h-4 w-4" />
                <span>(865) 265-4105</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin classNa