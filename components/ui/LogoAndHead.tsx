import Logo from "./Logo";
/**
 * 
 * @param header 
 */
const LogoAndHeader = ({ header }: { header: string }) => {
    return <div className={`capitalize font-bold text-3xl mb-8 flex items-center justify-center`}>  <Logo /> | {header}</div>
}
export default LogoAndHeader;