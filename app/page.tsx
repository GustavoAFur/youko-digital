"use client"
import { Button } from "@/components/ui/button";
import CategoryList from "./_components/Category-list";
import Header from "./_components/Header";
import RecomendedItensList from "./_components/Recomended-itens-list";
import Search from "./_components/Search";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/src/firebase/firebase";

interface Recomends{
  id: string
  nome: string
  downloadURL: string
  preco: string
  categoria: string
}

let cachedData: Recomends[] | null = null

const Home = () => {

  const [data, setData] = useState<Recomends[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  

  useEffect(() => {
    //TODO: Recomendar produtos mais comprados ou utilizar outro parametro
    const fetchData = async () => {
      if (cachedData) {
        // Se os dados já estão em cache, usá-los
        setData(cachedData)
        return
      }
      
      setLoading(true); // Exibir um indicador de carregamento
      const produtosRef = collection(db, 'produtos')
      const q = query(produtosRef, limit(10))
      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Recomends[];
      
      // Armazenar os dados em cache para não fazer a consulta novamente
      cachedData = items
      setData(items)
      setLoading(false)
    };

    fetchData()
  }, [])

  return ( 
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <CategoryList />
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Recomendados</h2>
          <Button variant="ghost" className="h-fit bg-transparent text-red-700 p-0 hover:bg-transparent">
            Ver mais
            <ChevronRight size={16}/>
          </Button>
        </div>
        <RecomendedItensList loadingProp={loading} data={data}/>
      </div>
    </>
   );
}
 
export default Home;