import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { useCart } from "../../context";
import { ProductProps } from "../Product";

import { Wrapper, IconWrapper, Quantity } from "./styles";

const Incrementor = (produto: ProductProps) => {
  const onIncrement = useCart(state=>state.onIncrement);
  const onDecrement = useCart(state=>state.onDecrement);
  const quantidadeItem = useCart(state=>{
    const item = state.items.find(element=>element.id===produto.id);
    return item?.quantity;
  })
  
  return (
      <Wrapper>
      <IconWrapper>
        <SubtractIcon onClick={()=>onDecrement(produto)} aria-label="Subtract item" />
      </IconWrapper>

      <Quantity>{quantidadeItem ? quantidadeItem : 0 }</Quantity>

      <IconWrapper>
        <PlusIcon onClick={()=>onIncrement(produto)} aria-label="Add item" />
      </IconWrapper>
    </Wrapper>
)};

export default Incrementor;
