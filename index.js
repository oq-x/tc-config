/**
* @param {string} input The input
*/
export function parse(input) {
    if (!input.startsWith('config'))
        throw new Error('input must start with config <name>')
    input.replace('config ', '')
    if (
        !input.split('\n')[0].replace('config ', '')[0].startsWith('"') ||
        !input.split('\n')[0].replace('{', '').trim().endsWith('"')
    )
        throw new Error('config name must have " in the end and the start.')
    if (!input.split('\n')[0].endsWith('{'))
        throw new Error('a { must go after the config name.')
    if (!input.endsWith('}'))
        throw new Error('a } must go in the end of the config.')
    const name = input
        .split('\n')[0]
        .split(/ +/g)[1]
        .replace('{', '')
        .trim()
        .replace(/"/g, '')
    const new1 = input.split('\n')
    new1.shift()
    new1.pop()
    const output = { name, properties: {} }
    for (const property of new1) {
        const args = property.trim().split(/ +/g)
        const type = args[0].replace(/\t/g, '')
        const name = args[1]
        let value = args.slice(2).join(' ')
        for (const prop in process.env) {
            const regex = new RegExp(`{${prop}}`, 'g')
            value = value.replace(regex, process.env[prop])
        }
        switch (type) {
            case 'string':
                output.properties[name] = String(value)
                break
            case 'number':
                output.properties[name] = Number(value)
                break
            case 'json':
                output.properties[name] = JSON.parse(value)
                break
            case 'boolean':
                output.properties[name] = Boolean(value)
                break
            default:
                throw new Error(
                    'invalid type, type must be string|number|json|boolean'
                )
        }
    }
    return output
}
