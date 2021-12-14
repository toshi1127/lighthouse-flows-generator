import type { Arguments, CommandBuilder } from "yargs";
import puppeteer from "puppeteer";
import FlowResult from "lighthouse/types/lhr/flow";
import Result from "lighthouse/types/lhr/lhr";
import { readFileSync, writeFileSync } from "fs";
// @ts-ignore
import { generateFlowReportHtml } from "lighthouse/report/generator/report-generator";
// @ts-ignore
import { startFlow } from "lighthouse/lighthouse-core/fraggle-rock/api.js";

type Options = {
  files?: string[];
  urls?: string[];
};

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.options({
    files: { array: true, string: true },
    urls: { array: true, string: true },
  });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const name = new Date().toString();
  if (argv.files && argv.files.length > 0) {
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
  } else if (argv.urls && argv.urls.length > 0) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const flow = await startFlow(page, { name });

    for (const url of argv.urls) {
      await flow.navigate(url)
    }

    await browser.close();

    const report = flow.generateReport();
    writeFileSync(`${name}.html`, report);
  }
  process.exit(0);
};
