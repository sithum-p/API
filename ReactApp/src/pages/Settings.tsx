import { Settings as SettingsIcon, User, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/useAuth";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="grid gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Account Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ''} disabled />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={`${user?.firstname || ''} ${user?.lastname || ''}`.trim()} />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable Two-Factor Authentication</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}