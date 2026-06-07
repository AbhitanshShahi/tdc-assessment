"use client";

import { useMemo, useState } from "react";
import { customers } from "@/data/customers";
import CustomerCard from "@/components/customer/customer-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("all");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const name =
        `${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`.toLowerCase();

      const matchesSearch =
        name.includes(search.toLowerCase()) ||
        customer.personalInfo.city.toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        stage === "all" ? true : customer.matchmaking.currentStage === stage;

      return matchesSearch && matchesStage;
    });
  }, [search, stage]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>

        <p className="text-muted-foreground">
          Manage customer profiles and matchmaking journeys.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="w-full md:w-60">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>

            <SelectItem value="Onboarded">Onboarded</SelectItem>

            <SelectItem value="Verified">Verified</SelectItem>

            <SelectItem value="Matching">Matching</SelectItem>

            <SelectItem value="Introduced">Introduced</SelectItem>

            <SelectItem value="Meeting Scheduled">Meeting Scheduled</SelectItem>

            <SelectItem value="Success">Success</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}
