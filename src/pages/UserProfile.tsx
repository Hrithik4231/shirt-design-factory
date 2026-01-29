import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Share2, Trash2, Download as DownloadIcon } from "lucide-react";
import { toast } from "sonner";

interface SavedDesign {
  id: string;
  name: string;
  thumbnail: string;
  createdAt: string;
  colors: string[];
  design: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "processing" | "shipped" | "delivered";
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  newsletter: boolean;
  notificationsEmail: boolean;
  notificationsSMS: boolean;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    zipCode: "10001",
    country: "United States",
    newsletter: true,
    notificationsEmail: true,
    notificationsSMS: false,
  });

  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([
    {
      id: "1",
      name: "Summer Collection Design",
      thumbnail: "/lovable-uploads/default.jpg",
      createdAt: "2026-01-25",
      colors: ["#FF6B6B", "#4ECDC4"],
      design: "Custom summer artwork with vibrant colors",
    },
    {
      id: "2",
      name: "Winter Minimalist",
      thumbnail: "/lovable-uploads/default.jpg",
      createdAt: "2026-01-20",
      colors: ["#2C3E50", "#ECF0F1"],
      design: "Minimalist winter design with subtle patterns",
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      date: "2026-01-25",
      total: 79.97,
      status: "delivered",
      items: [
        { name: "Classic T-Shirt", quantity: 2, price: 25.99 },
      ],
    },
    {
      id: "ORD002",
      date: "2026-01-28",
      total: 125.98,
      status: "shipped",
      items: [
        { name: "Premium Polo", quantity: 1, price: 45.99 },
        { name: "Classic T-Shirt", quantity: 2, price: 25.99 },
      ],
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };

  const handleDeleteDesign = (id: string) => {
    setSavedDesigns(savedDesigns.filter((d) => d.id !== id));
    toast.success("Design deleted successfully!");
  };

  const handleShareDesign = (id: string) => {
    toast.success("Design share link copied to clipboard!");
  };

  const handleDownloadDesign = (id: string) => {
    toast.success("Design downloaded successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="designs">Saved Designs</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          {/* Profile Settings Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Account Information</CardTitle>
                  <Button
                    variant={editMode ? "default" : "outline"}
                    onClick={() => {
                      if (editMode) {
                        handleSaveProfile();
                      } else {
                        setTempProfile(profile);
                        setEditMode(true);
                      }
                    }}
                  >
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <Input
                          disabled={!editMode}
                          value={editMode ? tempProfile.name : profile.name}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              name: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          disabled={!editMode}
                          value={editMode ? tempProfile.email : profile.email}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              email: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          disabled={!editMode}
                          value={editMode ? tempProfile.phone : profile.phone}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              phone: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <Input
                          disabled={!editMode}
                          value={editMode ? tempProfile.address : profile.address}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              address: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <Input
                          disabled={!editMode}
                          value={editMode ? tempProfile.city : profile.city}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              city: e.target.value,
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            ZIP Code
                          </label>
                          <Input
                            disabled={!editMode}
                            value={editMode ? tempProfile.zipCode : profile.zipCode}
                            onChange={(e) =>
                              setTempProfile({
                                ...tempProfile,
                                zipCode: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <Input
                            disabled={!editMode}
                            value={editMode ? tempProfile.country : profile.country}
                            onChange={(e) =>
                              setTempProfile({
                                ...tempProfile,
                                country: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        disabled={!editMode}
                        checked={
                          editMode
                            ? tempProfile.newsletter
                            : profile.newsletter
                        }
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            newsletter: e.target.checked,
                          })
                        }
                        className="mr-3"
                      />
                      <label className="text-sm font-medium">
                        Subscribe to newsletter for exclusive offers
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        disabled={!editMode}
                        checked={
                          editMode
                            ? tempProfile.notificationsEmail
                            : profile.notificationsEmail
                        }
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            notificationsEmail: e.target.checked,
                          })
                        }
                        className="mr-3"
                      />
                      <label className="text-sm font-medium">
                        Email notifications for order updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        disabled={!editMode}
                        checked={
                          editMode
                            ? tempProfile.notificationsSMS
                            : profile.notificationsSMS
                        }
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            notificationsSMS: e.target.checked,
                          })
                        }
                        className="mr-3"
                      />
                      <label className="text-sm font-medium">
                        SMS notifications for order updates
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Designs Tab */}
          <TabsContent value="designs">
            <Card>
              <CardHeader>
                <CardTitle>My Design Library</CardTitle>
              </CardHeader>
              <CardContent>
                {savedDesigns.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No saved designs yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedDesigns.map((design) => (
                      <div
                        key={design.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                          <img
                            src={design.thumbnail}
                            alt={design.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">
                            {design.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Created: {design.createdAt}
                          </p>
                          <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-2">Colors used:</p>
                            <div className="flex gap-2">
                              {design.colors.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 rounded border border-gray-300"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleDownloadDesign(design.id)}
                            >
                              <DownloadIcon className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareDesign(design.id)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteDesign(design.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Dialog key={order.id}>
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{order.id}</h3>
                              <p className="text-sm text-gray-600">
                                Ordered: {order.date}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="bg-gray-50 rounded p-3 mb-3">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm mb-2 last:mb-0"
                              >
                                <span>
                                  {item.name} x{item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">
                              Total: ${order.total.toFixed(2)}
                            </span>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                          </div>
                        </div>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.id}</DialogTitle>
                            <DialogDescription>
                              Ordered on {order.date}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Items</h4>
                              <div className="bg-gray-50 rounded p-3 space-y-2">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>
                                      {item.name} x{item.quantity}
                                    </span>
                                    <span>
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="border-t pt-3">
                              <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Status</h4>
                              <p className="text-sm">
                                Your order is{" "}
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
