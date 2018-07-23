"use strict";

export class StringBuilder {

    private _value: string;

    constructor(value: string) {
        this._value = value;
    }

    Append(value: string): void {
        this._value += value;
    }

    AppendLine(value: string): void {
        this._value += value + '\r\n';
    }

    AppendFormat(formatString: string, params: string[]) {
        this._value += formatString.replace(/{(\d+)}/g, function (match, i) {
            return typeof params[i] != 'undefined'
                ? params[i]
                : match
                ;
        });
    }

    ToString(): string {
        return this._value;
    }

}