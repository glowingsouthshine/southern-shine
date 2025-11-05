"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { reviews } from "@/lib/data";
import { submitReview } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";


const reviewSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  review: z.string().min(10, { message: "Review must be at least 10 characters." }),
});


export default function Reviews() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(submitReview, null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    if (state?.type === "success") {
      toast({
        title: "Review Submitted!",
        description: state.message,
      });
      reset();
    } else if (state?.type === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, reset]);


  return (
    <section id="reviews" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-foreground/80">
            We're proud to deliver a service that makes our clients happy. Here's what they think about A Southern Glow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                  ))}
                </div>
                <blockquote className="italic text-foreground/90">"{review.review}"</blockquote>
                <p className="mt-4 font-bold text-right">- {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline">
                    Leave a Review
                </AccordionTrigger>
                <AccordionContent>
                    <form action={formAction} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea id="review" {...register("review")} />
                            {errors.review && <p className="text-sm text-destructive">{errors.review.message as string}</p>}
                        </div>
                        <Button type="submit">Submit Review</Button>
                    </form>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
      </div>
    </section>
  );
}
