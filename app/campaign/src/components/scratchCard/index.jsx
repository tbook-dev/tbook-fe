import { useEffect } from 'react';
import { useRef } from 'react';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';
import './index.css';
export default function Scratchcard ({
  height,
  width,
  imageForwardSrc,
  imageBackgroundSrc,
  onInit,
  onFinish,
}) {
  const ref = useRef();
  useEffect(() => {
    const sc = new ScratchCard(ref.current, {
      scratchType: SCRATCH_TYPE.LINE,
      containerWidth: width,
      containerHeight: height,
      imageForwardSrc: imageForwardSrc,
      imageBackgroundSrc: imageBackgroundSrc,
      clearZoneRadius: 20,
      nPoints: 30,
      pointSize: 4,
      enabledPercentUpdate: true, // True by default
      percentToFinish: 40, // enabledPercentUpdate must to be true (true by default)
      callback: function () {
        // alert('Now the window will reload !');
        typeof onFinish === 'function' && onFinish();
        console.log(sc);
      },
    });
    console.log({ sc });
    // Init
    sc.init()
      .then(onInit)
      .catch(error => {
        // image not loaded
        alert(error.message);
      });
  }, []);

  return <div ref={ref} className='sc__container' />;
}
