import type { Arguments, CommandBuilder } from "yargs";
import FlowResult from "lighthouse/types/lhr/flow";
import Result from "lighthouse/types/lhr/lhr";
import { readFileSync, writeFileSync } from "fs";
// @ts-ignore
import { generateFlowReportHtml } from "lighthouse/report/generator/report-generator";

type Options = {
  files: string[];
};

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.options({
    files: { array: true, string: true, required: true },
  });

export const handler = (argv: Arguments<Options>): void => {
  const name = new Date().toString();
  const flowResult: FlowResult = {
    name,
    steps: argv.files.map((file, index): FlowResult.Step => {
      const lhr: Result = JSON.parse(readFileSync(file, "utf8"));
      return {
        name: index.toString(),
        lhr,
      };
    }),
  };
  const report = generateFlowReportHtml(flowResult);
  writeFileSync(`${name}.html`, report);
  process.stdout.write("hello");
  process.exit(0);
};
