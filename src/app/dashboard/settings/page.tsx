"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("My Store");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState("0");
  const [shippingBase, setShippingBase] = useState("0");
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeName, storeEmail, storePhone, storeAddress, currency, taxRate: parseFloat(taxRate), shippingBase: parseFloat(shippingBase) }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your store configuration</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            <Input label="Store Email" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
            <Input label="Store Phone" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} />
            <Input label="Store Address" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment & Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            <Input label="Tax Rate (%)" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            <Input label="Base Shipping Cost" type="number" value={shippingBase} onChange={(e) => setShippingBase(e.target.value)} />
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
