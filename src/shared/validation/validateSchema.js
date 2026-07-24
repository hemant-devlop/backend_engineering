export const validateSchema=(schema,data)=>{
    return schema.safeParse(data)
}