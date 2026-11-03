"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  agregarAlCarrito,
  cambiarCantidad,
  contarPrendas,
  quitarDelCarrito,
  validarPedidoGuardado
} from "../lib/carrito.js";

const CLAVE_PEDIDO = "lujuri-pedido";
const PedidoContext = createContext(null);

export function PedidoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const pedidoGuardado = window.localStorage.getItem(CLAVE_PEDIDO);
      if (pedidoGuardado !== null) {
        const pedido = JSON.parse(pedidoGuardado);
        if (validarPedidoGuardado(pedido)) {
          setCarrito(pedido);
        }
      }
    } catch {
      setCarrito([]);
    } finally {
      setCargado(true);
    }
  }, []);

  useEffect(() => {
    if (!cargado) {
      return;
    }

    try {
      window.localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(carrito));
    } catch {
      // El pedido sigue disponible en memoria si el almacenamiento esta bloqueado.
    }
  }, [carrito, cargado]);

  const valor = useMemo(
    () => ({
      carrito,
      cargado,
      cantidadPrendas: contarPrendas(carrito),
      agregarAlPedido: (variante) => {
        setCarrito((actual) => agregarAlCarrito(actual, variante));
      },
      cambiarCantidadPedido: (varianteId, cantidad) => {
        setCarrito((actual) => cambiarCantidad(actual, varianteId, cantidad));
      },
      quitarDelPedido: (varianteId) => {
        setCarrito((actual) => quitarDelCarrito(actual, varianteId));
      },
      vaciarPedido: () => setCarrito([])
    }),
    [carrito, cargado]
  );

  return (
    <PedidoContext.Provider value={valor}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usarPedido() {
  const contexto = useContext(PedidoContext);
  if (contexto === null) {
    throw new Error("usarPedido debe usarse dentro de PedidoProvider");
  }
  return contexto;
}
