"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, TrendingUp, Clock, IndianRupee, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function RoiCalculatorPage() {
  const [teamMembers, setTeamMembers] = useState(4);
  const [hoursPerDay, setHoursPerDay] = useState(2.5);
  const [hourlyWage, setHourlyWage] = useState(450);
  const [automationEfficiency, setAutomationEfficiency] = useState(75); // %

  // Calculations
  const workingDaysPerMonth = 22;
  const totalMonthlyHoursSpent = teamMembers * hoursPerDay * workingDaysPerMonth;
  const monthlyHoursSaved = Math.round(totalMonthlyHoursSpent * (automationEfficiency / 100));
  const monthlyCostSaved = Math.round(monthlyHoursSaved * hourlyWage);
  const annualCostSaved = monthlyCostSaved * 12;
  const annualHoursSaved = monthlyHoursSaved * 12;

  // Format INR currency
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <Badge variant="gold" className="mb-4 px-3.5 py-1 text-xs">
            Interactive Business Tool
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] tracking-tight mb-5">
            Automation <span className="text-[var(--gold)]">ROI Calculator.</span>
          </h1>
          <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
            Estimate how much operating capital and employee bandwidth your company can recover
            by automating WhatsApp follow-ups, manual data entry, and CRM syncs.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Column: Sliders */}
          <Card className="lg:col-span-7 p-7 sm:p-9 bg-[var(--surface)] border-[var(--border)] space-y-8">
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--border)]">
              <Calculator className="w-5 h-5 text-[var(--gold)]" />
              <h2 className="font-display text-xl text-[var(--text)]">
                Input Operational Variables
              </h2>
            </div>

            {/* Slider 1: Team members */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="team-slider" className="font-medium text-[var(--text)]">
                  Employees Handling Repetitive Tasks
                </label>
                <span className="font-mono text-base font-bold text-[var(--gold)] bg-[var(--surface-2)] px-3 py-1 rounded-md border border-[var(--border)]">
                  {teamMembers} {teamMembers === 1 ? "person" : "people"}
                </span>
              </div>
              <input
                id="team-slider"
                type="range"
                min="1"
                max="30"
                step="1"
                value={teamMembers}
                onChange={(e) => setTeamMembers(Number(e.target.value))}
                className="w-full accent-[var(--gold)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--muted)]/70">
                Staff handling data entry, copy-pasting, customer FAQ replies, or manual scheduling.
              </p>
            </div>

            {/* Slider 2: Hours per day per person */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="hours-slider" className="font-medium text-[var(--text)]">
                  Hours Spent On Manual Tasks (Per Person / Day)
                </label>
                <span className="font-mono text-base font-bold text-[var(--gold)] bg-[var(--surface-2)] px-3 py-1 rounded-md border border-[var(--border)]">
                  {hoursPerDay} hrs / day
                </span>
              </div>
              <input
                id="hours-slider"
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full accent-[var(--gold)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--muted)]/70">
                Average daily time per employee lost to non-strategic, routine tasks.
              </p>
            </div>

            {/* Slider 3: Hourly employee cost */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="wage-slider" className="font-medium text-[var(--text)]">
                  Estimated Average Cost / Hour (INR)
                </label>
                <span className="font-mono text-base font-bold text-[var(--gold)] bg-[var(--surface-2)] px-3 py-1 rounded-md border border-[var(--border)]">
                  ₹{hourlyWage} / hr
                </span>
              </div>
              <input
                id="wage-slider"
                type="range"
                min="150"
                max="2500"
                step="50"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full accent-[var(--gold)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--muted)]/70">
                Approximate compensation rate including overhead costs.
              </p>
            </div>

            {/* Slider 4: Automation Coverage */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="efficiency-slider" className="font-medium text-[var(--text)]">
                  Target Automation Coverage
                </label>
                <span className="font-mono text-base font-bold text-[var(--ok)] bg-[var(--surface-2)] px-3 py-1 rounded-md border border-[var(--border)]">
                  {automationEfficiency}% of tasks
                </span>
              </div>
              <input
                id="efficiency-slider"
                type="range"
                min="40"
                max="90"
                step="5"
                value={automationEfficiency}
                onChange={(e) => setAutomationEfficiency(Number(e.target.value))}
                className="w-full accent-[var(--ok)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--muted)]/70">
                Most n8n + AI systems safely automate between 70% to 85% of standard administrative flows.
              </p>
            </div>
          </Card>

          {/* Right Column: Calculated Savings Summary */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-8 bg-[radial-gradient(ellipse_at_top,#151C36_0%,#0B1020_100%)] border-[var(--gold)]/50 shadow-2xl space-y-6">
              <span className="text-xs font-mono text-[var(--gold)] uppercase tracking-wider block">
                Projected Savings Output
              </span>

              {/* Main Annual Value */}
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Estimated Annual Cost Savings:</p>
                <p className="font-display text-4xl sm:text-5xl font-bold text-[var(--gold)] tracking-tight">
                  {formatINR(annualCostSaved)}
                </p>
                <p className="text-xs text-[var(--ok)] font-mono mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{formatINR(monthlyCostSaved)} saved every single month</span>
                </p>
              </div>

              {/* Metric Breakdown */}
              <div className="pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--gold)] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Monthly Hours</span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-[var(--text)]">
                    {monthlyHoursSaved} hrs
                  </p>
                  <p className="text-[10px] text-[var(--muted)] mt-1">reclaimed per month</p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--ok)] mb-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Annual Hours</span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-[var(--text)]">
                    {annualHoursSaved.toLocaleString()} hrs
                  </p>
                  <p className="text-[10px] text-[var(--muted)] mt-1">unlocked each year</p>
                </div>
              </div>

              {/* CTA based on calculation */}
              <div className="pt-4">
                <Button fullWidth size="lg" variant="primary" asChild>
                  <Link href={`/contact?interest=ROI+Calculator&hours=${monthlyHoursSaved}`} className="gap-2">
                    <span>Reclaim These {monthlyHoursSaved} Hours</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                <p className="text-[11px] text-[var(--muted)]/60 text-center font-mono mt-3">
                  100% Free Consultation • Complete Workflow Plan Provided
                </p>
              </div>
            </Card>

            {/* Trust Callout */}
            <div className="p-5 rounded-card border border-[var(--border)] bg-[var(--surface)] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[var(--ok)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Calculations are based on typical employee efficiency gains observed across custom
                n8n and AI deployments. Results vary by business model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
