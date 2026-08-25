import { CanvasFactory } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";

console.log("pdf-parse loaded successfully");
console.log("CanvasFactory:", !!CanvasFactory);
console.log("DOMMatrix:", typeof globalThis.DOMMatrix);