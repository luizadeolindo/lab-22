import { Dispatch, SetStateAction } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header } from "./styles";
import { useCart } from "../../context";
import Product from "../Product";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};


 const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => {
  const  itemsCarrinho = useCart(state => (state.items));
  const total = useCart(state => (state.precoTotal));
  const priceFormatted = Intl.NumberFormat("pt-BR", {style:'currency',currency:'BRL'}).format(total);

  return(
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          Produtos no carrinho
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
      {
        itemsCarrinho.length === 0 ? (
          <p>Carrinho vazio</p>
        )
        :(
          <>
          {itemsCarrinho.map(product => {
            return <Product {...product}/>;
          })}
          <Subtotal>
          <Typography level={5} size="large" fontWeight={600}>
            Total
          </Typography>
          <Typography>{priceFormatted}</Typography>
        </Subtotal>
        <Button fullWidth>Finalizar compra</Button>
        </>
        )
      }        
    </Wrapper>
  )
};

export default MenuPayment;