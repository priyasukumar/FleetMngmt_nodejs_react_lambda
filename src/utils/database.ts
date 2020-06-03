export const groupBy = (array: any, key: any) => {
    if (array === undefined) {
        return;
    }
    return array.reduce((result: any, currentValue: any) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
    }, {});
};