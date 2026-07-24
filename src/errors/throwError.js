class ThrowError extends Error{
    constructor(msg = 'Something went wrong', statusCode = 400, data = {}){
        super(msg);
        this.statusCode=statusCode;
        this.data=data;
    }
}

export const throwError=new ThrowError()