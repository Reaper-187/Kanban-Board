import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/Context/ThemeContext";

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tabs Navigation */}
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        {/* --- Profile Settings --- */}
        <TabsContent value="theme" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="flex justify-between items-center flex-row p-1 ">
                Theme Switch
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

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Your email" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="********" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Board Settings --- */}
        <TabsContent value="board" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Board Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Board Name</Label>
                <Input placeholder="My Kanban Board" />
              </div>
              <div>
                <Label>Default Columns</Label>
                <Input placeholder="ToDo, In Progress, Done" />
              </div>
              <Button>Update Board</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Task Settings --- */}
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Labels</Label>
                <Input placeholder="Bug, Feature, Urgent" />
              </div>
              <div>
                <Label>Work in Progress Limit</Label>
                <Input type="number" placeholder="e.g. 3" />
              </div>
              <Button>Save Task Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
