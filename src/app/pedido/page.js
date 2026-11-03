import BotonWhatsApp from "../../components/BotonWhatsApp.js";
import ResumenPedido from "../../components/ResumenPedido.js";

export const metadata = {
  title: "Mi pedido · LujUri Boutique",
  description: "Revisá tu pedido y envialo por WhatsApp.",
};

export default function Pedido() {
  return (
    <main className="contenido">
      <h1>Mi pedido</h1>
      <ResumenPedido />
      <BotonWhatsApp />
    </main>
  );
}
