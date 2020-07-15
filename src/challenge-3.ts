type ValidJSON = ValidJSONObject | string | number | boolean | Date | JsonArray

interface JsonArray extends Array<string | number | boolean | Date | ValidJSONObject | JsonArray> { }

interface ValidJSONObject {
	[x: string]: string | number | boolean | Date | JsonArray
}

export const stringify = (input: ValidJSON) :string => {
   if (input === null)
    return 'null'
  else if (input.constructor === String)
    return '"' + input.replace(/"|\n/g, (x:string) =>  x === '"' ? '\\"' :'\\n') + '"'
  else if (input.constructor === Number)
    return String(input)
  else if (input.constructor === Boolean)
    return input ? 'true' : 'false'
  else if (input.constructor === Array)
    return '[' + input.reduce<string[]>((acc, v) => {
      if (v === undefined)
        return [...acc, 'null']
      else
        return [...acc, stringify(v)]
    }, []).join(',') + ']'
  else if (input.constructor === Object)
    return '{' + Object.keys(input).reduce<string[]>((acc, k: keyof ValidJSONObject) => {
      if ((input as ValidJSONObject)[k] === undefined)
        return acc
      else
        return [...acc, stringify(k) + ':' + stringify((input as ValidJSONObject)[k])]
    }, []).join(',') + '}'
  else
    return '{}'
};