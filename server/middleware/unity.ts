import { defineEventHandler, setHeader } from "h3";

export default defineEventHandler((event) => {
    const path = event.path;

    if (path.endsWith(".wasm.br")) {
        setHeader(event, "Content-Type", "application/wasm");
        setHeader(event, "Content-Encoding", "br");
    }

    if (path.endsWith(".js.br")) {
        setHeader(event, "Content-Type", "application/javascript");
        setHeader(event, "Content-Encoding", "br");
    }

    if (path.endsWith(".data.br")) {
        setHeader(event, "Content-Type", "application/octet-stream");
        setHeader(event, "Content-Encoding", "br");
    }
});