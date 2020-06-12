const exitWithUrlError = () => {
  console.log("A valid README url must be provided as the first argument.");
  Deno.exit(1);
};

if (import.meta.main) {
  const { args } = Deno;

  if (!args.length) {
    exitWithUrlError();
  }

  const [url, _start, _end] = args;
  const start = parseInt(_start);
  const end = parseInt(_end);

  try {
    new URL(url);
  } catch (_) {
    exitWithUrlError();
  }

  if (typeof start !== "number" || start < 1) {
    console.log(
      "A valid (one indexed) start line must be provided for the second argument.",
    );
    Deno.exit(1);
  }
  if (typeof end !== "number" || end < start) {
    console.log(
      "A valid (one indexed) end line must be provided for the third argument.",
    );
    Deno.exit(1);
  }

  const response = await fetch(url);
  const page = await response.text();
  const lines = page.split("\n");

  if (start > lines.length) {
    console.log(
      "A valid (one indexed) start line must be provided for the second argument.",
    );
    Deno.exit(1);
  }
  if (end > lines.length) {
    console.log(
      "A valid (one indexed) end line must be provided for the third argument.",
    );
    Deno.exit(1);
  }

  const script = lines.slice(start - 1, end).join("\n");
  const tmpFilePath = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmpFilePath, script);
  await import(`file://${tmpFilePath}`);
}
