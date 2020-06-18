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

export const toFixed = (input: number) => {
    return Math.round((input + Number.EPSILON) * 100) / 100;
};

export const groupByDate = (array: any, key: any) => {
    if (array === undefined) {
        return;
    }
    return array.reduce((result: any, currentValue: any) => {

        (result[currentValue.Date] = result[currentValue.Date] || []).push({
            HarshBreaking: currentValue.HarshBreaking,
            HarshTurning: currentValue.HarshTurning,
            PacketTime: (currentValue.PacketTime).slice(11,19),
            VehicleSpeed: currentValue.VehicleSpeed
        })
        return result;
    },{});
};
