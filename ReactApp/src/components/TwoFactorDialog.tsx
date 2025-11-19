import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/useAuth";
import { usersAPI } from "@/apis/users/users.api";
import { toast } from "sonner";

interface TwoFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TwoFactorDialog({ open, onOpenChange }: TwoFactorDialogProps) {
  const { user } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [step, setStep] = useState<"email" | "verify">("email");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    setLoading(true);
    try {
      // Send email with code
      const response = await fetch('/api/auth/send-2fa-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user?.email, 
          code: code 
        })
      });
      
      if (response.ok) {
        toast.success(`Verification code sent to ${user?.email}`);
        setStep("verify");
      } else {
        toast.error("Failed to send verification code");
      }
    } catch (error) {
      toast.error("Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode !== generatedCode) {
      toast.error("Invalid verification code");
      return;
    }

    setLoading(true);
    try {
      await usersAPI.update(user?.id, { twoFactorEnabled: true });
      toast.success("Two-Factor Authentication enabled successfully");
      onOpenChange(false);
      setVerificationCode("");
      setStep("email");
    } catch (error: any) {
      toast.error("Failed to enable Two-Factor Authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Enable Two-Factor Authentication
          </DialogTitle>
        </DialogHeader>
        
        {step === "email" ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                We'll send a verification code to this email address
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Code"}
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Enter the code sent to {user?.email}
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Enable"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setStep("email")}>
                Back
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}