# readme-runner

Run code snippets from a README (or any other file).

## Usage

As a minimum you need to provide the `--allow-net`, `--allow-read` and `--allow-write` permission flags.

You can then run the readme-runner as follows:

```bash
deno run --allow-net --allow-read --allow-write --reload https://raw.githubusercontent.com/asos-craigmorten/readme-runner/main/mod.ts <url_to_readme> <start_line_number> <end_line_number>
```

For example, this runs an example from the Pogo web frameworks README which runs a server on <http://localhost:3000>.

```bash
deno run --allow-net --allow-read --allow-write --reload https://raw.githubusercontent.com/asos-craigmorten/readme-runner/main/mod.ts https://raw.githubusercontent.com/sholladay/pogo/master/README.md 31 39
```

Take care not to execute any parts of READMEs that you have not first checked are safe to do so.

Start and end line numbers start from 1.
