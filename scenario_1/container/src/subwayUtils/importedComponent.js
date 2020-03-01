import React, { useRef, useEffect } from "react";

export function ImportedComponent(props) {
  console.log('======== = = = = = = == = == ', props)
  const { mount = null, unmount = null } = (props || {})
  const _ref = useRef(null);
  useEffect(() => {
    if(mount && _ref && _ref.current) {
      mount({}, { container: _ref.current })
    }
    return () => {
      if(unmount && _ref && _ref.current) {
        unmount({ container: _ref.current })
      }
    };
  });

  return (
    <div ref={_ref} />
  );
}
