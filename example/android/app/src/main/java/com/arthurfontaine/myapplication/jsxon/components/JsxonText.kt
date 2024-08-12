package com.arthurfontaine.myapplication.jsxon.components

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.arthurfontaine.myapplication.jsxon.JsxonPayload

@Composable
fun JsxonText(jsxonPayload: JsxonPayload) {
    val text = jsxonPayload.props["text"] ?: ""

    Text(text = text)
}
