import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

export function AddToCartButton({ product, size, onClick }) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      size={size}
      fluid
      loading={loading}
      color="teal"
      onClick={() => {
        setLoading(true);
        setTimeout(() => {
          onClick(product);
          setLoading(false);
        }, 500);
      }}
    >
      <Button.Content>
        <Icon name="shop" /> Add to cart
      </Button.Content>
    </Button>
  );
}
