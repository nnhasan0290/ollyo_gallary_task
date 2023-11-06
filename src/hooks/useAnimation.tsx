import { useEffect, useState } from "react";

const useAnimation = (prevPos: any, index: any) => {
  const [animation, setAnimation] = useState("");
  const addStylesheetRules = (rules: any) => {
    let styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    let styleSheet: any = styleEl.sheet;
    styleSheet.insertRule(rules, 0);
  };

  useEffect(() => {
    let animationName = `anim_${index}`;
    let keyframes = `
        @-webkit-keyframes animationName {
            0% {-webkit-transform:translateX(${get_distance_x(
              prevPos,
              index
            )})} 
    
        100% {-webkit-transform:translateX(0)}
        }`;
    addStylesheetRules(keyframes);
    setAnimation(animationName);
  }, [prevPos, index]);

  const styles = {
    animationName: `${animation}`,
    animationDuration: "0.5s",
  };

  return { styles };
};

export default useAnimation;

const get_distance_x = (prevPos: any, index: any) => {
  const elements = document.querySelectorAll(".gallary__item");
  const prevEl = elements[prevPos]?.getBoundingClientRect();
  const currentEl = elements[index]?.getBoundingClientRect();
  let gap_betw = 0;
  if (prevEl?.left !== currentEl.left) {
    const distance_x = prevEl?.left - currentEl?.left;

    gap_betw =
      distance_x > 0 ? distance_x - prevEl?.width : distance_x + prevEl?.width;
  }
  console.log(gap_betw);
  return `${gap_betw}px`;
};
