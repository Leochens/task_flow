// ...successSideEffects(type, meta.resource, payload, response).map(a => put(a)),

// const a = {
//     type: `${type}_SUCCESS`,
//     payload: meta.normalizeFunc ? meta.normalizeFunc(response) : response,
//     requestPayload: payload,
//     meta,
// }

const successSideEffects = (type, resource, payload, response) => []

export default successSideEffects;
