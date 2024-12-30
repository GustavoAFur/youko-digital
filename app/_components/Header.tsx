
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return ( 
    <div className="flex justify-between pt-6 px-5">
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <Button size={"icon"} variant={"outline"} className="bg-transparent border-none">
        <MenuIcon />
      </Button>
    </div>
   );
}
 
export default Header;