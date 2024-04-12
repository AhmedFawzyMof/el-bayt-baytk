export const width = window.screen.width;

export const auth: boolean =
  localStorage.getItem("Token") !== "" &&
  localStorage.getItem("Token") !== null;

interface CartItem {
  id: number;
  quantity: number;
  color?: string;
}

interface Cart {
  items: CartItem[];
}

const TheCart: string | null = localStorage.getItem("cart") as string | null;

export function SetCart(): boolean {
  if (!TheCart) {
    localStorage.setItem("Cart", JSON.stringify({ items: [] }));
    return true;
  }

  return false;
}

export function GetCart(): Cart {
  let cart: string | null = localStorage.getItem("Cart");
  let ParsedCart: Cart = { items: [] };
  if (cart) {
    ParsedCart = JSON.parse(cart);
  }
  return ParsedCart;
}

export function AddToCart(id: number, quantity: number, color?: string) {
  let cart: Cart = GetCart();

  cart.items.push({ id, quantity, color });
  localStorage.setItem("Cart", JSON.stringify(cart));
  return;
}

export function RemoveFromCart(id: number, color?: string) {
  let cart: Cart = GetCart();
  if (color) {
    cart.items = cart.items.filter(
      (item) => item.id !== id && item.color !== color
    );
    localStorage.setItem("Cart", JSON.stringify(cart));
    return;
  }
  cart.items = cart.items.filter((item) => item.id !== id);
  localStorage.setItem("Cart", JSON.stringify(cart));

  return;
}

export function ClearCart() {
  localStorage.setItem("Cart", JSON.stringify({ items: [] }));
  return;
}

//:TODO try this tomorrow
