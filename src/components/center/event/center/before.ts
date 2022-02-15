//第一队执行函数
//滚动条函数
import { Mpost, Rget, Rpost, Rput } from '@/config/http';
import { htmlurl } from '@/config/http/env';
import { sendWsMessage } from '@/config/http/ws';
import { data } from '@components/center/store/live';
import { message } from 'ant-design-vue';
import Cookies from 'js-cookie';
import moment from 'moment';
import screenfull from 'screenfull';
import { useRouter } from 'vue-router';
import { signContinueTime } from './signContinueTime';
import { live } from '@components/center/store/live'
import { zhixueyun } from '@/config/http/env';
import axios from 'axios';
export const myscroll = async () => {
    //为了让钉子生效所以我们做一个细微的scrool动作
    let div1: any = document.getElementById('sc');
    let div2: any = document.getElementById('sc2');
    try {
        div1.scrollTop = 0;
        div1.scrollTop = div1.scrollHeight;
        div2.scrollTop = 0;
        div2.scrollTop = div2.scrollHeight;
    } catch (error) { }
};


export const getmessage = async () => {
    //管理员
    let type: number;
    if (data?.admin) {
        type = 2;
    } else {
        type = 1;
    }
    let mydata = {
        zhiboid: data.nowvideoid,
    };
    const cab: any = await Rget('/message', mydata);

    data.arr1.length = 0;
    data.arr2.length = 0;

    for (const x in cab.data.data) {
        if (cab.data.data[x].type == 1) {
            data.arr1.push(cab.data.data[x]);
        } else {
            if (data.admin) {
                data.arr2.push(cab.data.data[x]);
            } else if (cab.data.data[x].eid == sessionStorage.eid) {
                data.arr2.push(cab.data.data[x]);

            }
        }
    }
    //渲染滚动条
    await myscroll();
};




//Get sign time
export const getsigndata = async () => {
    const urlsigntime = '/live/searchidzhibo';
    if (data.nowvideoid) {
        let mydata2 = {
            _id: data.nowvideoid,
        };
        let a: any = await Mpost(urlsigntime, mydata2);
        data.signdata = a.data.data;
    }
};

//just get videoStatusObj
export const videoStatusObjJust = async () => {
    const mydata2 = {
        _id: data.nowvideoid,
        limit: '1',
        back: 'status'
    }

    const cabStatus = await Rget('/zhibolist', mydata2)


    if (!cabStatus?.data?.data[0]?.status) {
        data.liveStatusColor = 'green'
    } else if (cabStatus?.data?.data[0]?.status === "直播开始") {
        data.liveStatusColor = 'green'
    } else if (cabStatus?.data?.data[0]?.status === "直播结束") {
        data.videoOffColor = "red"
        data.liveStatusColor = 'blue'
    } else if (cabStatus?.data?.data[0]?.status === "直播等待") {
        data.liveStatusColor = 'red'
    } else if (cabStatus?.data?.data[0]?.status === "直播回放") {
        data.liveStatusColor = 'gold'
    } else {
        message.info('可能直播状态错误')
    }

}

//Stop the live broadcast
export const isOffVideoEvent = async () => {
    const mydata3 = {
        id: data.nowvideoid,
        operateType: '1'
    }
    //1.change live status
    data.videoOffColor = "red"
    data.liveStatusColor = 'blue'
    const mydata = {
        status: "直播结束"
    }
    await Rput('/zhibolist', data.nowvideoid, mydata)
    //奇怪的知学云去更新直播状态
    const cabZxyS = await Rget('/zxylive/changePlayType', mydata3)

    //奇怪的还要通知他记录可以拿到
    await Rget('/zxylive/changePlayType', {
        id: data.nowvideoid,
        operateType: '2'
    })

    if (cabZxyS.data.msg === "success") {
        message.success('直播已经停止')

    }

}

//change video status
export const videoStatusObj = async () => {
    let shoulStatus: String = '', operateType: number = 1;
    const mydata2 = {
        _id: data.nowvideoid,
        limit: '1',
        back: 'status'
    }

    //1.change live status
    let mydata = {
        status: shoulStatus
    }
    const cabStatus = await Rget('/zhibolist', mydata2)
    if (!cabStatus?.data?.data[0]?.status) {
        mydata.status = "直播开始"
        data.liveStatusColor = 'green'

    }
    if (cabStatus?.data?.data[0]?.status === "直播等待") {
        mydata.status = "直播开始"
        data.liveStatusColor = 'green'

    } else {
        return
    }

    await Rput('/zhibolist', data.nowvideoid, mydata)


    //notice zhixueyun api
    const mydata3 = {
        id: data.nowvideoid,
        operateType: '1'
    }

    const cabZxyS = await Rget('/zxylive/changePlayType', mydata3)
    if (cabZxyS.data.msg === "success") {
        message.success('直播开启')

    }







}

//由外部公开链接跳转到直播逻辑
export const autosendSonData = async (da: any) => {
    //子页面点击进入后list隐藏
    data.zhibolistshow = false;
    data.videoplay = true;
    data.close1 = true;
    data.nowvideoid = da;
    data.videobg = '#191A21';
    //触发连锁反应事件，因为这个函数最先之行
    await getmessage();
    //启动打卡程序
    await getsigndata();
    //去根据id获取直播视频的url

    let mydata2 = { id: data.nowvideoid };
    let cab: any = await Mpost('/live/gainvideourl', mydata2);
    data.url = htmlurl + cab.data.data.url;
};

export const onSearch = async (searchValue: string) => {
    //不允许游客发送消息
    if (sessionStorage.eid == '999999') {
        message.info('你好游客，为了网络安全，您还不能发送消息～～');
    }
    // data.radiovalue==>1 代表所有人 2代表老师和导播

    let lval = sessionStorage.user + '说：' + searchValue;

    //提交到数据库
    let url = '/live/message';
    let mydata = {
        user: sessionStorage.user,
        eid: sessionStorage.eid,
        message: searchValue,
        type: data.radiovalue,
        zhiboid: data.nowvideoid,
    };

    await Mpost(url, mydata);
    let pdata = {
        command: 'message',
    };
    sendWsMessage(pdata);
    data.value = " "
};

export const useAccesstokenGetEid = async () => {
    //拿token去交换eid和name

    let cab: any = await Mpost('/zxylive/tokenlogin', {});
    if (!cab?.data?.data?.eid) {
        return;
    }
    sessionStorage.eid = cab?.data?.data?.eid;
    data.nowvideoid = cab?.data?.data?.zhiboid

    let datax1 = {
        _id: cab?.data?.data?.zhiboid,
        limit: '1',
    };

    const a = await Rget('/zhibolist', datax1);

    //下面进行跳转
    if (a.data.data) {
        let data1 = {
            eid: sessionStorage.eid,
            limit: '1',
            back: 'name',
        };
        //通过eid去获取从而赋值sessionStorage.user
        const cab1 = await Rget('/skyuser', data1);
        try {
            sessionStorage.user = cab1.data.data[0].name;
        } catch (error) {
            console.log('通过eid去获取从而赋值sessionStorage.user');
        }
        await autosendSonData(cab?.data?.data?.zhiboid);
    } else {
        message.info('你好，暗号不对，送您一张飞机票～～');
        const router = useRouter();
        router.push('404');
    }
}


//授权系统天健用户
//1.1通过eid去数据库查询自己组是否属于管理原来决定是否开启设置
export const adminUser = async () => {
    let url = '/live/eid';
    let mydata = {
        eid: sessionStorage.eid,
    };

    let cabg = await Mpost(url, mydata);

    const adminarr = ['运营维护部', '教育培训部'];

    if (adminarr.includes(cabg?.data?.data?.departmentchild)) {
        data.admin = true;
        message.info('管理员界面和权限已打开。');
    } else {
        data.admin = false;
        message.info('祝您工作开心～');
    }

}

//去拉取直播列表的group name arry
export const GetLiveGroup = async () => {
    let url = '/live/findzhibo_groupname';
    let url2 = '/live/livegroup';
    let can_list_id: any = [];
    let cab = await Mpost(url, '');
    let grouplist = [];
    //遍历直播列表

    for (const i of cab?.data?.data) {
        //遍历组名
        if (!i.group) {
            continue;
        }
        for (const ii of i.group) {
            //通过组名group 名字去获取livegroup
            let data = {
                groupname: ii,
            };
        }
    }
    //去重复

    let set = new Set(can_list_id);
    let a = Array.from(set);
    can_list_id = a;

    //去根据直播id去查询直播array
    //console.log(can_list_id);
    //去获取直播并渲染

    for (const i of can_list_id) {
        let url3 = '/live/searchidzhibo';
        let data2: any = {
            _id: i,
        };
        let cab3 = await Mpost(url3, data2);

        let ob: any = {
            name: cab3.data.data.name,
            _id: cab3.data.data._id,
            starttime: cab3.data.data.starttime,
        };

        data.showzhibolist.push(ob);
    }
}


//1.4允许组外属于公开直播
export const pulicLive = async () => {
    let urlfindzhibo = '/live/findzhibo';
    let caburlfindzhibo: any = await Mpost(urlfindzhibo, '');

    for (let i = 0; i < caburlfindzhibo.data.data.length; i++) {
        if (!caburlfindzhibo.data.data[i].power) {
            continue;
        }

        if (
            caburlfindzhibo.data.data[i].power[0] &&
            sessionStorage.eid != '999999'
        ) {
            //这个是用户添加逻辑
            data.showzhibolist.push(caburlfindzhibo.data.data[i]);
        } else if (
            //这个是游客添加逻辑
            caburlfindzhibo.data.data[i].power[1] &&
            sessionStorage.eid == '999999'
        ) {
            data.showzhibolist.push(caburlfindzhibo.data.data[i]);
        }
    }
    //1.4.1 如果这个直播的时间是超过当前的时间的，那么就应该过期删除
    for (const key in data.showzhibolist) {
        let startTime = data.showzhibolist[key].starttime[1];
        let nowtime = moment().format('YYYY-MM-DD HH:mm:ss');
        const diff4 = moment(nowtime).diff(moment(startTime), 'minutes');
        //说明过期了
        if (diff4 > 0) {
            delete data.showzhibolist[key];
        }
    }
    data.showzhibolist = data.showzhibolist.filter((item: any) => item);
}



//去live重复
export const uniqueLive = async () => {
    let newArr: any = [];
    let obj: any = {};
    for (let i = 0; i < data.showzhibolist.length; i++) {
        if (!obj[data.showzhibolist[i]._id]) {
            newArr.push(data.showzhibolist[i]);
            obj[data.showzhibolist[i]._id] = true;
        }
    }
    data.showzhibolist = newArr;
}


//进入直播间逻辑, 说明被点击了，实时触发
export const sendSonData = async (da: any) => {
    //子页面点击进入后list隐藏
    data.zhibolistshow = false;
    data.videoplay = true;
    data.close1 = true;
    data.nowvideoid = da;
    data.videobg = '#191A21';

    //触发连锁反应事件，因为这个函数最先之行
    await getmessage();
    //启动签到程序
    await getsigndata();

    //去获取数据库签到时间
    data.signContinueTime = await signContinueTime(da);
    //去根据id获取直播视频的url
    let mydata2 = { id: data.nowvideoid };
    let cab: any = await Mpost('/live/gainvideourl', mydata2);
    data.url = htmlurl + cab.data.data.url;
};

export const timethis = async () => {
    //所有的操作都是在进入直播以后干的事情
    if (!data.nowvideoid) {
        return;
    }
    await myscroll();
    data.nowtime = new Date();
    let time = moment(data.nowtime, 'YYYY-MM-DD HH:mm:ss');

    for (const i of data?.signdata?.signtime) {
        let end_date = moment(time, 'YYYY-MM-DD HH:mm:ss');
        //记录下当前的时间
        data.timeRecord = i;

        if (end_date.diff(i, 'seconds') < Number(data.signContinueTime)) {
            //显示的倒计时时间
            // console.log(i);

            data.signshowtime =
                Number(data.signContinueTime) - end_date.diff(i, 'seconds');
            localStorage.setItem('relativetime', i);
            //上次打卡时间

            if (
                localStorage.getItem('lock') == 'off' ||
                !localStorage.getItem('lock')
            ) {
                data.need = true;
                data.signtime = true;
            }

            break;
        } else {
            //用户没有关闭签到窗口前

            if (localStorage.getItem('lock') == 'on') {
                //   console.log(data.userOffSignTable);

                if (data.userOffSignTable) {
                    //窗口还是显示，并且文字更改
                    //   console.log(localStorage.getItem('lock'));
                    //这个虽然显示，但不能打卡，所以交换按钮
                    data.need = true;
                    data.textsignTitle =
                        '你已经成功签到啦，🎉，是否点击下面的关闭窗口。';
                }
            } else {
                data.need = false;
                data.textsignTitle =
                    '点击下面的“签到”按钮，等你10分钟，别错过了哦。';
            }
        }
    }

    if (data.liveoff < 1000) {
        data.liveoff++;
    } else {
        data.liveoff = 0;
    }
};


export const signtimeclick = async () => {
    //阻止多次点击事件
    if (!data.signtime) {
        return;
    }

    //防止时间函数再一次开启签到页面
    // clearInterval(timec);

    // Date.prototype.clone=function(){
    //   return new Date(this.valueOf());
    // }
    //这里计算出来的是已经过去的时间
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    let time_moment = moment(time, 'YYYY-MM-DD HH:mm:ss');
    let dftime = time_moment.diff(data.timeRecord, 'seconds');
    localStorage.setItem('passedtime', String(dftime));



    //2事件部分
    //2.1把这次点击的时间添加到数据库
    // //2.1.1先去查询到部门
    // let searchDepartmentchild = '/live/eid';
    // let searchDepartmentchildData = {
    //     eid: sessionStorage.eid,
    // };
    // let cabDepartmentchild = await Mpost(
    //     searchDepartmentchild,
    //     searchDepartmentchildData,
    // );


    let savesign = '/live/savesign';
    let mydata2 = {
        zhiboid: data.nowvideoid,
        sign: {
            name: sessionStorage.user,
            eid: sessionStorage.eid,
            // departmentchild: cabDepartmentchild?.data?.data?.departmentchild,
            signtime: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    };

    if (sessionStorage.eid) {
        await Mpost(savesign, mydata2);
        //签到之后关闭按钮可以显示
        data.userOffSignTable = true;
        //1css部分
        //签到窗口显示控制
        data.signtime = false;
        //需要签到控制
        data.need = false;
        //干完事后再启动
        localStorage.setItem('lock', 'on');

        localStorage.setItem('pretime', time);
    } else {
        sessionStorage.info('打卡异常请重新登录')
    }





};

export const addtimeBack = async () => {

    let sesstime1 = moment().format('X');
    let cha = Number(sesstime1) - Number(Cookies.get('longtime'));
    if (!Cookies.get('longtime')) {
        Cookies.set('longtime', sesstime1);
    } else if (cha > 60) {
        Cookies.set('longtime', sesstime1);
    } else {
        return;
    }


    //1The first register information
    //user infomation exchange this id
    //schema like this

    let terminalType = 0
    if (live.mobile) {
        terminalType = 1
    }
    let sesstime = moment().format('x');

    let mydata = {
        zhiboid: data.nowvideoid,
        eid: sessionStorage.eid,
        limit: '1',
    };
    const a = await Rget('/zhibolist_longtimeback', mydata);
    const cab1 = await Rget('/skyuser', { eid: sessionStorage.eid });

    console.log(a?.data?.data);

    if (a?.data?.data?.length < 1) {
        let data4 = {
            zhiboid: data.nowvideoid,
            eid: sessionStorage.eid,
            fullName: sessionStorage.user,
            name: cab1?.data?.data[0]?.login_id,
            organizationId: cab1?.data?.data[0]?.branch,
            departmentId: cab1?.data?.data[0]?.departmentchild,
            durationTime: '60',
            entryTime: sesstime,
            levelTime: '',
            terminalType: terminalType,
            time: '1',
        };
        await Rpost('/zhibolist_longtimeback', data4);



    } else {
        let data5 = {
            zhiboid: data.nowvideoid,
            eid: sessionStorage.eid,
            fullName: sessionStorage.user,
            name: cab1?.data?.data[0]?.login_id,
            organizationId: cab1?.data?.data[0]?.branch,
            departmentId: cab1?.data?.data[0]?.departmentchild,
            durationTime: Number(a?.data?.data[0]?.durationTime) + 60,
            levelTime: Number(sesstime) + 60 * 1000,
            terminalType: terminalType,
            time: '1',
        };

        const cab3 = await Rput('/zhibolist_longtimeback', a?.data?.data[0]?._id, data5);
        if (!cab3?.data?.data) { message.info('时长计时失败,请刷新页面') }
    }


}


export const addtime = async () => {

    let sesstime1 = moment().format('X');
    let cha = Number(sesstime1) - Number(Cookies.get('longtime'));


    if (!Cookies.get('longtime')) {
        Cookies.set('longtime', sesstime1);
    } else if (cha > 60) {
        Cookies.set('longtime', sesstime1);
    } else {
        return;
    }


    //1The first register information
    //user infomation exchange this id
    //schema like this

    let terminalType = 0
    if (live.mobile) {
        terminalType = 1
    }
    let sesstime = moment().format('x');

    let mydata = {
        zhiboid: data.nowvideoid,
        eid: sessionStorage.eid,
        limit: '1',
    };
    const a = await Rget('/zhibolist_longtime', mydata);
    const cab1 = await Rget('/skyuser', { eid: sessionStorage.eid });



    if (a?.data?.data?.length < 1) {
        let data4 = {
            zhiboid: data.nowvideoid,
            eid: sessionStorage.eid,
            fullName: sessionStorage.user,
            name: cab1?.data?.data[0]?.login_id,
            organizationId: cab1?.data?.data[0]?.branch,
            departmentId: cab1?.data?.data[0]?.departmentchild,
            durationTime: '60',
            entryTime: sesstime,
            levelTime: '',
            terminalType: terminalType,
            time: '1',
        };
        await Rpost('/zhibolist_longtime', data4);



    } else {
        let data5 = {
            zhiboid: data.nowvideoid,
            eid: sessionStorage.eid,
            fullName: sessionStorage.user,
            name: cab1?.data?.data[0]?.login_id,
            organizationId: cab1?.data?.data[0]?.branch,
            departmentId: cab1?.data?.data[0]?.departmentchild,
            durationTime: Number(a?.data?.data[0]?.durationTime) + 60,
            levelTime: Number(sesstime) + 60 * 1000,
            terminalType: terminalType,
            time: '1',
        };

        const cab3 = await Rput('/zhibolist_longtime', a?.data?.data[0]?._id, data5);
        if (!cab3?.data?.data) { message.info('时长计时失败,请刷新页面') }
    }


}

export const fullshow = async () => {
    if (data.toggleFull) {
        //视频放到最大
        data.ifrawidth = '100%';
        //发给老师和导播的聊天框隐藏
        data.fulloff = false;
        //聊天框高度拉低
        data.cssheight = 55;
        screenfull.toggle();
        data.toggleFull = false;
    } else {
        //如同上面
        data.ifrawidth = '80%';
        //发给老师和导播的聊天框隐藏
        data.fulloff = true;
        //聊天框高度拉低
        data.cssheight = 250;
        data.toggleFull = true;
        screenfull.toggle();
    }
};