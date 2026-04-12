/*
腾讯视频去广告（2026适配版）
*/

let body = $response.body;

try {
    let obj = JSON.parse(body);

    // ===== 1. 去广告字段 =====
    if (obj.ad) obj.ad = null;
    if (obj.ads) obj.ads = [];
    if (obj.adList) obj.adList = [];

    // ===== 2. 去首页banner =====
    if (obj.banner) obj.banner = [];
    if (obj.banners) obj.banners = [];

    // ===== 3. 去推荐流广告 =====
    if (Array.isArray(obj.data)) {
        obj.data = obj.data.filter(i => {
            return !(i.ad || i.isAd || i.type === "ad");
        });
    }

    // ===== 4. 去播放前广告 =====
    if (obj.vl && obj.vl.vi) {
        obj.vl.vi.forEach(v => {
            if (v.ad) v.ad = {};
        });
    }

    // ===== 5. 去试看限制（核心）=====
    if (obj.preview) obj.preview = 0;
    if (obj.trySee) obj.trySee = 0;
    if (obj.limit) obj.limit = 0;

    body = JSON.stringify(obj);

} catch (e) {
    // 兜底
    body = body
        .replace(/"ad":\s*true/g, '"ad":false')
        .replace(/"preview":\d+/g, '"preview":0');
}

$done({ body });