import React, { useState, useEffect, useRef } from 'react';
import styles from './AnimatedLogo.module.css';

const AnimatedLogo = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);
  const [svgSize, setSvgSize] = useState({ width: 600, height: 561.33331 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const LOGO_COLOR = '#3b82f6';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2000);

    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSvgSize({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const arrows = [
    { name: 'arrow-e', text: 'ABOUT', textX: 500, textY: -50 },
    { name: 'arrow-se', text: 'VIDEO', textX: 410, textY: 70 },
    { name: 'arrow-s', text: 'SHOP', textX: 305, textY: 150 },
    { name: 'arrow-sw', text: 'TEAM', textX: 190, textY: 70 },
    { name: 'arrow-w', text: 'CONTACT', textX: 100, textY: -50 },
  ];

  const scaleFactor = isAnimationComplete ? 0.5 : 1;
  const centerX = 300;
  const centerY = 280.66665;

  const adjustedArrows = arrows.map(arrow => {
    const adjustedX = centerX + (arrow.textX - centerX) * (scaleFactor + 0.1);
    const adjustedY = centerY + (arrow.textY - centerY) * (scaleFactor + 0.1);
    
    return {
      ...arrow,
      adjustedX: (adjustedX / 600) * svgSize.width,
      adjustedY: (adjustedY / 561.33331) * svgSize.height,
    };
  });

  const extendArrow = (arrowName: string) => {
    const arrow = svgRef.current?.querySelector(`[name="${arrowName}"]`);
    if (arrow) {
      arrow.classList.add(styles.arrowExtended);
    }
  };

  const resetArrow = (arrowName: string) => {
    const arrow = svgRef.current?.querySelector(`[name="${arrowName}"]`);
    if (arrow) {
      arrow.classList.remove(styles.arrowExtended);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <svg
        ref={svgRef}
        className={`${styles.logo} ${isAnimationComplete ? styles.shrunk : ''}`}
        version="1.1"
        id="svg1"
        width="100%"
        height="100%"
        viewBox="-300 0 1200 1122.66662"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
          <g id="layer1">
          <g id="layer2" name="arrows">
      <path
        className={`${styles.arrow} ${styles.arrowN}`}
        name="arrow-n"
        style={{fill: LOGO_COLOR, stroke: "none", transformOrigin: "302.7454425px 154.56506px"}}
        d="M 294.62905,154.56506 H 295.32923 A 3.34987,3.34987 135 0 0 298.6791,151.21519 V 115.76863 A 3.3509107,3.3509107 39.205929 0 0 294.65507,112.48603 L 274.10385,116.70015 A 4.6520769,4.6520769 55.188959 0 1 269.22272,109.67999 L 307.56891,48.232289 A 3.8089733,3.8089733 179.80913 0 1 314.01818,48.210799 L 353.40353,110.39733 A 4.3001282,4.3001282 124.62017 0 1 348.90693,116.91061 L 328.11852,112.64785 A 3.7467795,3.7467795 140.79407 0 0 323.61911,116.31828 V 151.87872 A 2.7507117,2.7507117 45 0 0 326.36982,154.62943 H 327.66916"
      />
      <path
        className={`${styles.arrow} ${styles.arrowE}`}
        name="arrow-e"
        style={{fill: LOGO_COLOR, stroke: "none", transformOrigin: "413.96066px 257.649855px"}}
        d="m 413.96066,274.10893 v -0.70018 a 3.34987,3.34987 0 0 1 3.34987,-3.34987 h 35.44656 a 3.3509107,3.3509107 0 0 1 3.2826,4.02403 l -4.21412,20.55122 a 4.6520769,4.6520769 0 0 0 7.02014,4.88113 l 61.4477,-38.34619 a 3.8089733,3.8089733 0 0 0 0.0215,-6.44927 l -62.18653,-39.38534 a 4.3001282,4.3001282 0 0 0 -6.51329,4.4966 l 4.26276,20.78841 a 3.7467795,3.7467795 0 0 1 -3.6704,4.4994 h -35.56044 a 2.7507117,2.7507117 0 0 1 -2.75071,-2.75071 v -1.29933"

      />
      <path
        className={`${styles.arrow} ${styles.arrowNE}`}
        name="arrow-ne"
        style={{fill: LOGO_COLOR, stroke: "none"}}
        d="M 395.58622,196.55114 L 395.09111,196.05604 A 3.34987,3.34987 0 0 1 395.09111,191.3186 L 420.15562,166.2541 A 3.3509107,3.3509107 0 0 1 425.32218,166.77837 L 436.87426,184.29011 A 4.6520769,4.6520769 0 0 0 445.28973,182.7776 L 461.62496,112.21267 A 3.8089733,3.8089733 0 0 0 457.07984,107.63714 L 385.2578,123.76 A 4.3001282,4.3001282 0 0 0 383.83179,131.54521 L 401.54564,143.2306 A 3.7467795,3.7467795 0 0 1 402.13183,148.99699 L 377.98681,174.14199 A 2.7507117,2.7507117 0 0 1 374.09672,174.14199 L 373.17796,173.22323"
      />
      <path
        className={`${styles.arrow} ${styles.arrowSE}`}
        name="arrow-se"
        style={{fill: LOGO_COLOR, stroke: "none", transformOrigin: '382.937525px 330.42004px'}}
        d="M 372.19207,342.12417 L 372.68717,341.62907 A 3.34987,3.34987 0 0 1 377.42461,341.62907 L 402.48912,366.69358 A 3.3509107,3.3509107 0 0 1 401.96535,371.86014 L 384.45361,383.41222 A 4.6520769,4.6520769 0 0 0 385.96612,391.82769 L 455.53105,408.16292 A 3.8089733,3.8089733 0 0 0 460.10658,403.61779 L 444.98372,331.79575 A 4.3001282,4.3001282 0 0 0 437.19852,330.36974 L 425.51313,348.0836 A 3.7467795,3.7467795 0 0 1 419.74674,348.66978 L 394.60174,323.52476 A 2.7507117,2.7507117 0 0 1 394.60174,319.63467 L 393.68298,318.71591"
      />
      
      <path
        className={`${styles.arrow} ${styles.arrowS}`}
        name="arrow-s"
        style={{fill: LOGO_COLOR, stroke: "none", transformOrigin: "310.861835px 360.73465px"}}
        d="M 294.84178,360.73465 H 295.54196 A 3.34987,3.34987 0 0 1 298.89183,364.08452 V 399.53108 A 3.3509107,3.3509107 0 0 1 294.8678,402.81368 L 274.31658,398.59955 A 4.6520769,4.6520769 0 0 0 269.43545,405.61971 L 307.78164,467.06741 A 3.8089733,3.8089733 0 0 0 314.23091,467.04591 L 353.61626,404.85938 A 4.3001282,4.3001282 0 0 0 348.11966,398.34611 L 327.33125,402.60887 A 3.7467795,3.7467795 0 0 1 322.83184,398.93844 V 363.378 A 2.7507117,2.7507117 0 0 1 325.58255,360.62729 H 326.88189"
      />
      {/* <circle
        cx="310.861835"
        cy="360.73465"
        r="5"
        fill="red"
      />
      <circle 
        cx="310.861835"
        cy="154.56506px"
        r="5"
        fill="red"
      /> */}
      <path
        className={`${styles.arrow} ${styles.arrowSW}`}
        name="arrow-sw"
        style={{fill: LOGO_COLOR, stroke: "none", transformOrigin: "238.344935px 330.590105px"}}
        d="M 226.6408,318.92624 L 227.13591,319.42134 A 3.34987,3.34987 0 0 1 227.13591,324.15878 L 202.0714,349.22329 A 3.3509107,3.3509107 0 0 1 196.90484,348.69902 L 185.35277,331.18728 A 4.6520769,4.6520769 0 0 0 176.9373,332.69979 L 160.60207,403.26472 A 3.8089733,3.8089733 0 0 0 165.14719,407.84025 L 237.96923,391.71721 A 4.3001282,4.3001282 0 0 0 239.39524,383.93201 L 221.68139,372.24662 A 3.7467795,3.7467795 0 0 1 221.0952,366.48023 L 245.24022,341.33521 A 2.7507117,2.7507117 0 0 1 249.13031,341.33521 L 250.04907,342.25397"
      />
      <path
        className={`${styles.arrow} ${styles.arrowW}`}
        name="arrow-w"
        style={{fill: LOGO_COLOR, stroke: "none", transformOrigin: "207.77704px 257.649855px"}}
        d="m 208.08317,241.3242 v 0.70018 a 3.34987,3.34987 0 0 1 -3.34988,3.34987 h -35.44655 a 3.3509107,3.3509107 0 0 1 -3.28261,-4.02403 l 4.21413,-20.55122 a 4.6520769,4.6520769 0 0 0 -7.02015,-4.88113 l -61.44769,38.34619 a 3.8089733,3.8089733 0 0 0 -0.0215,6.44928 l 62.18652,39.38534 a 4.3001282,4.3001282 0 0 0 6.51329,-4.49661 l -4.26276,-20.78841 a 3.7467795,3.7467795 0 0 1 3.6704,-4.4994 h 35.56043 a 2.7507117,2.7507117 0 0 1 2.75072,2.75072 l 1e-5,1.29931"
      />
      <path
        className={`${styles.arrow} ${styles.arrowNW}`}
        name="arrow-nw"
        style={{fill: LOGO_COLOR, stroke: "none"}}
        d="m 249.78477,173.18485 -0.4951,0.49511 a 3.34987,3.34987 0 0 1 -4.73744,-1e-5 l -25.0645,-25.0645 a 3.3509107,3.3509107 0 0 1 0.52427,-5.16657 l 17.51175,-11.55207 a 4.6520769,4.6520769 0 0 0 -1.51252,-8.41547 L 165.4463,107.14611 a 3.8089733,3.8089733 0 0 0 -4.57553,4.54513 l 16.12288,71.82215 a 4.3001282,4.3001282 0 0 0 7.78517,1.42601 l 11.6854,-17.71385 a 3.7467795,3.7467795 0 0 1 5.77692,-0.58619 l 25.14502,25.14502 a 2.7507117,2.7507117 0 0 1 0,3.8901 l -0.91875,0.91876"
      />
    <path
      name="octagon"
      id="path1"
      style={{fill: LOGO_COLOR, stroke: "none"}}
      d="m 351.9656,154.98966 -82.07639,0.0214 c -1.00183,-10e-6 -1.9626,0.39811 -2.6708,1.10671 l -58.12118,58.151 c -0.66058,0.66185 -1.03135,1.5589 -1.03084,2.494 l 0.0195,82.30184 c 7.9e-4,0.94744 0.37791,1.85577 1.0484,2.52517 l 58.2598,58.23089 c 0.62985,0.62914 1.4838,0.98237 2.37404,0.98201 l 82.28725,-0.0214 c 1.00115,-5.1e-4 1.96112,-0.39859 2.66885,-1.10671 l 58.22075,-58.25038 c 0.59757,-0.59805 0.93323,-1.4089 0.93322,-2.25433 l -0.0214,-83.43653 a 1.1695899,1.1695899 67.485226 0 0 -0.34278,-0.82694 l -58.81716,-58.78664 c -0.72451,-0.72407 -1.70703,-1.13058 -2.73133,-1.13009 z m -72.24636,24.47622 62.42804,0.20459 c 1.05893,0.004 2.07304,0.42694 2.81918,1.17685 l 43.86714,44.06773 c 0.59933,0.60214 0.93434,1.4173 0.93127,2.26602 l -0.205,62.52135 c -0.003,0.79863 -0.32409,1.5633 -0.89222,2.12574 l -44.52117,44.13982 c -0.5535,0.54892 -1.30284,0.8559 -2.08315,0.85341 l -62.75213,-0.20653 c -0.80148,-0.003 -1.56907,-0.32296 -2.13391,-0.89044 l -43.99013,-44.19048 c -0.70213,-0.70587 -1.09468,-1.6611 -1.09136,-2.65571 l 0.20304,-61.80627 c 0.004,-1.11033 0.45016,-2.17353 1.23974,-2.95577 l 44.22832,-43.85145 c 0.51883,-0.51422 1.22114,-0.80159 1.95234,-0.79886 z"
    />
    <g name="middleparts" id="g37" style={{fill: LOGO_COLOR}}>
      <path
        name="inner-middle"
        id="path33"
        style={{fill: LOGO_COLOR, stroke: "none"}}
        d="M 293.97656 179.02344 C 299.10112 179.07154 298.86133 183.01758 298.86133 183.01758 C 298.86133 183.01758 299.04923 328.01009 298.98438 332.29102 C 298.91948 336.57195 294.25 336.63672 294.25 336.63672 L 310.97461 336.70703 L 310.97461 336.77344 L 327.99023 336.7168 C 327.99023 336.7168 323.29927 336.63836 323.23438 332.35742 C 323.16952 328.0765 323.35938 183.08203 323.35938 183.08203 C 323.35938 183.08203 323.11763 179.13599 328.24219 179.08789 L 311.24414 179.13281 L 311.24414 179.06641 L 293.97656 179.02344 z "
      />
      <path
        name='inner-left'
        style={{fill: LOGO_COLOR, stroke: "none"}}
        d="m 243.77666,213.6261 c 3.14693,-3.12637 6.72698,0.77121 6.72698,0.77121 0,0 45.65642,45.77236 47.05346,47.05346 1.39704,1.2811 1.47242,2.81681 1.47242,2.81681 v -47.43757 c 0,0 0.064,-7.04201 0,0.064 -0.064,7.10603 -4.5453,6.01772 -4.5453,6.01772 0,0 1.53644,0 0,0 -1.53644,0 -4.99343,-3.77708 -4.99343,-3.77708 l -22.47043,-22.59846 c 0,0 3.26494,3.20091 0,0 -3.26493,-3.20092 0.51215,-6.72193 0.51215,-6.72193 z"
      />
      <path
        name="inner-right"
        style={{fill: LOGO_COLOR, stroke: "none"}}
        d="m 378.26004,213.6261 c -3.14693,-3.12637 -6.72698,0.77121 -6.72698,0.77121 0,0 -45.65642,45.77236 -47.05346,47.05346 -1.39704,1.2811 -1.47242,2.81681 -1.47242,2.81681 v -47.43757 c 0,0 -0.064,-7.04201 0,0.064 0.064,7.10603 4.5453,6.01772 4.5453,6.01772 0,0 -1.53644,0 0,0 1.53644,0 4.99343,-3.77708 4.99343,-3.77708 l 22.47043,-22.59846 c 0,0 -3.26494,3.20091 0,0 3.26493,-3.20092 -0.51215,-6.72193 -0.51215,-6.72193 z"
      />
    </g>
  </g>
  </g>
  </svg>
      {isAnimationComplete && (
        <div className={styles.links}>
          {adjustedArrows.map((arrow) => (
            <a
              key={arrow.name}
              href={`#${arrow.text.toLowerCase()}`}
              className={styles.link}
              style={{
                left: `${(arrow.adjustedX / svgSize.width) * 100}%`,
                top: `${(arrow.adjustedY / svgSize.height) * 100}%`,
              }}
              onMouseEnter={() => {
                setHoveredArrow(arrow.name);
                extendArrow(arrow.name);
              }}
              onMouseLeave={() => {
                setHoveredArrow(null);
                resetArrow(arrow.name);
              }}
            >
              {arrow.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimatedLogo;