import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../_helpers/formatCurrency";

interface RecomendsProps {
  id: string
  name: string
  img: string
  price: string
  categoria: string
}
const RecomendedItens = ({ name, img, price, categoria, id }: RecomendsProps) => {
  return (
    <Link href={`/products/${id}`} className="w-[150px] flex-shrink-0 ">
      <div className="w-full truncate">
        <div className="w-full h-[150px] relative">
          {
            img !== '' ?
              <Image src={img} alt={name} fill className="rounded-md" /> :
              <Image src={'/image-not-found.png'} alt={name} fill className="rounded-md" />
          }
        </div>
        <span className="font-semibold">{name}</span>
        <h2>
          {formatCurrency(Number(price))}
        </h2>
        <h4 className="text-xs">{categoria}</h4>
      </div>
    </Link>
  );
}

export default RecomendedItens;