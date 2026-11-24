import { createHmac, timingSafeEqual } from "node:crypto";

const esSecretoValido = (secreto) =>
  typeof secreto === "string" && secreto.length > 0;

const esHoraValida = (valor) =>
  typeof valor === "number" && Number.isFinite(valor);

const compararEnTiempoConstante = (primero, segundo) => {
  const bufferPrimero = Buffer.from(primero, "utf8");
  const bufferSegundo = Buffer.from(segundo, "utf8");

  // timingSafeEqual requiere buffers con el mismo largo en bytes.
  return (
    bufferPrimero.length === bufferSegundo.length &&
    timingSafeEqual(bufferPrimero, bufferSegundo)
  );
};

export const crearToken = (secreto, ahoraMs, duracionMs) => {
  if (!esSecretoValido(secreto)) {
    throw new TypeError("El secreto debe ser un texto no vacio.");
  }

  if (!esHoraValida(ahoraMs) || !esHoraValida(duracionMs)) {
    throw new TypeError("La hora y la duracion deben ser numeros finitos.");
  }

  if (duracionMs <= 0) {
    throw new RangeError("La duracion debe ser mayor que cero.");
  }

  const vencimiento = ahoraMs + duracionMs;
  if (!Number.isSafeInteger(vencimiento) || vencimiento < 0) {
    throw new RangeError("El vencimiento debe ser un entero valido.");
  }

  const datos = String(vencimiento);
  // Formato: "<vencimiento en milisegundos>.<firma hexadecimal>".
  // La firma es HMAC-SHA256 codificada con digest("hex"), no en base64.
  const firma = createHmac("sha256", secreto).update(datos).digest("hex");

  return `${datos}.${firma}`;
};

export const verificarToken = (token, secreto, ahoraMs) => {
  if (
    typeof token !== "string" ||
    !esSecretoValido(secreto) ||
    !esHoraValida(ahoraMs)
  ) {
    return false;
  }

  const partes = token.split(".");
  if (partes.length !== 2) {
    return false;
  }

  const [textoVencimiento, firmaRecibida] = partes;
  // Solo aceptamos digitos antes de convertir el vencimiento a numero.
  if (!/^\d+$/.test(textoVencimiento) || !/^[a-f\d]{64}$/i.test(firmaRecibida)) {
    return false;
  }

  const vencimiento = Number(textoVencimiento);
  if (!Number.isSafeInteger(vencimiento) || vencimiento <= ahoraMs) {
    return false;
  }

  const firmaEsperada = createHmac("sha256", secreto)
    .update(textoVencimiento)
    .digest("hex");

  return compararEnTiempoConstante(firmaRecibida, firmaEsperada);
};

export const compararClave = (ingresada, esperada) => {
  if (
    typeof ingresada !== "string" ||
    typeof esperada !== "string" ||
    ingresada.length === 0 ||
    esperada.length === 0
  ) {
    return false;
  }

  return compararEnTiempoConstante(ingresada, esperada);
};
