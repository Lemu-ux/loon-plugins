/*
航旅纵横（Umetrip）去广告（抓包版）
适配开屏 / 弹窗 / banner / 推荐流广告
*/

let body = $response.body;

try {
    let obj = JSON.parse(body);

    // ===== 1. 去除开屏广告 =====
    if (obj.splashInfo) {
        obj.splashInfo = {};
    }

    if (obj.splash) {
        obj.splash = {};
    }

    if (obj.startupPages) {
        obj.startupPages = [];
    }

    if (obj.launch) {
        obj.launch = {};
    }

    // ===== 2. 去除首页广告位 =====
    if (obj.bannerList) {
        obj.bannerList = [];
    }

    if (obj.banners) {
        obj.banners = [];
    }

    if (obj.adList) {
        obj.adList = [];
    }

    // ===== 3. 去除推荐流广告 =====
    if (Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item => {
            // 判断是否为广告
            if (!item) return false;

            if (
                item.ad === true ||
                item.isAd === true ||
                item.type === "ad" ||
                item.type === "advertisement" ||
                item.bizType === "AD"
            ) {
                return false;
            }

            return true;
        });
    }

    // ===== 4. 去除弹窗广告 =====
    if (obj.popup) {
        obj.popup = null;
    }

    if (obj.popWindow) {
        obj.popWindow = null;
    }

    if (obj.dialog) {
        obj.dialog = null;
    }

    // ===== 5. 统一关闭广告相关字段 =====
    const adKeys = [
        "showAd",
        "hasAd",
        "needAd",
        "displayAd",
        "enableAd"
    ];

    adKeys.forEach(key => {
        if (obj[key] !== undefined) {
            obj[key] = false;
        }
    });

    body = JSON.stringify(obj);

} catch (e) {

    // 如果数据格式非 JSON 格式，使用兜底方案
    body = body
        .replace(/"ad":\s*true/g, '"ad":false')
        .replace(/"isAd":\s*true/g, '"isAd":false')
        .replace(/"showAd":\s*true/g, '"showAd":false')
        .replace(/"popup":\s*\{.*?\}/g, '"popup":null');
}

$done({ body });
