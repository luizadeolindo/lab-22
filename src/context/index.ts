import axios from "axios";
import create from "zustand";
import { ProductProps } from "../components/Product";

type ProductHookProps = {
    products: ProductProps[];
    setProducts: () => void;
}


export const useProducts = create <ProductHookProps> ((set) => ({
products: [],
setProducts: async () => {
    const response = await axios.get("http://localhost:3001/products")
    console.log(response.data)
    set(() => ({products: response.data})
    )
}
}))


type cartHookProps = {
    items: (ProductProps & {quantity:number})[];
    contaItems:number;
    precoTotal:number;
    onIncrement:(newItem:ProductProps)=>void;
    onDecrement:(newItem:ProductProps)=>void;
}

export const useCart = create<cartHookProps>((set)=> ({
    items: [],
    contaItems: 0,
    precoTotal: 0,
    onIncrement:(newItem)=>set((x)=>{
            let productAlreadyInCart = x.items.find(element=>element.id===newItem.id)
            if (!productAlreadyInCart){
                x.items.push({...newItem, quantity:1})
                x.contaItems+=1;
                x.precoTotal+=newItem.price;                
            }else if(productAlreadyInCart.storage<=productAlreadyInCart.quantity){
                alert(`Quantidade não disponível`)
                return;
            }else{
                productAlreadyInCart.quantity+=1;
                x.contaItems+=1;
                x.precoTotal+=newItem.price;
            } 
            console.log(x)
            
        }),
        onDecrement:(newItem)=>set((state)=>{
            let productAlreadyInCart = state.items.find(element=>element.id===newItem.id)
            if (!productAlreadyInCart){
                return;
            } else if (productAlreadyInCart.quantity===1 ){
                const itemIndex = state.items.indexOf(productAlreadyInCart)
                state.contaItems-=1;
                state.precoTotal-=newItem.price;
                state.items.splice(itemIndex,1)
            } else{
                productAlreadyInCart.quantity-=1
                state.contaItems-=1;
                state.precoTotal-=newItem.price;
            }
        })
    })
)
