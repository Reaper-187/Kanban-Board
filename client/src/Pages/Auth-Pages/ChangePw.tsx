import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const ChangePw = () => {
  const [showPassword, setShowPassword] = useState(false);

  const criteriaList = [
    "Minumum characters 12",
    "One uppercase charachter",
    "One lowercase charachter",
    "One speacial charachter",
    "One number",
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 w-1/2">
          <form className="space-y-3">
            <p>Old Password</p>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p>New Password</p>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <li className="ml-5">
              {criteriaList.map((criteria) => (
                <li>{criteria}</li>
              ))}
            </li>

            <p>Confirm New Password</p>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Button className="w-full bg-indigo-500">
              Change New Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
