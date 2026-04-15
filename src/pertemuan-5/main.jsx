import { createRoot } from 'react-dom/client'
import WisataIndonesia from './WisataIndonesia'
import "./tailwind.css";
export default function App() { return <WisataIndonesia /> }

createRoot(document.getElementById("root")).render(
  <div>
    {/* <TailwindCSS/> */}
    {/* <UserForm/> */}
    {/* <HitungGajiForm/> */}
    <WisataIndonesia/>
  </div>,
);