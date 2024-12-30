"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import  { db }  from "../../src/firebase/firebase";
import CategoryItens from "./Category-itens";

interface Item {
  id: string
  nome: string
  img: string
}

let cachedData: Item[] | null = null
const CategoryList = () => {
  const [data, setData] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (cachedData) {
        // Se os dados já estão em cache, usá-los
        setData(cachedData)
        return
      }

      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'categorias'))
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))as Item[];
      cachedData = items
      setData(items)
      setLoading(false)
    };

    fetchData()
    
  }, [])

  return ( 
    
      <div className="overflow-x-scroll scrollbar-none flex flex-row space-x-4 px-5 pt-6 pb-1">
        {
          data.map(item => (
            <CategoryItens key={item.id} name={item.nome} img={item.img} />
          ))
        }
      </div>

   );
}
 
export default CategoryList;