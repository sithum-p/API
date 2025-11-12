import { User, Mail, Calendar, MapPin, Phone, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/store/useAuth";

export default function Profile() {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });
  
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (user) {
      const userProfile = {
        name: `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.email,
        email: user.email || '',
        phone: user.phone || 'Not provided',
        location: user.location || 'Not provided'
      };
      setProfile(userProfile);
      setEditProfile(userProfile);
    }
  }, [user]);
  
  const handleSave = () => {
    setProfile({ ...editProfile });
    setOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name || 'User'}</h2>
            <p className="text-gray-600">User ID: {user?.id || 'N/A'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-medium">January 15, 2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editProfile.phone}
                    onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editProfile.location}
                    onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}