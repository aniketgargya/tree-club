import { Record, String, Static } from 'runtypes';

const DecodedToken = Record({
    data: Record({
        _id: String,
        email: String,
        name: String
    })
});

type DecodedToken = Static<typeof DecodedToken>;

export { DecodedToken };