// src/ScratchCard.js
import React, { useRef, useEffect } from 'react';

const ScratchCard = ({ width, height, coverImage, onComplete }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const scratchPercent = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cover = new Image();
    cover.src = coverImage;
    cover.onload = () => {
      ctx.drawImage(cover, 0, 0, width, height);
      ctx.globalCompositeOperation = 'destination-out';
    };

    const handleMouseDown = e => {
      isDrawing.current = true;
      const { offsetX, offsetY } = e.nativeEvent;
      lastPoint.current = { x: offsetX, y: offsetY };
    };

    const handleMouseMove = e => {
      if (!isDrawing.current) return;
      const { offsetX, offsetY } = e.nativeEvent;
      const currentPoint = { x: offsetX, y: offsetY };
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.stroke();
      lastPoint.current = currentPoint;

      // 计算刮开区域的百分比
      scratchPercent.current = calculateScratchPercent(ctx, width, height);
      if (scratchPercent.current > 50 && onComplete) {
        onComplete();
      }
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    const calculateScratchPercent = (ctx, width, height) => {
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let clearPixels = 0;
      for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] === 0) {
          clearPixels++;
        }
      }
      return (clearPixels / (width * height)) * 100;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseUp);
    };
  }, [coverImage, width, height, onComplete]);

  return (
    <canvas ref={canvasRef} width={width} height={height} className='border' />
  );
};

export default ScratchCard;
