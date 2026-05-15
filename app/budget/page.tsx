import type { Metadata } from "next";
import { BudgetCalculator } from "@/components/budget/budget-calculator";

export const metadata: Metadata = {
  title: "Trip cost calculator — Journey to the East",
  description:
    "Estimate the cost of your Uzbekistan trip — flights, hotels, food, activities — and save the plan to your account.",
};

export default function BudgetPage() {
  return (
    <>
      <section className="container-editorial pt-32 pb-8 md:pt-40 md:pb-12">
        <p className="font-script text-2xl text-uz-terracotta mb-3">
          Trip cost
        </p>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight max-w-4xl">
          What will it
          <span className="italic text-uz-turquoise"> cost</span>?
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          A reasonable, transparent estimate — based on 2026 prices from
          real hotels, real Afrosiyob train tickets, and real plov bills.
          Tweak the inputs, see the chart update, save the plan to your
          account when you're happy.
        </p>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <BudgetCalculator />
      </section>
    </>
  );
}
