import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-10">
      {/* Test buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>

        <label htmlFor="">inptu</label>
        <Input placeholder="inptu"></Input>
      </div>
      <Button variant="default">HELOOOO</Button>
      {/* Test background colors with proper Tailwind classes */}
      <div className="space-y-4">
        <div className="bg-background text-foreground p-4 rounded-lg border">
          Body Background Color Test
        </div>
        <div className="bg-primary text-primary-foreground p-4 rounded-lg">
          Primary Background Test
        </div>
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
          Secondary Background Test
        </div>
        <div className="bg-accent text-accent-foreground p-4 rounded-lg">
          Accent Background Test
        </div>
        <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
          Destructive Background Test
        </div>
      </div>
      {/* Test with inline styles to see the actual colors */}
      <div className="space-y-4 border-t pt-4">
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "hsl(351 40% 83%)",
            color: "hsl(351 38% 29%)",
          }}
        >
          Inline Style Test - This should match your custom colors
        </div>
      </div>

      <div className="medical-card">Patient Card</div>

      <div className="bg-success text-success-foreground">Success</div>
      <div className="bg-warning text-warning-foreground">Warning</div>

      <aside className="bg-sidebar text-sidebar-foreground border-sidebar">
        Sidebar Content
      </aside>
    </div>
  );
}
