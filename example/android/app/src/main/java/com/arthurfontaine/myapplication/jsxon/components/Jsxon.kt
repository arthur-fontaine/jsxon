package com.arthurfontaine.myapplication.jsxon.components

import androidx.compose.runtime.Composable
import com.arthurfontaine.myapplication.jsxon.JsxonPayload

@Composable
fun Jsxon(jsxonPayload: JsxonPayload) {
    when (jsxonPayload.type) {
        "jsxon:Text" -> JsxonText(jsxonPayload = jsxonPayload)
        "jsxon:HStack" -> JsxonHStack(jsxonPayload = jsxonPayload)
        "jsxon:VStack" -> JsxonVStack(jsxonPayload = jsxonPayload)
    }
}
