import { Settings as SettingsIcon, User, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/useAuth";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import TwoFactorDialog from "@/components/TwoFactorDialog";
import { useState } from "react";

export default function Settings() {
  const { user } = useAuth();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="grid gap-6">
        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Account Settings</h2>
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
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security</h2>
          </div>
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setPasswordDialogOpen(true)}>Change Password</Button>
            <Button variant="outline" onClick={() => setTwoFactorDialogOpen(true)}>Enable Two-Factor Authentication</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Email Notifications</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Push Notifications</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </div>
        </div>
      </div>
      
      <ChangePasswordDialog 
        open={passwordDialogOpen} 
        onOpenChange={setPasswordDialogOpen} 
      />
      
      <TwoFactorDialog 
        open={twoFactorDialogOpen} 
        onOpenChange={setTwoFactorDialogOpen} 
      />
    </div>
  );
}