import { useRef, useLayoutEffect, useState } from 'react';

function useDimensions() {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({});

  useLayoutEffect(() => {
    if (ref.current) {
      setDimensions(ref.current.getClientBoundingRect());
    }
  }, []);

  return [ref, dimensions];
}

export default useDimensions;
