import axios from "axios";

/**
 * This function wraps a promise and catches errors of specific types. It returns a promise that resolves to an array.
 * The first element of the array is the error if it matches one of the types specified, otherwise it's undefined.
 * The second element is the data if the promise resolves successfully.
 * 
 * @param promise The promise to wrap.
 * @param errorTocatch An array of error types to catch.
 * @returns A promise that resolves to an array of [error, data] or [undefined, data].
 */
export default function CatchErrorTyped<T, E extends new (message: string) => Error>(
    promise: Promise<T>,
    errorTocatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {

    return promise.then(data => {
        return [undefined, data] as [undefined, T];
    }).catch(errr => {
        if (errorTocatch == undefined) {
            return [errr]
        }
        if (errorTocatch.some(error => errr instanceof error)) {
            return [errr]
        }
        throw errr;
    })
}

// Example usage
// const callapi = async () => {
//     const [error, data] = await CatchErrorTyped(axios.get('https://jsonplaceholder.typicod.com/todos/1'))

//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data)
//     }
// }

// Example usage with custom errors
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

export const callapiWithCustomError = async () => {
    const [error, data] = await CatchErrorTyped(axios.get('https://jsonplaceholder.typicod.com/todos/1'), [CustomError])

    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
}

// callapi()
// callapiWithCustomError()
