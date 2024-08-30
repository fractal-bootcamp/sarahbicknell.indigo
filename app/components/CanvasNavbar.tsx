import React, { useEffect, useRef, useState } from 'react';
import styles from './AnimatedLogo.module.css';

interface ArrowPath {
  [key: string]: string;
}

interface Command {
  type: string;
  args: number[];
}

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  centerX: number;
  centerY: number;
}

const CanvasNavbar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawLogo(ctx);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawLogo(ctx);
        if (hoveredArrow) {
          drawScalingArrow(ctx, hoveredArrow, arrowPaths[hoveredArrow]);
        }
      }
    }
  }, [hoveredArrow]);

  const drawScalingArrow = (ctx: CanvasRenderingContext2D, name: string, pathData: string) => {
    const commands = parseSVGPath(pathData);
    const bbox = getBoundingBox(commands);
    const startY = bbox.minY;
    const endY = bbox.maxY;
    const arrowHeight = endY - startY;
    let lastX = 0, lastY = 0;

    ctx.beginPath();
    commands.forEach(({ type, args }, index) => {
      switch (type.toLowerCase()) {
        case 'm':
          [lastX, lastY] = args;
          ctx.moveTo(lastX, lastY);
          break;
        case 'l':
        case 'h':
        case 'v':
          const endX = type.toLowerCase() === 'h' ? lastX + args[0] : args[0];
          const endY = type.toLowerCase() === 'v' ? lastY + args[0] : args[1];
          const startX = lastX;
          const startY = lastY;
          
          // Draw scaled line
          for (let t = 0; t <= 1; t += 0.01) {
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t;
            const scaleFactor = 1 + 2 * ((y - bbox.minY) / arrowHeight);
            const scaledX = bbox.centerX + (x - bbox.centerX) * scaleFactor;
            if (t === 0) {
              ctx.moveTo(scaledX, y);
            } else {
              ctx.lineTo(scaledX, y);
            }
          }
          lastX = endX;
          lastY = endY;
          break;
        case 'c':
          // For curves, we'll just connect the end points for simplicity
          const curveEndX = args[4];
          const curveEndY = args[5];
          ctx.lineTo(curveEndX, curveEndY);
          lastX = curveEndX;
          lastY = curveEndY;
          break;
        case 'a':
          // For arcs, we'll just draw a line to the end point
          ctx.lineTo(args[5], args[6]);
          lastX = args[5];
          lastY = args[6];
          break;
      }
    });
    ctx.fill();
  };

  const getBoundingBox = (commands: Command[]): BoundingBox => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    commands.forEach(({ type, args }) => {
      if (['m', 'l', 'c'].includes(type.toLowerCase())) {
        for (let i = 0; i < args.length; i += 2) {
          minX = Math.min(minX, args[i]);
          maxX = Math.max(maxX, args[i]);
          minY = Math.min(minY, args[i + 1]);
          maxY = Math.max(maxY, args[i + 1]);
        }
      }
    });
    return {
      minX, minY, maxX, maxY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Simple hit detection
      let newHoveredArrow: string | null = null;
      Object.entries(arrowPaths).forEach(([name, path]) => {
        const commands = parseSVGPath(path);
        const bbox = getBoundingBox(commands);
        if (x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
          newHoveredArrow = name;
        }
      });

      setHoveredArrow(newHoveredArrow);
    }
  };

// Helper function to parse SVG path commands
const parseSVGPath = (pathData: string): Command[] => {
    const commands = pathData.match(/[a-df-z][^a-df-z]*/gi) || [];
    return commands.map(cmd => {
      const type = cmd[0];
      const args = cmd.slice(1).trim().split(/[\s,]+/).map(parseFloat);
      return { type, args };
    });
  };
  
  // Draw octagon
  const drawOctagon = (ctx: CanvasRenderingContext2D) => {
    const path = "m 351.9656,154.98966 -82.07639,0.0214 c -1.00183,-10e-6 -1.9626,0.39811 -2.6708,1.10671 l -58.12118,58.151 c -0.66058,0.66185 -1.03135,1.5589 -1.03084,2.494 l 0.0195,82.30184 c 7.9e-4,0.94744 0.37791,1.85577 1.0484,2.52517 l 58.2598,58.23089 c 0.62985,0.62914 1.4838,0.98237 2.37404,0.98201 l 82.28725,-0.0214 c 1.00115,-5.1e-4 1.96112,-0.39859 2.66885,-1.10671 l 58.22075,-58.25038 c 0.59757,-0.59805 0.93323,-1.4089 0.93322,-2.25433 l -0.0214,-83.43653 a 1.1695899,1.1695899 67.485226 0 0 -0.34278,-0.82694 l -58.81716,-58.78664 c -0.72451,-0.72407 -1.70703,-1.13058 -2.73133,-1.13009 z";
    const commands = parseSVGPath(path);
  
    ctx.beginPath();
    commands.forEach(({ type, args }) => {
      switch (type.toLowerCase()) {
        case 'm':
          ctx.moveTo(args[0], args[1]);
          break;
        case 'l':
          ctx.lineTo(args[0], args[1]);
          break;
        case 'c':
          ctx.bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5]);
          break;
        case 'z':
          ctx.closePath();
          break;
      }
    });
    ctx.fill();
  };
  
  // Draw arrows
  const drawArrow = (ctx: CanvasRenderingContext2D, name: string, pathData: string) => {
    const commands = parseSVGPath(pathData);
    let lastX = 0, lastY = 0;

    ctx.beginPath();
    commands.forEach(({ type, args }) => {
      switch (type.toLowerCase()) {
        case 'm':
          [lastX, lastY] = args;
          ctx.moveTo(lastX, lastY);
          break;
        case 'h':
          lastX += args[0];
          ctx.lineTo(lastX, lastY);
          break;
        case 'v':
          lastY += args[0];
          ctx.lineTo(lastX, lastY);
          break;
        case 'l':
          [lastX, lastY] = args;
          ctx.lineTo(lastX, lastY);
          break;
        case 'c':
          ctx.bezierCurveTo(args[0], args[1], args[2], args[3], args[4], args[5]);
          [lastX, lastY] = [args[4], args[5]];
          break;
        case 'a':
          [lastX, lastY] = [args[5], args[6]];
          ctx.lineTo(lastX, lastY);
          break;
      }
    });
    ctx.fill();
  };
  
  // Arrow paths
  const arrowPaths: ArrowPath = {
    'arrow-n': "M 294.62905,154.56506 H 295.32923 A 3.34987,3.34987 135 0 0 298.6791,151.21519 V 115.76863 A 3.3509107,3.3509107 39.205929 0 0 294.65507,112.48603 L 274.10385,116.70015 A 4.6520769,4.6520769 55.188959 0 1 269.22272,109.67999 L 307.56891,48.232289 A 3.8089733,3.8089733 179.80913 0 1 314.01818,48.210799 L 353.40353,110.39733 A 4.3001282,4.3001282 124.62017 0 1 348.90693,116.91061 L 328.11852,112.64785 A 3.7467795,3.7467795 140.79407 0 0 323.61911,116.31828 V 151.87872 A 2.7507117,2.7507117 45 0 0 326.36982,154.62943 H 327.66916",
    'arrow-e': "m 413.96066,274.10893 v -0.70018 a 3.34987,3.34987 0 0 1 3.34987,-3.34987 h 35.44656 a 3.3509107,3.3509107 0 0 1 3.2826,4.02403 l -4.21412,20.55122 a 4.6520769,4.6520769 0 0 0 7.02014,4.88113 l 61.4477,-38.34619 a 3.8089733,3.8089733 0 0 0 0.0215,-6.44927 l -62.18653,-39.38534 a 4.3001282,4.3001282 0 0 0 -6.51329,4.4966 l 4.26276,20.78841 a 3.7467795,3.7467795 0 0 1 -3.6704,4.4994 h -35.56044 a 2.7507117,2.7507117 0 0 1 -2.75071,-2.75071 v -1.29933",
    'arrow-se': "M 372.19207,342.12417 L 372.68717,341.62907 A 3.34987,3.34987 0 0 1 377.42461,341.62907 L 402.48912,366.69358 A 3.3509107,3.3509107 0 0 1 401.96535,371.86014 L 384.45361,383.41222 A 4.6520769,4.6520769 0 0 0 385.96612,391.82769 L 455.53105,408.16292 A 3.8089733,3.8089733 0 0 0 460.10658,403.61779 L 444.98372,331.79575 A 4.3001282,4.3001282 0 0 0 437.19852,330.36974 L 425.51313,348.0836 A 3.7467795,3.7467795 0 0 1 419.74674,348.66978 L 394.60174,323.52476 A 2.7507117,2.7507117 0 0 1 394.60174,319.63467 L 393.68298,318.71591",
    'arrow-s': "M 294.84178,360.73465 H 295.54196 A 3.34987,3.34987 0 0 1 298.89183,364.08452 V 399.53108 A 3.3509107,3.3509107 0 0 1 294.8678,402.81368 L 274.31658,398.59955 A 4.6520769,4.6520769 0 0 0 269.43545,405.61971 L 307.78164,467.06741 A 3.8089733,3.8089733 0 0 0 314.23091,467.04591 L 353.61626,404.85938 A 4.3001282,4.3001282 0 0 0 348.11966,398.34611 L 327.33125,402.60887 A 3.7467795,3.7467795 0 0 1 322.83184,398.93844 V 363.378 A 2.7507117,2.7507117 0 0 1 325.58255,360.62729 H 326.88189",
    'arrow-sw': "M 226.6408,318.92624 L 227.13591,319.42134 A 3.34987,3.34987 0 0 1 227.13591,324.15878 L 202.0714,349.22329 A 3.3509107,3.3509107 0 0 1 196.90484,348.69902 L 185.35277,331.18728 A 4.6520769,4.6520769 0 0 0 176.9373,332.69979 L 160.60207,403.26472 A 3.8089733,3.8089733 0 0 0 165.14719,407.84025 L 237.96923,391.71721 A 4.3001282,4.3001282 0 0 0 239.39524,383.93201 L 221.68139,372.24662 A 3.7467795,3.7467795 0 0 1 221.0952,366.48023 L 245.24022,341.33521 A 2.7507117,2.7507117 0 0 1 249.13031,341.33521 L 250.04907,342.25397",
    'arrow-w': "m 208.08317,241.3242 v 0.70018 a 3.34987,3.34987 0 0 1 -3.34988,3.34987 h -35.44655 a 3.3509107,3.3509107 0 0 1 -3.28261,-4.02403 l 4.21413,-20.55122 a 4.6520769,4.6520769 0 0 0 -7.02015,-4.88113 l -61.44769,38.34619 a 3.8089733,3.8089733 0 0 0 -0.0215,6.44928 l 62.18652,39.38534 a 4.3001282,4.3001282 0 0 0 6.51329,-4.49661 l -4.26276,-20.78841 a 3.7467795,3.7467795 0 0 1 3.6704,-4.4994 h 35.56043 a 2.7507117,2.7507117 0 0 1 2.75072,2.75072 l 1e-5,1.29931"
  };
  
  // Main drawing function
  const drawLogo = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'indigo';
    drawOctagon(ctx);
    
    Object.entries(arrowPaths).forEach(([name, path]) => {
      drawArrow(ctx, name, path);
    });
  };

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className={styles.logo}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default CanvasNavbar