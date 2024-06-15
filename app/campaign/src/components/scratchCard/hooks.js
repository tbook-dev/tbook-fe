import { useEffect, useRef, useState } from 'react';
import { preloadImage as loadImage, loadImageUrl } from '@/utils/common';

const useCardInit = (props) => {
  const { canvasRef, width, height, coverColor, coverImg, onInit } = props;
  const isScratching = useRef(false);
  const [initDone, setInitDone] = useState(false); // 网络图片加载有延迟，初始化完成在渲染底层dom
  // const isFinished = useRef(false);
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    initCard();
    return () => {
      destroyCard();
    };
  }, []);

  const generateCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const context = canvas?.getContext('2d');
    if (!context) return;

    if (coverImg) {
      const url = await loadImageUrl(coverImg);
      const image = await loadImage(url);
      context.drawImage(image, 0, 0, width, height);
    } else {
      context.fillStyle = coverColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.globalCompositeOperation = 'destination-out';
  };
  const destroyCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.removeEventListener('mousedown', scratchController.bind(null, true));
    canvas.removeEventListener(
      'touchstart',
      scratchController.bind(null, true)
    );

    canvas.removeEventListener('mousemove', handleScratch);
    canvas.removeEventListener('touchmove', handleScratch);

    canvas.removeEventListener('mouseup', scratchController.bind(null, false));
    canvas.removeEventListener('touchend', scratchController.bind(null, false));
  };

  const clearCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, width, height);
    // isFinished.current = true;
    destroyCard();
    setIsFinished(true);

    // if (autoReinit) {
    // setTimeout(() => {
    // setIsFinished(false);
    // isFinished.current = false;
    // initCard();
    // }, 3000);
    // }
  };

  const getMousePosition = (event) => {
    let posX;
    let posY;

    switch (event.type) {
      case 'touchmove':
        posX = event.touches[0].clientX;
        posY = event.touches[0].clientY;
        break;
      case 'mousemove':
        posX = event.clientX;
        posY = event.clientY;
        break;
    }

    return [posX, posY];
  };
  const handleScratch = (e) => {
    if (!isScratching.current) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const canvasRect = canvas.getClientRects()[0];
    const [cx, cy] = getMousePosition(e);
    const x = cx - canvasRect.x;
    const y = cy - canvasRect.y;

    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
  };

  const checkCardArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const imageData = context.getImageData(0, 0, width, height);
    const imageDataLength = imageData.data.length;

    let counter = 0; // number of pixels cleared

    for (let i = 0; i < imageDataLength; i += 4) {
      // Increment the counter only if the pixel in completely clear
      if (
        imageData.data[i] === 0 &&
        imageData.data[i + 1] === 0 &&
        imageData.data[i + 2] === 0 &&
        imageData.data[i + 3] === 0
      ) {
        counter++;
      }
    }
    const percent = counter >= 1 ? (counter / (width * height)) * 100 : 0;
    if (percent >= 60) {
      clearCard();
    }
  };

  const scratchController = (scratching) => {
    isScratching.current = scratching;
    if (!scratching && !isFinished) {
      checkCardArea();
    }
  };
  const initCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // init canvas
    onInit?.();
    generateCanvas();
    // bind event
    canvas.addEventListener('mousedown', scratchController.bind(null, true));
    canvas.addEventListener('touchstart', scratchController.bind(null, true));

    canvas.addEventListener('mousemove', handleScratch);
    canvas.addEventListener('touchmove', handleScratch);

    canvas.addEventListener('mouseup', scratchController.bind(null, false));
    canvas.addEventListener('touchend', scratchController.bind(null, false));

    setInitDone(true);
  };
  const reInitCard = () => {
    setIsFinished(false);
    initCard();
  };
  return [isScratching.current, isFinished, initDone, clearCard, reInitCard];
};

export { useCardInit };
export default useCardInit;
