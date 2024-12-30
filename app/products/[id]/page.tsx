"use client"
import RecomendedItensList from "@/app/_components/Recomended-itens-list";
import { formatCurrency } from "@/app/_helpers/formatCurrency";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/src/firebase/firebase";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductsPageProps{
  params: {
    id: string
  }
}
interface ProductsProps{
  id: string 
  nome: string
  downloadURL: string
  preco: string
  categoria: string
}

let cachedData: ProductsProps | null = null
let cachedDataDrinks: ProductsProps[] | null = null

const ProductsPage = ({ params:{id} }: ProductsPageProps) => {
  
  const router = useRouter()

  const [loadingDrinks, setLoadingDrinks] = useState<boolean>(false)

  const [open, setOpen] = useState<boolean>(false)

  const [data, setData] = useState<ProductsProps | null>(null)

  const [dataDrinks, setDataDrinks] = useState<ProductsProps[]>([])

  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecreaseQuantity = () => {
    setQuantity(prev => {
      if (prev > 1) {
        return prev - 1
      }
      return prev
    })

  }

  useEffect(() => {
    const fetchData = async () => {
      if (cachedData) {
        // Se os dados já estão em cache, usá-los
        setData(cachedData)
        return
      }
      try {
        setLoadingDrinks(true)
        const docRef = doc(db, "produtos", id) // Buscando o documento com base no ID
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() } as ProductsProps)
          cachedData = data
          setLoadingDrinks(false)
        } else {
          console.log("Documento não encontrado")
        }
      } catch (error) {
        console.error("Erro ao buscar o produto:", error)
      }
    };

    fetchData();
  }, [])

    useEffect(() => {
    const fetchData = async () => {
      if (cachedData) {
        // Se os dados já estão em cache, usá-los
        setData(cachedData)
        return
      }
      
      const produtosRef = collection(db, 'produtos')
      const q = query(produtosRef, where('categoria', '==', 'Bebidas') ,limit(10))
      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductsProps[];
      
      
      setDataDrinks(items)
    };

    fetchData()
  }, [])

  return ( 
    <>
      <div className="pb-5">
      <div className="relative w-full h-[320px]">
        <Image 
          src={data?.downloadURL || '/image-not-found.png'} 
          alt={data?.nome || 'Imagem indisponível'} 
          fill 
          className="object-cover"
        />
        <Button 
          onClick={() => router.back()}
          size="icon" 
          className="absolute top-4 left-4 rounded-full bg-white text-black flex items-center justify-center hover:text-white hover:bg-red-700"
        >
          <ChevronLeft />
        </Button>
      </div>

      <div className="pt-5 px-5 relative mt-[-1.5rem] zindex-10 bg-white rounded-tl-3xl rounded-tr-3xl">

        <h1 className="font-semibold text-xl">{data?.nome}</h1>
        <span className="text-xs">{data?.categoria}</span>

        <div className="flex items-center justify-between">
          <h1>
          {formatCurrency(Number(data?.preco))}
          </h1>

          <div className="flex items-center gap-3 text-center">

            <Button 
              size="icon" 
              variant="ghost" 
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon/>
            </Button>

            <span className="w-4">{quantity}</span>

            <Button 
              size="icon" 
              className="bg-red-700"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon/>
            </Button>

          </div>
        </div>  

        <div className="space-y-2 mt-4">
          <h1 className="font-semibold text-lg">Sobre</h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            quaeratsaepe iusto cumque recusandae numquam!
          </p>
        </div>
      </div>
      
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Bebidas</h2>
          <Button variant="ghost" className="h-fit bg-transparent text-red-700 p-0 hover:bg-transparent">
            Ver mais
            <ChevronRight size={16}/>
          </Button>
        </div>
        <RecomendedItensList loadingProp={loadingDrinks} data={dataDrinks}/>
      </div>

      <div className="mt-4 px-5">
        <Button 
          className="bg-red-700 w-full font-semibold"
          onClick={() => setOpen(true)}
        >
          Adicionar ao pedido
        </Button>
      </div>
    </div>

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
      <SheetHeader>
          <SheetTitle>Meu pedido</SheetTitle>
          <SheetDescription>
            Lista de produtos que você selecionou
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

    </>
    
   );
}
 
export default ProductsPage;