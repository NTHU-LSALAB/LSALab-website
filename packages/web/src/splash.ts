import lottie from "lottie-web";
import * as data from "@/assets/animation/plane.json";
import "@/theme/splash.scss";
const animationData = { ...data };
const container = document.getElementById("lottie");
if (container) {
  lottie.loadAnimation({
    container, // Required
    animationData, // Required
    renderer: "svg", // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: "splashAnimation", // Name for future reference. Optional.
  });
}
