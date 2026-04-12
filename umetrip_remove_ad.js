/*
航旅纵横（Umetrip）去开屏广告（简化版）
只去除开屏广告，不处理其他广告
*/

let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 1. 去除开屏广告相关字段
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

    body = JSON.stringify(obj);

} catch (e) {
    // 如果不是 JSON 格式，使用兜底方案
    body = body
        .replace(/"splash":\s*true/g, '"splash":false')
        .replace(/"startupPages":\s*\[.*?\]/g, '"startupPages":[]');
}

$done({ body });
