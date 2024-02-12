import CartPage from "~/components/Cart";
import HeadData from "~/components/Head";
import Space from "~/components/Layout/Client/Space";

const Cart = () => {
  return (
    <>
      <Space />
      <HeadData title="Cart" />
      <CartPage />
    </>
  );
};

export default Cart;
