import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Moon, Sun } from "lucide-react";
import { useTheme } from "@/Context/ThemeContext";
import { useAuth } from "@/Context/AuthContext/AuthContext";

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  const { userInfo } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general" className="w-1/2">
        {/* Tabs Navigation */}
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="loging&security">Loging & security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User-Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="border-b-5 border-b-forderground"></p>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Label>Employee-ID :</Label>
                  <p className="text-md text-blue-400">{userInfo?.userId}</p>
                </div>
                <Copy size={18} />
              </div>
              <div className="flex gap-3">
                <Label>Employee-Role :</Label>
                <p className="text-md text-blue-400">{userInfo?.userRole}</p>
              </div>
              <p className="border-b-5 border-b-forderground"></p>
              <div className="flex gap-3">
                <Label>Name :</Label>
                <p className="text-md text-blue-400">{userInfo?.firstName}</p>
                <p className="text-md text-blue-400">{userInfo?.lastName}</p>
              </div>
              <p className="border-b-5 border-b-forderground"></p>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Label>Email :</Label>
                  <p className="text-md text-blue-400">{userInfo?.email}</p>
                </div>
                <Copy size={18} />
              </div>
              <p className="border-b-5 border-b-forderground"></p>
              <Card className="flex justify-between items-center flex-row p-1 ">
                <Label>Apperiance</Label>

                <div
                  onClick={() => toggleTheme()}
                  className={`relative w-14 h-8 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 ${
                    theme === "dark" ? "bg-gray-700" : "bg-yellow-400"
                  }`}
                >
                  <Sun className="w-4 h-4 text-white" />
                  <Moon className="w-4 h-4 text-white ml-auto" />
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      theme === "dark" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="login&security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Change Password</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
