import { useCart } from "../../context";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

export type ProductProps = {
  id: number;
  name: string;
  price: number;
  picture: string;
  storage: number;
};

const Product = ({ id, name, price, picture, storage }: ProductProps) => {
  const formattedPrice = Intl.NumberFormat("pt-BR", {style:'currency',currency:'BRL'}).format(price);
  return(
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />
  
      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>{formattedPrice}</Text>
        </Column>
  
        <WrapperIncrementor>
          <Incrementor {...{id,name,picture,price,storage}} />
        </WrapperIncrementor>
      </Info>
    </Wrapper>
    )
  };
  

export default Product;
