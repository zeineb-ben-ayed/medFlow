// app/test/page.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  return (
    <div className="p-10">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
