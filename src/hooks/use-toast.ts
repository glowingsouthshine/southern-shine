'use client'
import * as React from "react"
export function useToast(){ const [toasts,setToasts]=React.useState<any[]>([]); return {toasts,toast:(t:any)=>setToasts([t]),dismiss:()=>setToasts([])} }
