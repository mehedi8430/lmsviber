export const groupBy = (array = [], callbackfn) => {
    const output = {};
    array.forEach((value) => {
        const key = callbackfn(value);
        output[key] = [...(output[key] || []), value];
    })
    return output;
}