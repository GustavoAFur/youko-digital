
import Image from "next/image";

interface CategoryItensProps {
  name: string;
  img: string
}
const CategoryItens = ({ name, img }: CategoryItensProps) => {
  return ( 
    <div className="flex items-center gap-3 py-2 px-4 bg-[#f5f5f5] shadow-md rounded-full flex-shrink-0 ">
      <Image src={img} alt={name} width={30} height={30} />
      <span className="font-semibold text-sm">{name}</span>
    </div>
   );
}
 
export default CategoryItens;