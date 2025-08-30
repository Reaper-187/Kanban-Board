import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tabs Navigation */}
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* --- Profile Settings --- */}
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
