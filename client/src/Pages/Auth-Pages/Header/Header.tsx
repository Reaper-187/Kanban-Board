import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="absolute top-5 right-5 felx justify-self-end">
      <Button>
        <Link to={"/register"}>Switch to Register</Link>
      </Button>
    </div>
  );
};
