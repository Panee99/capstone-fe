import React, { useEffect } from 'react';
import bwipjs from 'bwip-js';

interface Props {
  value: string;
  style: React.CSSProperties | undefined;
}
export default function Barcode({ value, style }: Props) {
  const id = 'barcode-' + value;
  useEffect(() => {
    let barcode = bwipjs.toCanvas(id, {
      bcid: 'code93',
      text: value,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <canvas id={id} style={style} />;
}
