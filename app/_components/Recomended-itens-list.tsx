"use client"
import RecomendedItens from "./Recomended-itens"
import SkeletonComponent from "./SkeletonComponent"

interface Recomends{
  id: string;
  nome: string;
  downloadURL: string;
  preco: string;
  categoria: string;
}

interface RecomendsList{
  loadingProp: boolean;
  data: Array<Recomends>;
}

const RecomendedItensList = ({ loadingProp, data }: RecomendsList) => {
  
  const loading = loadingProp
  if (loading) {
    // Indicador de carregamento enquanto os dados são buscados
    return(
      <div className="flex space-x-4 px-5">
        <SkeletonComponent/>
        <SkeletonComponent/>
      </div>
    )
  }

  return (
    <div className="flex flex-row space-x-4 overflow-x-scroll scrollbar-none px-5">
      {data.map(item => (
        <RecomendedItens key={item.id} name={item.nome} img={item.downloadURL} price={item.preco} categoria={item.categoria} id={item.id}/>
      ))}
      
    </div>
  );
}

export default RecomendedItensList;
