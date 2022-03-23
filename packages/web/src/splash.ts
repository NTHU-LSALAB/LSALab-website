import lottie from "lottie-web";
import * as data from "@/assets/animation/plane.json";
import "@/theme/splash.scss";
const animationData = { ...data };
lottie.loadAnimation({
  container: document.getElementById("lottie")!, // Required
  animationData, // Required
  renderer: "svg", // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "splashAnimation", // Name for future reference. Optional.
});
