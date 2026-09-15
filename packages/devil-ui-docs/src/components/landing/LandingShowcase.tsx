import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Loader,
  Meter,
  Radio,
  Switch,
  Tabs,
  cn,
} from "@hellwrk/devil-ui";
import { Reveal } from "./Reveal";

function Card({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[200px] flex-col bg-devil-base px-5 py-4 hover:bg-devil-tint/30 md:px-6 md:py-5">
      <div className="flex min-h-0 w-full flex-1 items-center justify-center py-4">
        {children}
      </div>
      <a
        href={href}
        className="mt-4 flex items-center justify-between border-t border-devil-hairline pt-4 text-sm font-medium hover:text-devil-brand"
      >
        {title}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function ButtonsCard() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button variant="primary">Create Worker</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

function BadgesCard() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Live</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="error">Down</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">v2.13.2</Badge>
    </div>
  );
}

function SelectionCard() {
  const [notify, setNotify] = useState(true);
  const [agree, setAgree] = useState(false);
  const [channel, setChannel] = useState("email");
  return (
    <div className="flex flex-col items-start gap-3">
      <Switch label="Notifications" checked={notify} onCheckedChange={setNotify} />
      <Checkbox label="I agree" checked={agree} onCheckedChange={setAgree} />
      <Radio.Group legend="Channel" value={channel} onValueChange={setChannel}>
        <Radio.Item label="Email" value="email" />
        <Radio.Item label="SMS" value="sms" />
      </Radio.Group>
    </div>
  );
}

function TabsCard() {
  const [value, setValue] = useState("overview");
  return (
    <div className="flex w-full flex-col gap-3">
      <Tabs
        variant="segmented"
        tabs={[
          { value: "overview", label: "Overview" },
          { value: "metrics", label: "Metrics" },
          { value: "logs", label: "Logs" },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-center text-sm text-devil-subtle">
        Active:{" "}
        <span className="font-mono text-[0.9em] text-devil-default">
          {value}
        </span>
      </p>
    </div>
  );
}

function MeterCard() {
  const [value, setValue] = useState(65);
  return (
    <div className="flex w-full flex-col gap-4">
      <Meter label="Bandwidth used" value={value} />
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setValue((v) => Math.max(0, v - 15))}
        >
          −
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setValue((v) => Math.min(100, v + 15))}
        >
          +
        </Button>
      </div>
    </div>
  );
}

function InputCard() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Input label="Email" placeholder="you@example.com" />
      <div className="flex items-center gap-2 text-sm text-devil-subtle">
        <span className="h-lh flex items-center">
          <Loader size="sm" />
        </span>
        Deploying…
      </div>
    </div>
  );
}

export function LandingShowcase() {
  return (
    <section id="showcase" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Every specimen is live
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-devil-subtle">
              This page renders real Devil-UI components — not screenshots.
              Interact with them.
            </p>
          </Reveal>
        </div>
        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-devil-hairline",
            "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          <Reveal className="h-full">
            <Card title="Button" href="/components/button">
              <ButtonsCard />
            </Card>
          </Reveal>
          <Reveal delay={60} className="h-full">
            <Card title="Badge" href="/components/badge">
              <BadgesCard />
            </Card>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <Card title="Switch" href="/components/switch">
              <SelectionCard />
            </Card>
          </Reveal>
          <Reveal className="h-full">
            <Card title="Tabs" href="/components/tabs">
              <TabsCard />
            </Card>
          </Reveal>
          <Reveal delay={60} className="h-full">
            <Card title="Meter" href="/components/meter">
              <MeterCard />
            </Card>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <Card title="Input" href="/components/input">
              <InputCard />
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
