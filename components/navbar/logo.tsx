import Image from "next/image";
import logo from "@/public/anantya.png";

const Logo = () => {
  return <Image height={40} width={40} alt="logo" src={logo} />;
};
export default Logo;
