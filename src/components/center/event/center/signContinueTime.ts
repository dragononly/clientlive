
import { Rget } from '@config/http/index';

export const signContinueTime = async (id: string) => {

    let mydata = {
        _id: id,
        limit: '1',
        back: 'signContinueTime',
    }
    let cab = await Rget('/zhibolist', mydata)


    return cab?.data?.data[0]?.signContinueTime
}
