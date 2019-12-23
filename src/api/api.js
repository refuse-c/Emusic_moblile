//手机号登录
export const loginTel = {
    api_url: '/login/cellphone',
    params: {
        phone: '',//手机号码
        password: ''//密码
    }
}

//手机号登录
export const loginMali = {
    api_url: '/login',
    params: {
        email: '',//163 网易邮箱
        password: ''//密码
    }
}

//刷新登录
export const refresh = {
    api_url: '/login/refresh',
    params: {}
}

//发送验证码
export const sendCode = {
    api_url: '/captcha/sent',
    params: {
        phone: ''//手机号码
    }
}

//验证验证码
export const verifyCode = {
    api_url: '/captcha/verify',
    params: {
        phone: '',//手机号码
        captcha: ''//验证码
    }
}

//注册(修改密码)
export const register = {
    api_url: '/register/cellphone',
    params: {
        captcha: '',// 验证码
        phone: '',// 手机号码
        password: '',// 密码
        nickname: ''// 昵称
    }
}

// 检测手机号码是否已注册
export const checkTel = {
    api_url: '/cellphone/existence/check',
    params: {
        phone: ''// 手机号码
    }
}

// 初始化昵称
export const initNickName = {
    api_url: '/activate/init/profile',
    params: {
        nickname: ''// 昵称
    }
}

//更换绑定手机
export const rebindTel = {
    api_url: '/rebind',
    params: {
        oldcaptcha: '',// 原手机验证码
        captcha: '',// 新手机验证码
        phone: ''// 手机号码
    }
}

//退出登录
export const logout = {
    api_url: '/logout',
    params: {}
}

//获取登录状态
export const loginStatus = {
    api_url: '/login/status',
    params: {}
}

//获取用户详情
export const userDetail = {
    api_url: '/user/detail',
    params: {
        uid: ''//用户 id
    }
}

//获取用户信息 , 歌单，收藏，mv, dj 数量(需要登录)
export const userSubcount = {
    api_url: '/user/subcount',
    params: {}
}

//更新用户信息
export const userUpdate = {
    api_url: '/user/update',
    params: {
        gender: '',// 性别 0:保密 1:男性 2:女性
        birthday: '',// 出生日期,时间戳 unix timestamp
        nickname: '',// 用户昵称
        province: '',// 省份id
        city: '',// 城市id
        signature: ''//用户签名
    }
}

// 获取用户歌单
export const userPlaylist = {
    api_url: '/user/playlist',
    params: {
        uid: ''//用户 id
    }
}

//更新歌单
export const laylistUpdate = {
    api_url: '/playlist/update',
    params: {
        id: '',// 歌单id
        name: '',// 歌单名字
        desc: '',// 歌单描述
        tags: ''// 歌单tag
    }
}

//更新歌单描述
export const descUpdate = {
    api_url: '/playlist/desc/update',
    params: {
        id: '',// 歌单id
        desc: '',// 歌单描述
    }
}


//更新歌单名
export const nameUpdate = {
    api_url: '/playlist/name/update',
    params: {
        id: '',// 歌单id
        name: ''//歌单名
    }
}

//更新歌单标签
export const tagsUpdate = {
    api_url: '/playlist/tags/update',
    params: {
        id: '',// 歌单id
        tags: ''// 歌单tag
    }
}

//获取用户电台
export const broadcast = {
    api_url: '/user/dj',
    params: {
        uid: ''//用户 id
    }
}

//获取用户关注列表
export const userFollows = {
    api_url: '/user/follows',
    params: {
        uid: '',//用户 id
        limit: '',//返回数量, 默认为 30
        offset: ''//偏移数量，用于分页, 如: 如 :(页数 - 1) * 30, 其中 30 为 limit 的值, 默认为 0 
    }
}

//获取用户粉丝列表
export const userFolloweds = {
    api_url: '/user/followeds',
    params: {
        uid: '',// 用户 id
        limit: '',// 返回数量, 默认为 30
        lasttime: ''// 返回数据的 lasttime, 默认- 1, 传入上一次返回结果的 lasttime, 将会返回下一页的数据
    }
}

//获取用户动态
export const userEvent = {
    api_url: '/user/event',
    params: {
        uid: '',// 用户 id
        limit: '',// 返回数量, 默认为 30
        lasttime: ''// 返回数据的 lasttime, 默认- 1, 传入上一次返回结果的 lasttime, 将会返回下一页的数据
    }
}

//转发用户动态
export const eventForward = {
    api_url: '/event/forward',
    params: {
        uid: '',// 用户 id
        evId: '',// 动态 id
        forwards: ''// 转发的评论
    }
}

//删除用户动态
export const eventDel = {
    api_url: '/event/del',
    params: {
        evId: ''//动态 id
    }
}

//分享歌曲、歌单、mv、电台、电台节目到动态
export const share = {
    api_url: '/share/resource',
    params: {
        id: '',//资源 id （歌曲，歌单，mv，电台，电台节目对应 id）
        type: '',//资源类型，默认歌曲 song，可传 song,playlist,mv,djradio,djprogram
        msg: ''//内容，140 字限制，支持 emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
    }
}

//获取动态评论
export const comment = {
    api_url: '/comment/event',
    params: {
        threadId: '' //动态 id，可通过 /event，/user/event 接口获取
    }
}

// 关注/取消关注用户
export const follow = {
    api_url: '/follow',
    params: {
        id: '',// 用户 id
        t: ''//1为关注,其他为取消关注
    }
}

//获取用户播放记录
export const userRecord = {
    api_url: '/user/record',
    params: {
        uid: '',//用户 id
        type: ''//type=1 时只返回 weekData, type=0 时返回 allData
    }
}

//获取热门话题
export const hotTopic = {
    api_url: '/hot/topic',
    params: {
        limit: '',//取出评论数量 , 默认为 20
        offset: ''//偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
    }
}

//心动模式/智能播放
export const intelligence = {
    api_url: '/playmode/intelligence/list',
    params: {
        pid: '',//歌单 id
        sid: ''//要开始播放的歌曲的 id
    }
}

//获取动态消息
export const getEvent = {
    api_url: '/event',
    params: {
        pagesize: '',// 每页数据,默认20
        lasttime: ''// 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
    }
}

//歌手分类列表
export const artistList = {
    api_url: '/artist/list',
    params: {
        cat: '',// 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
        limit: '',// 返回数量 , 默认为 30
        offset: ''// 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?cat=1001&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列
    }
    // 入驻歌手 5001

    // 华语男歌手 1001

    // 华语女歌手 1002

    // 华语组合/乐队 1003

    // 欧美男歌手 2001

    // 欧美女歌手 2002

    // 欧美组合/乐队 2003

    // 日本男歌手 6001

    // 日本女歌手 6002

    // 日本组合/乐队 6003

    // 韩国男歌手 7001

    // 韩国女歌手 7002

    // 韩国组合/乐队 7003

    // 其他男歌手 4001

    // 其他女歌手 4002

    // 其他组合/乐队 4003
}

//收藏/取消收藏歌手
export const artistSub = {
    api_url: '/artist/sub',
    params: {
        artistId: '',// 歌手 id
        t: ''//操作,1 为收藏,其他为取消收藏
    }
}

//收藏的歌手列表
export const artistSublist = {
    api_url: '/artist/sublist',
    params: {}
}

// 收藏/取消收藏视频
export const videoSub = {
    api_url: '/video/sub',
    params: {
        id: '',// 视频 id
        t: ''//操作,1 为收藏,其他为取消收藏
    }
}

// 收藏/取消收藏 MV
export const mvSub = {
    api_url: '/mv/sub',
    params: {
        mvid: '',// MV id
        t: ''//操作,1 为收藏,其他为取消收藏
    }
}

//收藏的 MV 列表
export const mvSublist = {
    api_url: '/mv/sublist',
    params: {}
}

//歌单分类
export const playlistCatlist = {
    api_url: '/playlist/catlist',
    params: {}
}

//热门歌单分类
export const playlistHot = {
    api_url: '/playlist/hot',
    params: {}
}


//获取精品歌单
export const playlistHighquality = {
    api_url: '/top/playlist/highquality',
    params: {
        cat: '',//tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
        limit: '',// 取出歌单数量 , 默认为 20
        before: ''// 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
    }
}

// 歌单 ( 网友精选碟 )
export const playlistTop = {
    api_url: '/top/playlist',
    params: {
        order: '',// 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
        cat: '',//cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
    }
}

//all toplist
export const topList = {
    api_url: '/toplist',
    params: {}
}

//相关歌单推荐
export const playlistRecommend = {
    api_url: '/related/playlist',
    params: {
        id: ''//歌单 id
    }
}

//获取歌单详情
export const playlistDetail = {
    api_url: '/playlist/detail',
    params: {
        id: '',//歌单 id
        s: ''//歌单最近的 s 个收藏者
    }
}

//获取音乐 url
export const songUrl = {
    api_url: '/song/url',
    params: {
        id: '',// 音乐 id
        br: ''// 码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
    }
    // https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
}

//音乐是否可用
export const checkMusic = {
    api_url: '/check/music',
    params: {
        id: '',// 音乐 id
        br: ''// 码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
    }
}

// 获取每日推荐歌单
// 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
export const recommendList = {
    api_url: '/recommend/resource',
    params: {}
}

// 获取每日推荐歌曲
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
export const recommendSongs = {
    api_url: '/recommend/songs',
    params: {}
}

// banner
// 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
export const getBanner = {
    api_url: '/banner',
    params: {
        type: '2'//0: pc,1: android,2: iphone,3: ipad
    }
}

// 新碟上架
// 说明 : 调用此接口 , 可获取新碟上架列表 , 如需具体音乐信息需要调用获取专辑列表接 口 /album , 然后传入 id, 如 /album?id=32311&limit=30
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
export const getTopAlbum = {
    api_url: '/top/album',
    params: {
        offset: '',
        limit: ''
    }
}

// 推荐歌单
// 说明: 调用此接口, 可获取推荐歌单
// 可选参数: limit: 取出数量, 默认为 30(不支持 offset)
export const personalized = {
    api_url: '/personalized',
    params: {
        limit: ''
    }
}

// 搜索
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : keywords : 关键词
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

export const search = {
    api_url: '/search',
    params: {
        keywords: '',
        limit: '',
        type: ''
    }
}

// 默认搜索关键词
// 说明 : 调用此接口 , 可获取默认搜索关键词
export const searchDefault = {
    api_url: '/search/default',
    params: {}
}

// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表
export const searchHot = {
    api_url: '/search/hot',
    params: {}
}

// 热搜列表(详细)
// 说明 : 调用此接口,可获取热门搜索列表
export const searchHotDetail = {
    api_url: '/search/hot/detail',
    params: {}
}

// 搜索多重匹配
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
// 必选参数 : keywords : 关键词
export const searchMultimatch = {
    api_url: '/search/multimatch',
    params: {
        keywords: ''
    }
}

// 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
// 必选参数 : keywords : 关键词
// 可选参数 : type : 如果传 'mobile' 则返回移动端数据
export const searchSuggest = {
    api_url: '/search/suggest',
    params: {
        keywords: '',
        type: 'mobile'
    }
}
// 获取歌曲详情
// 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
// 必选参数 : ids: 音乐 id, 如 ids=347230
// 接口地址 : /song/detail
// 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
export const songDetail = {
    api_url: '/song/detail',
    params: {
        ids: '',
    }
}

// 获取歌手描述
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/desc
// 调用例子 : /artist/desc?id=6452 ( 周杰伦 )
export const artist = {
    api_url: '/artist/desc',
    params: {
        id: '',
    }
}

// 获取歌手单曲
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 接口地址 : /artists
// 调用例子 : /artists?id=6452
export const artists = {
    api_url: '/artists',
    params: {
        id: '',
    }
}

// 获取歌手 mv
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 接口地址 : /artist/mv
// 调用例子 : /artist/mv?id=6452
export const artistMv = {
    api_url: '/artist/mv',
    params: {
        id: '',
    }
}

// 获取歌手专辑
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
// 必选参数 : id: 歌手 id
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /artist/album
// 调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )
export const artistAlbum = {
    api_url: '/artist/album',
    params: {
        id: '',
        offset: '',
        limit: ''
    }
}

// 获取相似歌手
// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
// 必选参数 : id: 歌手 id
// 接口地址 : /simi/artist
// 调用例子 : /simi/artist?id=6452 ( 对应和周杰伦相似歌手 )
export const simiArtist = {
    api_url: '/simi/artist',
    params: {
        id: '',
    }
}

// 获取专辑内容
// 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
// 必选参数 : id: 专辑 id
// 接口地址 : /album
// 调用例子 : /album?id=32311
export const album = {
    api_url: '/album',
    params: {
        id: '',
    }
}

// 云村热评
// 说明: 登录后调用此接口, 可获取云村热评
// 接口地址: /comment/hotwall / list
// 调用例子: /comment/hotwall / list
export const hotwallList = {
    api_url: '/comment/hotwall/list',
    params: {}
}

// 全部 mv
// 说明: 调用此接口, 可获取全部 mv
// 可选参数:
// area: 地区, 可选值为全部, 内地, 港台, 欧美, 日本, 韩国, 不填则为全部 
// type: 类型, 可选值为全部, 官方版, 原生, 现场版, 网易出品, 不填则为全部
// order: 排序, 可选值为上升最快, 最热, 最新, 不填则为上升最快
// limit: 取出数量, 默认为 30
// offset: 偏移数量, 用于分页, 如 : (页数 - 1) * 50, 其中 50 为 limit 的值, 默认 为 0
// 接口地址: /mv/all
// 调用例子: /mv/all ? area = 港台
export const mvAll = {
    api_url: '/mv/all',
    params: {
        area: '',
        type: '',
        order: '',
        limit: '',
        offset: '',
    }
}
// 获取 mv 数据
// 说明: 调用此接口, 传入 mvid(在搜索音乐的时候传 type = 1004 获得), 可获取对应 MV 数据, 数据包含 mv 名字, 歌手, 发布时间, mv 视频地址等数据, 其中 mv 视频 网易做了防盗链处理, 可能不能直接播放, 需要播放的话需要调用 ' mv 地址' 接口
// 必选参数: mvid: mv 的 id
// 接口地址: /mv/detail
// 调用例子: /mv/detail ? mvid = 5436712
export const mvDetail = {
    api_url: '/mv/detail',
    params: {
        mvid: ''
    }
}
// mv 地址
// 说明: 调用此接口, 传入 mv id, 可获取 mv 播放地址
// 可选参数: id: mv id
// 接口地址: /mv/url
// 调用例子:
// /mv/url ? id = 5436712
export const mvUrl = {
    api_url: '/mv/url',
    params: {
        id: ''
    }
}

// 视频详情
// 说明: 调用此接口, 可获取视频详情
// 必选参数: id: 视频 的 id
// 接口地址: /video/detail
// 调用例子: /video/detail ? id = 89ADDE33C0AAE8EC14B99F6750DB954D
export const videoDetail = {
    api_url: '/video/detail',
    params: {
        id: ''
    }
}

// 获取视频播放地址
// 说明: 调用此接口, 传入视频 id, 可获取视频播放地址
// 必选参数: id: 视频 的 id
// 接口地址: /video/url
// 调用例子: /video/url ? id = 89ADDE33C0AAE8EC14B99F6750DB954D
export const videoUrl = {
    api_url: '/video/url',
    params: {
        id: ''
    }
}

// 相关视频
// 说明: 调用此接口, 可获取相关视频
// 必选参数: id: 视频 的 id
// 接口地址: /related/allvideo
// 调用例子: /related/allvideo ? id = 89ADDE33C0AAE8EC14B99F6750DB954D
export const relatedVideo = {
    api_url: '/related/allvideo',
    params: {
        id: ''
    }
}
// 获取视频标签下的视频
// 说明: 调用此接口, 传入id, 可获取到相关的视频。 (ps：无法分页，每次请求返回内容都不一样，官方桌面软件是打开先请求两次，然后每次滚动到底部的时候再请求一次)
// 必选参数: id: videoGroup 的 id
// 接口地址: /video/group
// 调用例子: /video/group ? id = 9104
export const videoGroup = {
    api_url: '/video/group',
    params: {
        id: ''
    }
}