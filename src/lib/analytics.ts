"use client";

type Params = Record<string, any> | undefined;

export function trackEvent(name: string, params?: Params) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params || {});
  }
  if (typeof window !== "undefined" && (window as any).clarity) {
    try { (window as any).clarity("event", name); } catch {}
  }
}

