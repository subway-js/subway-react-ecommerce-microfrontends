import React, { useState, useEffect } from "react";
import { Message, Transition } from "semantic-ui-react";

const messages = [
  "This is NOT a real ecommerce",
  "Prices and ratings are not real",
  "All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them."
];

export function Disclaimer() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 4000);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <Transition visible={visible} animation="fade up" duration={500}>
      <Message
        color="teal"
        size="tiny"
        onDismiss={handleDismiss}
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          right: 0,
          width: "100%"
        }}
        header="Disclaimer"
        list={messages}
      />
    </Transition>
  );
}
