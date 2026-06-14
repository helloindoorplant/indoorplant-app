"use client";

import dynamic from "next/dynamic";

export const FloatingAiWidgetWrapper = dynamic(
  () => import("./FloatingAiWidget").then((mod) => mod.FloatingAiWidget),
  { ssr: false }
);
