"use server";

type ActionResult = { type: "success"; message: string } | { type: "error"; message: string };

function getBaseUrl() {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return site && site.length > 0 ? site : "http://localhost:9002";
}

export async function submitServiceRequest(_: any, formData: FormData): Promise<ActionResult> {
  try {
    const payload: any = Object.fromEntries(formData.entries());
    if (payload.addons && typeof payload.addons === "string") {
      try { payload.addons = JSON.parse(payload.addons as string); } catch { /* ignore */ }
    }
    if (payload.date) payload.date = new Date(payload.date as string).toISOString();

    const res = await fetch(`${getBaseUrl()}/api/request-service`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { type: "error", message: data.error || "Failed to submit request" };
    }
    return { type: "success", message: "We received your request. We’ll confirm shortly." };
  } catch {
    return { type: "error", message: "Something went wrong. Please try again." };
  }
}

export async function submitReview(_: any, formData: FormData): Promise<ActionResult> {
  try {
    const payload: any = Object.fromEntries(formData.entries());
    const res = await fetch(`${getBaseUrl()}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        review: payload.review,
        rating: 5,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { type: "error", message: data.error || "Failed to submit review" };
    }
    return { type: "success", message: "Thank you! Your review was submitted." };
  } catch {
    return { type: "error", message: "Something went wrong. Please try again." };
  }
}

