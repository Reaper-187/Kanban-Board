import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Moon, Sun } from "lucide-react";
import { useTheme } from "@/Context/ThemeContext";
import { useAuth } from "@/Context/AuthContext/AuthContext";
import { useState } from "react";
import { ChangePw } from "./Auth-Pages/ChangePw";

export function Settings() {
  const { userInfo } = useAuth();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const copyEmailToClipboard = async () => {
    if (!userInfo.email) return;
    await navigator.clipboard.writeText(userInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyIdToClipboard = async () => {
    if (!userInfo.userId) return;
    await navigator.clipboard.writeText(userInfo.userId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="login&security">Login & security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 w-full xl:w-1/2 ">
          <Card>
            <CardHeader>
              <CardTitle>User-Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="border-b-5 border-b-forderground"></p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Label>Employee-ID :</Label>
                  <p className="text-sm md:text-md text-blue-400">
                    {userInfo.userId}
                  </p>
                </div>
                <button
                  onClick={copyIdToClipboard}
                  className={`p-1 rounded-lg transition-all duration-300 cursor-pointer ${
                    copiedId
                      ? "bg-green-100 text-green-600 scale-110"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:scale-105"
                  }`}
                >
                  {copiedId ? (
                    <Check size={15} className="animate-pulse" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              <div className="flex gap-3">
                <Label>Employee-Role :</Label>
                <p className="text-sm md:text-md text-blue-400">
                  {userInfo?.userRole}
                </p>
              </div>
              <p className="border-b-5 border-b-forderground"></p>

              <div className="flex gap-3">
                <Label>Name :</Label>
                <p className="text-sm md:text-md text-blue-400">
                  {userInfo?.firstName}
                </p>
                <p className="text-sm md:text-md text-blue-400">
                  {userInfo?.lastName}
                </p>
              </div>
              <p className="border-b-5 border-b-forderground"></p>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Label>Email :</Label>
                  <p className="text-sm md:text-md text-blue-400">
                    {userInfo.email}
                  </p>
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className={`p-1 rounded-lg transition-all duration-300 cursor-pointer ${
                    copiedEmail
                      ? "bg-green-100 text-green-600 scale-110"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:scale-105"
                  }`}
                >
                  {copiedEmail ? (
                    <Check size={15} className="animate-pulse" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              <p className="border-b-5 border-b-forderground"></p>

              <Card className="flex justify-between items-center flex-row p-1">
                <Label>Appearance</Label>
                <div
                  onClick={toggleTheme}
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
          {userInfo.provider !== null || userInfo.userRole === "guest" ? (
            <Card className="w-fit p-2 flex justify-self-center text-lg">
              <p>Not Allowed for your Account</p>
            </Card>
          ) : (
            <ChangePw />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
