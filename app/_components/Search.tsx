import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return ( 
    <div className="flex gap-2">
      <Input placeholder="Procure por algum produto..."/>
      <Button size={"icon"} className="bg-red-700 p-2">
        <SearchIcon size={20}/>
      </Button>
    </div>
   );
}
 
export default Search;