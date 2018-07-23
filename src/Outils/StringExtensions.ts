"use strict";
export class Str {

    static format(formatString: string, params: string[]): string {
        return formatString.replace(/{(\d+)}/g, function (match, i) {
            return typeof params[i] != 'undefined'
                ? params[i]
                : match
                ;
        });
    }

    static isNullOrEmpty(value: string): boolean {
        if (value == undefined) return true;
        if (value == null) return true;
        if (value == '') return true;
        return false;
    }

}