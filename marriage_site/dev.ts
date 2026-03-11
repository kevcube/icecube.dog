const root = new URL("./dist/", import.meta.url);
const port = Number(process.env.PORT ?? 3000);

const server = Bun.serve({
  port,
  fetch(request) {
    const path = new URL(request.url).pathname;
    return new Response(Bun.file(new URL(path === "/" ? "index.html" : path.slice(1), root)));
  },
});

console.log(`marriage_site dev server listening on http://localhost:${server.port}`);
