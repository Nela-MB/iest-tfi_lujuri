import { describe, expect, it } from "vitest";
import {
  compararClave,
  crearToken,
  verificarToken
} from "../src/lib/sesion.js";

const SECRETO = "secreto-inventado-para-tests";
const OTRO_SECRETO = "otro-secreto-inventado-para-tests";
const AHORA_MS = Date.UTC(2026, 0, 1);
const DURACION_MS = 60 * 60 * 1000;

describe("crearToken y verificarToken", () => {
  it("verifica un token vigente creado con el mismo secreto", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);

    expect(verificarToken(token, SECRETO, AHORA_MS)).toBe(true);
  });

  it("rechaza un token vencido", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);

    expect(verificarToken(token, SECRETO, AHORA_MS + DURACION_MS)).toBe(false);
  });

  it("rechaza un token si se cambia un caracter", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);
    const tokenAlterado = `${token[0] === "x" ? "y" : "x"}${token.slice(1)}`;

    expect(verificarToken(tokenAlterado, SECRETO, AHORA_MS)).toBe(false);
  });

  it("rechaza un token firmado con otro secreto", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);

    expect(verificarToken(token, OTRO_SECRETO, AHORA_MS)).toBe(false);
  });

  it.each([
    ["vacio", ""],
    ["null", null],
    ["undefined", undefined],
    ["sin el formato esperado", "sin-formato"]
  ])("rechaza un token %s sin lanzar errores", (_, token) => {
    expect(() => verificarToken(token, SECRETO, AHORA_MS)).not.toThrow();
    expect(verificarToken(token, SECRETO, AHORA_MS)).toBe(false);
  });
});

describe("compararClave", () => {
  it("acepta claves iguales", () => {
    expect(compararClave("clave-inventada-123", "clave-inventada-123")).toBe(
      true
    );
  });

  it("rechaza claves diferentes", () => {
    expect(compararClave("clave-inventada-123", "otra-clave-inventada")).toBe(
      false
    );
  });

  it.each([
    ["ingresada vacia", "", "clave-inventada-123"],
    ["esperada vacia", "clave-inventada-123", ""],
    ["ingresada undefined", undefined, "clave-inventada-123"],
    ["esperada undefined", "clave-inventada-123", undefined]
  ])("rechaza una clave %s", (_, ingresada, esperada) => {
    expect(compararClave(ingresada, esperada)).toBe(false);
  });
});

describe("casos limite de crearToken y verificarToken", () => {
  it.each([
    ["vacio", ""],
    ["undefined", undefined]
  ])("crearToken lanza un error si el secreto es %s", (_, secreto) => {
    expect(() => crearToken(secreto, AHORA_MS, DURACION_MS)).toThrow();
  });

  it.each([
    ["vacio", ""],
    ["undefined", undefined]
  ])("verificarToken rechaza un secreto %s", (_, secreto) => {
    const token = crearToken(OTRO_SECRETO, AHORA_MS, DURACION_MS);

    expect(verificarToken(token, secreto, AHORA_MS)).toBe(false);
  });

  it("rechaza un vencimiento modificado sin recalcular la firma", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);
    const partes = token.split(".");
    const tokenAlterado = ["9999999999999", ...partes.slice(1)].join(".");

    expect(partes).toHaveLength(2);
    expect(verificarToken(tokenAlterado, SECRETO, AHORA_MS)).toBe(false);
  });

  it("rechaza un cambio en el ultimo caracter de la firma", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);
    const ultimoCaracter = token[token.length - 1];
    const caracterAlternativo = ultimoCaracter === "a" ? "b" : "a";
    const tokenAlterado = `${token.slice(0, -1)}${caracterAlternativo}`;

    expect(verificarToken(tokenAlterado, SECRETO, AHORA_MS)).toBe(false);
  });

  it("acepta el token justo antes del vencimiento y lo rechaza despues", () => {
    const token = crearToken(SECRETO, AHORA_MS, DURACION_MS);

    expect(
      verificarToken(token, SECRETO, AHORA_MS + DURACION_MS - 1)
    ).toBe(true);
    expect(
      verificarToken(token, SECRETO, AHORA_MS + DURACION_MS + 1)
    ).toBe(false);
  });

  it.each([
    ["un numero", 123, AHORA_MS],
    ["un objeto", {}, AHORA_MS],
    ["un texto extenso", "a".repeat(10000), AHORA_MS],
    ["un texto con muchos puntos", "a.b.c.d", AHORA_MS],
    ["una firma con caracteres no validos", "1234567890.!", AHORA_MS],
    [
      "ahoraMs undefined",
      crearToken(SECRETO, AHORA_MS, DURACION_MS),
      undefined
    ],
    ["ahoraMs NaN", crearToken(SECRETO, AHORA_MS, DURACION_MS), Number.NaN]
  ])("rechaza %s sin lanzar errores", (_, token, ahoraMs) => {
    expect(() => verificarToken(token, SECRETO, ahoraMs)).not.toThrow();
    expect(verificarToken(token, SECRETO, ahoraMs)).toBe(false);
  });
});

describe("casos limite de compararClave", () => {
  it("rechaza claves distintas del mismo largo", () => {
    expect(compararClave("clave-prueba-uno", "clave-prueba-dos")).toBe(false);
  });

  it("compara correctamente claves iguales y distintas con tilde o eñe", () => {
    expect(compararClave("contraseña-ficticia", "contraseña-ficticia")).toBe(
      true
    );
    expect(compararClave("contraseña-ficticia", "contrasena-ficticia")).toBe(
      false
    );
    expect(compararClave("niño-inventado", "niño-inventado")).toBe(true);
    expect(compararClave("niño-inventado", "nino-inventado")).toBe(false);
  });

  it.each([
    ["null ingresada", null, "clave-inventada"],
    ["null esperada", "clave-inventada", null],
    ["numero ingresado", 12345, "12345"],
    ["numero esperado", "12345", 12345]
  ])("rechaza una clave %s sin lanzar errores", (_, ingresada, esperada) => {
    expect(() => compararClave(ingresada, esperada)).not.toThrow();
    expect(compararClave(ingresada, esperada)).toBe(false);
  });
});

describe("validacion de parametros de crearToken", () => {
  it.each([
    ["cero", 0],
    ["negativa", -1],
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["undefined", undefined],
    ["texto", "duracion"],
    ["numero escrito como texto", "3600000"]
  ])("lanza un error si duracionMs es %s", (_, duracionMs) => {
    expect(() => crearToken(SECRETO, AHORA_MS, duracionMs)).toThrow();
  });

  it.each([
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["undefined", undefined],
    ["texto", "ahora"]
  ])("lanza un error si ahoraMs es %s", (_, ahoraMs) => {
    expect(() => crearToken(SECRETO, ahoraMs, DURACION_MS)).toThrow();
  });
});

describe("compararClave con valores vacios equivalentes", () => {
  it("rechaza dos claves vacias", () => {
    expect(compararClave("", "")).toBe(false);
  });

  it("rechaza dos claves undefined", () => {
    expect(compararClave(undefined, undefined)).toBe(false);
  });
});
