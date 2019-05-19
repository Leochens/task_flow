export const RECORD_OPERATION = 'RECORD_OPERATION';
export const TYPE = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete'
}
export const recordOperation = (msg, op_type) => {
    return {
        type: RECORD_OPERATION,
        msg,
        op_type
    }
}
