"use client";

import { useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { RenderCounter } from "@/components/RenderCounter";

// Demo 1: Using watch() - Causes parent rerenders
function WatchDemo() {
  const { register, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    },
  });

  // ❌ watch() in component body causes rerender on ANY watched field change
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");

  return (
    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-red-900 dark:text-red-100">
          ❌ Using watch() - Entire Form Rerenders
        </h3>
        <RenderCounter name="Form" />
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-red-900 dark:text-red-100">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="w-full rounded border border-red-300 px-3 py-2 dark:border-red-600 dark:bg-red-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-red-900 dark:text-red-100">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full rounded border border-red-300 px-3 py-2 dark:border-red-600 dark:bg-red-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-red-900 dark:text-red-100">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded border border-red-300 px-3 py-2 dark:border-red-600 dark:bg-red-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-red-900 dark:text-red-100">Age</label>
          <input
            {...register("age")}
            type="number"
            className="w-full rounded border border-red-300 px-3 py-2 dark:border-red-600 dark:bg-red-900 dark:text-white"
          />
          <UnrelatedComponent />
        </div>
      </div>

      <div className="mt-4 rounded bg-red-200 p-3 dark:bg-red-800">
        <p className="mb-2 text-sm font-semibold text-red-900 dark:text-red-100">
          Live Preview:
        </p>
        <p className="text-sm text-red-800 dark:text-red-200">
          {firstName} {lastName} ({email})
        </p>
      </div>

      <div className="mt-3 rounded bg-red-100 p-2 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
        <strong>Problem:</strong> Every keystroke in ANY field causes the ENTIRE form to
        rerender. Watch the render counter increase with each keystroke!
      </div>
    </div>
  );
}

function UnrelatedComponent() {
  return (
    <div className="mt-2 rounded bg-red-300 p-2 dark:bg-red-700">
      <div className="flex items-center justify-between">
        <span className="text-xs text-red-900 dark:text-red-100">
          Unrelated Component (doesn&apos;t use form data)
        </span>
        <RenderCounter name="Unrelated" />
      </div>
    </div>
  );
}

// Demo 2: Using useWatch() - Only watching component rerenders
function UseWatchDemo() {
  const { register, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    },
  });

  return (
    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-green-900 dark:text-green-100">
          ✅ Using useWatch() - Isolated Rerenders
        </h3>
        <RenderCounter name="Form" />
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-green-900 dark:text-green-100">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="w-full rounded border border-green-300 px-3 py-2 dark:border-green-600 dark:bg-green-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-green-900 dark:text-green-100">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full rounded border border-green-300 px-3 py-2 dark:border-green-600 dark:bg-green-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-green-900 dark:text-green-100">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded border border-green-300 px-3 py-2 dark:border-green-600 dark:bg-green-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-green-900 dark:text-green-100">
            Age
          </label>
          <input
            {...register("age")}
            type="number"
            className="w-full rounded border border-green-300 px-3 py-2 dark:border-green-600 dark:bg-green-900 dark:text-white"
          />
          <UnrelatedOptimizedComponent />
        </div>
      </div>

      {/* Separate component using useWatch */}
      <FormPreview control={control} />

      <div className="mt-3 rounded bg-green-100 p-2 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
        <strong>Benefit:</strong> Form component counter stays same! Only the FormPreview
        component rerenders when form data changes.
      </div>
    </div>
  );
}

function FormPreview({ control }: { control: any }) {
  // ✅ useWatch only causes THIS component to rerender
  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });
  const email = useWatch({ control, name: "email" });

  return (
    <div className="mt-4 rounded bg-green-200 p-3 dark:bg-green-800">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-green-900 dark:text-green-100">
          Live Preview:
        </p>
        <RenderCounter name="Preview" />
      </div>
      <p className="text-sm text-green-800 dark:text-green-200">
        {firstName} {lastName} ({email})
      </p>
    </div>
  );
}

function UnrelatedOptimizedComponent() {
  return (
    <div className="mt-2 rounded bg-green-300 p-2 dark:bg-green-700">
      <div className="flex items-center justify-between">
        <span className="text-xs text-green-900 dark:text-green-100">
          Unrelated Component (doesn&apos;t use form data)
        </span>
        <RenderCounter name="Unrelated" />
      </div>
    </div>
  );
}

// Demo 3: Real-world use case - Price Calculator
function PriceCalculatorBad() {
  const { register, watch } = useForm({
    defaultValues: {
      productName: "",
      quantity: 1,
      pricePerUnit: 0,
      taxRate: 0,
      notes: "",
    },
  });

  // ❌ Watching specific fields in parent causes rerenders even when notes change
  const quantity = watch("quantity");
  const pricePerUnit = watch("pricePerUnit");
  const taxRate = watch("taxRate");

  // Expensive calculation
  const subtotal = quantity * pricePerUnit;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-red-900 dark:text-red-100">
          ❌ watch() in Parent - Unnecessary Calculation Reruns
        </h3>
        <RenderCounter name="Form" />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
              Product Name
            </label>
            <input
              {...register("productName")}
              className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
              Quantity
            </label>
            <input
              {...register("quantity", { valueAsNumber: true })}
              type="number"
              className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
              Price per Unit ($)
            </label>
            <input
              {...register("pricePerUnit", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
              Tax Rate (%)
            </label>
            <input
              {...register("taxRate", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
            Notes (type here - watch rerenders!)
          </label>
          <textarea
            {...register("notes")}
            rows={2}
            className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
            placeholder="Type anything..."
          />
        </div>
      </div>

      <div className="mt-3 rounded bg-red-200 p-3 text-sm dark:bg-red-800">
        <div className="space-y-1 text-red-900 dark:text-red-100">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-red-400 pt-1 font-semibold dark:border-red-600">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded bg-red-100 p-2 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
        <strong>Problem:</strong> Typing in "Notes" field causes unnecessary calculation reruns
        even though it doesn&apos;t affect the total!
      </div>
    </div>
  );
}

function PriceCalculatorGood() {
  const { register, control } = useForm({
    defaultValues: {
      productName: "",
      quantity: 1,
      pricePerUnit: 0,
      taxRate: 0,
      notes: "",
    },
  });

  return (
    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-green-900 dark:text-green-100">
          ✅ useWatch() in Separate Component - Only Calculates When Needed
        </h3>
        <RenderCounter name="Form" />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
              Product Name
            </label>
            <input
              {...register("productName")}
              className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
              Quantity
            </label>
            <input
              {...register("quantity", { valueAsNumber: true })}
              type="number"
              className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
              Price per Unit ($)
            </label>
            <input
              {...register("pricePerUnit", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
              Tax Rate (%)
            </label>
            <input
              {...register("taxRate", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
            Notes (type here - no rerenders!)
          </label>
          <textarea
            {...register("notes")}
            rows={2}
            className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
            placeholder="Type anything..."
          />
        </div>
      </div>

      <PriceDisplay control={control} />

      <div className="mt-3 rounded bg-green-100 p-2 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
        <strong>Benefit:</strong> Form counter stays at 1! Typing in "Notes" doesn&apos;t
        trigger calculations. Only the PriceDisplay component updates when price fields change.
      </div>
    </div>
  );
}

function PriceDisplay({ control }: { control: any }) {
  // ✅ Only watch the fields needed for calculation
  const quantity = useWatch({ control, name: "quantity", defaultValue: 1 });
  const pricePerUnit = useWatch({ control, name: "pricePerUnit", defaultValue: 0 });
  const taxRate = useWatch({ control, name: "taxRate", defaultValue: 0 });

  // Calculation only runs when these specific fields change
  const subtotal = quantity * pricePerUnit;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="mt-3 rounded bg-green-200 p-3 text-sm dark:bg-green-800">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold text-green-900 dark:text-green-100">
          Price Summary
        </span>
        <RenderCounter name="Calculator" />
      </div>
      <div className="space-y-1 text-green-900 dark:text-green-100">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-green-400 pt-1 font-semibold dark:border-green-600">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// Demo 4: Conditional fields
function ConditionalFieldsBad() {
  const { register, watch } = useForm({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      otherField: "",
    },
  });

  // ❌ Watching country causes entire form to rerender
  const country = watch("country");

  return (
    <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">
          ❌ Conditional Field with watch()
        </h3>
        <RenderCounter name="Form" />
      </div>

      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
            Country
          </label>
          <select
            {...register("country")}
            className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
          >
            <option value="">Select...</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {country === "USA" && (
          <div>
            <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
              State
            </label>
            <input
              {...register("state")}
              className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
            City
          </label>
          <input
            {...register("city")}
            className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-red-900 dark:text-red-100">
            Other Field (typing here causes rerender)
          </label>
          <input
            {...register("otherField")}
            className="w-full rounded border border-red-300 px-2 py-1 text-sm dark:border-red-600 dark:bg-red-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}

function ConditionalFieldsGood() {
  const { register, control } = useForm({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      otherField: "",
    },
  });

  return (
    <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">
          ✅ Conditional Field with useWatch()
        </h3>
        <RenderCounter name="Form" />
      </div>

      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
            Country
          </label>
          <select
            {...register("country")}
            className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
          >
            <option value="">Select...</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <ConditionalStateField control={control} register={register} />

        <div>
          <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
            City
          </label>
          <input
            {...register("city")}
            className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-green-900 dark:text-green-100">
            Other Field (typing here doesn&apos;t cause rerender)
          </label>
          <input
            {...register("otherField")}
            className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}

function ConditionalStateField({ control, register }: { control: any; register: any }) {
  const country = useWatch({ control, name: "country" });

  if (country !== "USA") return null;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs text-green-900 dark:text-green-100">State</label>
        <RenderCounter name="StateField" />
      </div>
      <input
        {...register("state")}
        className="w-full rounded border border-green-300 px-2 py-1 text-sm dark:border-green-600 dark:bg-green-900 dark:text-white"
      />
    </div>
  );
}



function FieldCounter({ control }: { control: any }) {
  const allValues = useWatch({ control });
  
  return (
    <div className="mt-2 flex items-center justify-between">
      <p className="text-xs text-green-800 dark:text-green-200">
        Count: {Object.keys(allValues).length} fields
      </p>
      <RenderCounter name="Counter" />
    </div>
  );
}

export default function ReactHookFormPage() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
          React Hook Form: watch() vs useWatch()
        </h1>

        <div className="mb-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
          <h2 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
            🎯 Key Difference
          </h2>
          <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <p>
              <strong>watch():</strong> Used in component body. Causes the entire component
              and it`s children to rerender when watched fields change.
            </p>
            <p>
              <strong>useWatch():</strong> A React hook. Only the component using useWatch
              rerenders. Parent form component stays stable.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <WatchDemo />
          <UseWatchDemo />

          <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Real-World Use Cases
            </h2>

            <div className="mb-4">
              <h3 className="mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Use Case 1: Price Calculator (Isolated Expensive Calculations)
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <PriceCalculatorBad />
                <PriceCalculatorGood />
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                💡 <strong>Key Benefit:</strong> With useWatch, only the calculator rerenders when price-related fields change. Typing in unrelated fields (like notes) doesn&apos;t trigger calculations.
              </p>
            </div>

            <div>
              <h3 className="mbalculations based on specific fields (price totals, validation)</li>
                <li>Conditional field rendering based on another field&apos;s valueold text-zinc-800 dark:text-zinc-200">
                Use Case 2: Conditional Fields (Dynamic Form Structure)
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <ConditionalFieldsBad />
                <ConditionalFieldsGood />
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                💡 <strong>Key Benefit:</strong> With useWatch, only the conditional field component watches the country value. The parent form stays stable when typing in other fields.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-950">
          <h2 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
            ✅ Best Practices
          </h2>
          <div className="space-y-3 text-sm text-green-800 dark:text-green-200">
            <div>
              <p className="font-semibold">Use watch() when:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Small forms where rerenders aren&apos;t a concern</li>
                <li>You need the value immediately in the same component</li>
                <li>Form submission logic</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Use useWatch() when:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Large forms with many fields</li>
                <li>Expensive components in the form</li>
                <li>You want to isolate rerenders to specific components</li>
                <li>Building optimized form previews/summaries</li>
              </ul>
            </div>
            <pre className="mt-3 overflow-x-auto rounded bg-green-100 p-3 text-xs text-green-900 dark:bg-green-900 dark:text-green-100">
{`// ❌ Parent rerenders on every change
function Form() {
  const { watch } = useForm();
  const name = watch("name");
  return <div>{name}</div>;
}

// ✅ Parent stays stable
function Form() {
  const { control } = useForm();
  return <Preview control={control} />;
}

function Preview({ control }) {
  const name = useWatch({ control, name: "name" });
  return <div>{name}</div>;
}`}
            </pre>
          </div>
        </div>

        <div className="mt-6 rounded-lg border-2 border-purple-300 bg-purple-50 p-4 dark:border-purple-700 dark:bg-purple-950">
          <h2 className="mb-2 text-lg font-semibold text-purple-900 dark:text-purple-100">
            🚀 Performance Tip
          </h2>
          <p className="text-sm text-purple-800 dark:text-purple-200">
            For complex forms, create separate components that use useWatch for specific
            fields. This way, only the components that actually need the data will rerender,
            keeping your form fast and responsive!
          </p>
        </div>
      </div>
    </div>
  );
}
