import AnimatedCursor from "react-animated-cursor";

const CustomCursor = () => (
  <AnimatedCursor
    innerSize={12}
    outerSize={35}
    color="255, 255, 255"              // Pure white for contrast
    outerAlpha={0.3}
    innerScale={1.2}
    outerScale={3}
    showSystemCursor={false}
    clickables={[
      'a',
      'button',
      '.link',
      'input[type="submit"]',
      'input[type="button"]',
      'input[type="text"]',
      'textarea',
    ]}
    // Optional styles
    outerStyle={{
      border: '2px solid #7f9cf5',     // Indigo ring for visibility
    }}
    innerStyle={{
      backgroundColor: '#7f9cf5',      // Matches your brand color
    }}
  />
);

export default CustomCursor;
