/* eslint-disable @typescript-eslint/no-explicit-any */
async function Requests(URL : string,  methodObjects? : any, errorMsg? : string ,)
{
    try
    {
        const response = await fetch(URL, methodObjects);
        if (!response.ok) throw Error("The Operation Failed");
    }
    catch (exc : any) {
        errorMsg = exc.message;
        alert(errorMsg);
        console.error(exc)
    }

    console.log(errorMsg);
}
export default Requests;

function createRequest( method : string, contents : any) : any
{
    return{
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contents)

    }
}

export { createRequest }