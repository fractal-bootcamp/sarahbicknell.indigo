'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import indigoLogo from '../../public/indigologo.png';

const AnimatedNavbar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const router = useRouter();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Store', path: '/store' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const arrowPositions = [
    { angle: 0, x: 0, y: -1 },
    { angle: Math.PI / 4, x: 0.7071, y: -0.7071 },
    { angle: Math.PI / 2, x: 1, y: 0 },
    { angle: 3 * Math.PI / 4, x: 0.7071, y: 0.7071 },
    { angle: Math.PI, x: 0, y: 1 },
    { angle: 5 * Math.PI / 4, x: -0.7071, y: 0.7071 },
    { angle: 3 * Math.PI / 2, x: -1, y: 0 },
    { angle: 7 * Math.PI / 4, x: -0.7071, y: -0.7071 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const logo = new (window as any).Image(200, 200) as HTMLImageElement;
    logo.src = indigoLogo.src;
    logo.onload = () => setLogoLoaded(true);

    const warpImage = (
      srcCtx: CanvasRenderingContext2D,
      dstCtx: CanvasRenderingContext2D,
      warpFactor: number,
      hoveredIndex: number | null
    ) => {
      const { width, height } = srcCtx.canvas;
      const imageData = srcCtx.getImageData(0, 0, width, height);
      const dstImageData = dstCtx.createImageData(width, height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          let r = distance;
          if (hoveredIndex !== null) {
            const targetAngle = arrowPositions[hoveredIndex].angle;
            const angleDiff = Math.abs(angle - targetAngle);
            if (angleDiff < Math.PI / 8) {
              r += warpFactor * Math.cos(angleDiff * 8) * (distance / (width / 2));
            }
          } else {
            r += warpFactor * Math.sin(angle * 4) * (distance / (width / 2));
          }

          const srcX = Math.round(width / 2 + r * Math.cos(angle));
          const srcY = Math.round(height / 2 + r * Math.sin(angle));

          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            dstImageData.data[dstIndex] = imageData.data[srcIndex];
            dstImageData.data[dstIndex + 1] = imageData.data[srcIndex + 1];
            dstImageData.data[dstIndex + 2] = imageData.data[srcIndex + 2];
            dstImageData.data[dstIndex + 3] = imageData.data[srcIndex + 3];
          }
        }
      }

      dstCtx.putImageData(dstImageData, 0, 0);
    };

    const animate = () => {
      if (!logoLoaded) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      const offscreenCtx = offscreenCanvas.getContext('2d');
      if (!offscreenCtx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const logoSize = isMinimized ? 80 : 200;
      const logoX = canvas.width / 2 - logoSize / 2;
      const logoY = isMinimized ? 20 : canvas.height / 2 - logoSize / 2;

      // Calculate the aspect ratio
      const aspectRatio = logo.width / logo.height;
      let drawWidth = logoSize;
      let drawHeight = logoSize;

      if (aspectRatio > 1) {
        // Image is wider than tall
        drawHeight = drawWidth / aspectRatio;
      } else {
        // Image is taller than wide
        drawWidth = drawHeight * aspectRatio;
      }

      // Center the image within the logoSize square
      const offsetX = (logoSize - drawWidth) / 2;
      const offsetY = (logoSize - drawHeight) / 2;

      offscreenCtx.drawImage(logo, logoX + offsetX, logoY + offsetY, drawWidth, drawHeight);

      const warpFactor = isMinimized ? 10 : 0;
      const hoveredIndex = hoveredLink ? links.findIndex(link => link.name === hoveredLink) : null;

      warpImage(offscreenCtx, ctx, warpFactor, hoveredIndex);

      // Draw link text
      if (isMinimized) {
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        arrowPositions.forEach((arrowPos, index) => {
          const textDistance = 70;
          const textX = logoX + logoSize / 2 + (logoSize / 2 + textDistance) * arrowPos.x;
          const textY = logoY + logoSize / 2 + (logoSize / 2 + textDistance) * arrowPos.y;
          ctx.fillText(links[index].name, textX, textY);
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMinimized, hoveredLink, logoLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => setIsMinimized(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px]">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full"
      />
      {isMinimized && (
        <div className="absolute top-0 left-0 w-full h-full">
          {arrowPositions.map((arrowPos, index) => {
            const link = links[index];
            const logoSize = 80; // Minimized logo size
            const logoX = 400 - logoSize / 2;
            const logoY = 20;
            const textDistance = 70;
            const buttonX = logoX + logoSize / 2 + (logoSize / 2 + textDistance) * arrowPos.x;
            const buttonY = logoY + logoSize / 2 + (logoSize / 2 + textDistance) * arrowPos.y;
            return (
              <button
                key={link.name}
                className="absolute text-transparent"
                style={{
                  top: `${buttonY}px`,
                  left: `${buttonX}px`,
                  width: '80px',
                  height: '30px',
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => router.push(link.path)}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnimatedNavbar;