import * as generators from './generators'

export class Make {
    static page(args: string[], config: any): void {
        new generators.PageGenerator(args, config)
    }

    static pattern(args: string[], config: any): void {
        new generators.PatternGenerator(args, config)
    }

    static overview(args: string[], config: any): void {
        new generators.OverviewGenerator(args, config)
    }

    static component(args: string[], config: any): void {
        new generators.ComponentGenerator(args, config)
    }
}