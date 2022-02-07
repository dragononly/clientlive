//第一队执行函数
//滚动条函数
import { Rput } from '@/config/http';

export const uploadUrl = async (id: string, url: string) => {

    const cab = await Rput('/zhibolist', id, { backurl: url });
    if (cab?.data?.data?.acknowledged) {
        return true
    } else {
        return false
    }

};

