"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { surveySchema, SurveyFormData } from "@/lib/survey-schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const SPENDING_FIELDS = [
  { name: "rent", label: "Rent / Housing" },
  { name: "groceries", label: "Groceries" },
  { name: "dining_out", label: "Dining Out" },
  { name: "transportation", label: "Transportation" },
  { name: "subscriptions", label: "Subscriptions (Netflix, Spotify, etc.)" },
  { name: "entertainment", label: "Entertainment" },
  { name: "clothing", label: "Clothing" },
  { name: "personal_care", label: "Personal Care" },
  { name: "misc", label: "Miscellaneous" },
] as const

export default function SurveyPage() {
  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      year: undefined,
      college: undefined,
      greek_life: false,
      has_job: false,
      monthly_income: 0,
      rent: 0,
      groceries: 0,
      dining_out: 0,
      transportation: 0,
      subscriptions: 0,
      entertainment: 0,
      clothing: 0,
      personal_care: 0,
      misc: 0,
    },
  })

  async function onSubmit(data: SurveyFormData) {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      alert("Thanks! Your response was submitted.")
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Clemson Student Spending Survey</CardTitle>
          <CardDescription>
            Anonymous · Takes 2 minutes · Helps your peers understand spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="sophomore">Sophomore</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* College */}
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your college" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="College of Agriculture, Forestry and Life Sciences">Agriculture, Forestry and Life Sciences</SelectItem>
                        <SelectItem value="College of Architecture, Arts and Humanities">Architecture, Arts and Humanities</SelectItem>
                        <SelectItem value="College of Behavioral, Social and Health Sciences">Behavioral, Social and Health Sciences</SelectItem>
                        <SelectItem value="College of Business">Business</SelectItem>
                        <SelectItem value="College of Education">Education</SelectItem>
                        <SelectItem value="College of Engineering, Computing and Applied Sciences">Engineering, Computing and Applied Sciences</SelectItem>
                        <SelectItem value="College of Science">Science</SelectItem>
                        <SelectItem value="Graduate School">Graduate School</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Greek Life */}
              <FormField
                control={form.control}
                name="greek_life"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you in Greek life?</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Has Job */}
              <FormField
                control={form.control}
                name="has_job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have a job?</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Monthly Income */}
              <FormField
                control={form.control}
                name="monthly_income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Spending Categories */}
              <div>
                <p className="text-sm font-medium mb-3">Monthly Spending by Category ($)</p>
                <div className="grid grid-cols-2 gap-4">
                  {SPENDING_FIELDS.map(({ name, label }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit Survey
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
