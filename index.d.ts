declare module "tconfig" {
    export interface output {
        name: string;
        properties: any;
    };
    export function parse(input: string): Error | output;
}
