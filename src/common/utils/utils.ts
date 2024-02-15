export const isSuccessful = (statusCode: number): boolean => {
    // @ts-ignore
    return parseInt(statusCode / 100) === 2
}
