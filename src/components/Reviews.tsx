"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useState } from "react";
import { reviews } from "@/lib/data";
import { submitReview } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Star, HeartHandshake, WalletCards, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";


const commitments = [
  {
    icon: HeartHandshake,
    title: "100% Happiness Guarantee",
    body: "If a room isn't right, say the word and I'll come back and redo it. No arguing, no fine print.",
  },
  {
    icon: WalletCards,
    title: "You Pay After, Never Before",
    body: "Not a dime upfront. You look the place over, and you pay once you're happy with it.",
  },
  {
    icon: MapPin,
    title: "Local and Accountable",
    body: "Oak Ridge born and run. It's my name on this, and my number you call — not a call center.",
  },
];

const reviewSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  review: z.string().min(10, { message: "Review must be at least 10 characters." }),
});


export default function Reviews() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitReview, null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

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
          <h2 className="font-headline text-3xl sm:text-4xl font-bold">
            {reviews.length > 0 ? "What Our Clients Say" : "Be My First Review"}
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            {reviews.length > 0
              ? "We're proud to deliver a service that makes our clients happy. Here's what they think about A Southern Glow."
              : "A Southern Glow is new, and I'd rather earn your trust than borrow it. Here's what I stand behind on every single job."}
          </p>
        </div>

        {reviews.length > 0 ? (
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
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-b from-primary to-[hsl(10_75%_45%)] shadow-btn">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 font-headline text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-foreground/80">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline">
                    Leave a Review
                </AccordionTrigger>
                <AccordionContent>
                    <form action={formAction} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Your Rating</Label>
                            <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        className="p-0.5 transition-transform hover:scale-110 active:scale-95"
                                    >
                                        <Star className={(hoverRating || rating) >= star ? "h-6 w-6 text-primary fill-primary" : "h-6 w-6 text-muted-foreground"} />
                                    </button>
                                ))}
                            </div>
                            <input type="hidden" name="rating" value={rating} />
                        </div>
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
